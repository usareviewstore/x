import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SERVICES } from './src/data/services.js';
import { CRYPTO_PAYMENT_METHODS } from './src/data/cryptoPayments.js';
import { sendOrderEmails, sendPaymentVerificationEmail, sendContactEmail } from './src/server/emailService.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// In-memory store for orders and contact submissions
const ordersStore: Map<string, any> = new Map();
const contactSubmissions: any[] = [];

// Helper to generate safe order number URS-2026-XXXXX
function generateOrderNumber(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `URS-2026-${rand}`;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'USA Review Store', timestamp: new Date().toISOString() });
});

// 2. GET Services list
app.get('/api/services', (req, res) => {
  res.json({ services: SERVICES });
});

// 3. GET Single service by slug
app.get('/api/services/:slug', (req, res) => {
  const { slug } = req.params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json({ service });
});

// 4. POST Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      businessName,
      businessWebsite,
      platformUrl,
      serviceId,
      packageName,
      quantity = 1,
      specialInstructions,
    } = req.body;

    if (!customerName || !email || !businessName || !platformUrl || !serviceId) {
      return res.status(400).json({ error: 'Missing required customer or service details.' });
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) {
      return res.status(400).json({ error: 'Invalid service selected.' });
    }

    const qty = Math.max(Number(quantity) || 1, service.minimumQuantity || 1);
    
    // Determine unit price server-side
    let unitPrice = service.price ?? 0;
    if (packageName && service.packages && service.packages.length > 0) {
      const selectedPkg = service.packages.find((p) => p.name === packageName || p.id === packageName);
      if (selectedPkg) {
        unitPrice = selectedPkg.price;
      }
    }

    const subtotal = unitPrice * qty;
    const discount = 0;
    const total = subtotal - discount;

    const orderNumber = generateOrderNumber();
    const orderRecord = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      orderNumber,
      customerName: String(customerName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      businessName: String(businessName).trim(),
      businessWebsite: businessWebsite ? String(businessWebsite).trim() : '',
      platformUrl: String(platformUrl).trim(),
      serviceId: service.id,
      serviceName: service.name,
      packageName: packageName || null,
      quantity: qty,
      unitPrice,
      subtotal,
      discount,
      total,
      currency: service.currency || 'USD',
      specialInstructions: specialInstructions ? String(specialInstructions).trim() : '',
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ordersStore.set(orderNumber, orderRecord);

    // Dispatch Admin Notification & Customer Confirmation Emails via Gmail SMTP
    let emailStatus = { adminSent: false, customerSent: false };
    try {
      emailStatus = await sendOrderEmails(orderRecord);
      console.log(`[Order #${orderNumber}] Email dispatch status:`, emailStatus);
    } catch (mailErr) {
      console.error('[Order #${orderNumber}] Email dispatch exception:', mailErr);
    }

    res.status(201).json({ success: true, order: orderRecord, emailStatus });
  } catch (err: any) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Internal server error processing order.' });
  }
});

// 5. GET Order by Number (with optional email tracking validation)
app.get('/api/orders/:orderNumber', (req, res) => {
  const { orderNumber } = req.params;
  const emailQuery = (req.query.email as string || '').trim().toLowerCase();

  const order = ordersStore.get(orderNumber.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found. Please check your reference number.' });
  }

  // If email parameter provided, verify matching email
  if (emailQuery && order.email !== emailQuery) {
    return res.status(403).json({ error: 'Email does not match our records for this order number.' });
  }

  res.json({ success: true, order });
});

// 6. POST Submit Crypto Payment
app.post('/api/payments', async (req, res) => {
  try {
    const { orderNumber, cryptoSymbol, network, walletAddress, transactionHash, amountUsd } = req.body;

    if (!orderNumber || !transactionHash || !cryptoSymbol) {
      return res.status(400).json({ error: 'Order number, transaction hash (TXID), and cryptocurrency choice are required.' });
    }

    const order = ordersStore.get(orderNumber.toUpperCase());
    if (!order) {
      return res.status(404).json({ error: 'Order not found for payment submission.' });
    }

    const txHashClean = String(transactionHash).trim();
    if (txHashClean.length < 8) {
      return res.status(400).json({ error: 'Please enter a valid Transaction Hash (TXID).' });
    }

    const paymentRecord = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      orderNumber: order.orderNumber,
      cryptoSymbol: String(cryptoSymbol).toUpperCase(),
      cryptoName: String(cryptoSymbol).toUpperCase(),
      network: network || 'Standard Network',
      walletAddress: walletAddress || '',
      amountUsd: Number(amountUsd) || order.total,
      transactionHash: txHashClean,
      status: 'Pending Verification',
      submittedAt: new Date().toISOString(),
    };

    order.payment = paymentRecord;
    order.status = 'Payment Verification';
    order.updatedAt = new Date().toISOString();

    ordersStore.set(order.orderNumber, order);

    // Dispatch payment verification alert email
    try {
      await sendPaymentVerificationEmail(paymentRecord);
      console.log(`[Payment #${order.orderNumber}] Alert email sent to admin.`);
    } catch (mailErr) {
      console.error(`[Payment #${order.orderNumber}] Alert email error:`, mailErr);
    }

    res.json({ success: true, order, payment: paymentRecord });
  } catch (err: any) {
    console.error('Payment submission error:', err);
    res.status(500).json({ error: 'Failed to process payment submission.' });
  }
});

// 7. POST Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, orderNumber, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const submission = {
      id: `c_${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      orderNumber: orderNumber ? String(orderNumber).trim() : null,
      message: String(message).trim(),
      submittedAt: new Date().toISOString(),
    };

    contactSubmissions.push(submission);

    // Dispatch contact email alerts via Gmail SMTP
    let emailStatus = { adminSent: false, customerSent: false };
    try {
      emailStatus = await sendContactEmail(submission);
      console.log(`[Contact from ${submission.email}] Email status:`, emailStatus);
    } catch (mailErr) {
      console.error(`[Contact from ${submission.email}] Email dispatch error:`, mailErr);
    }

    res.json({
      success: true,
      message: 'Thank you for reaching out to USA Review Store support! Our 24/7 team will get back to you shortly.',
      emailStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact message.' });
  }
});

// 8. POST AI Review Draft Generator
app.post('/api/tools/review-generator', async (req, res) => {
  try {
    const { businessName, serviceUsed, likes, highlights, improvements, experience, tone, length } = req.body;

    if (!businessName || !serviceUsed || !likes) {
      return res.status(400).json({ error: 'Business name, service used, and what you liked are required.' });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ error: 'AI service unavailable. Using local fallback generator.' });
    }

    const prompt = `Write a clean, authentic customer review draft based strictly on these facts:
Business Name: ${businessName}
Service/Product Used: ${serviceUsed}
Likes/Positive aspects: ${likes}
Standout highlights: ${highlights || 'None specified'}
Constructive feedback: ${improvements || 'None'}
Overall Sentiment: ${experience || 'Positive'}
Desired Tone: ${tone || 'Friendly'}
Desired Length: ${length || 'Medium'}

RULES:
- Do NOT invent false facts, fabricated dates, or fake events.
- Transform the user's real points into well-articulated, polished prose.
- Output ONLY the review draft text without quotes or meta commentary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an ethical AI review writing assistant helping real customers polish genuine experiences.',
        temperature: 0.6,
      },
    });

    const draft = response.text ? response.text.trim() : '';
    res.json({ success: true, draft });
  } catch (err: any) {
    console.error('AI Review Generator error:', err);
    res.status(500).json({ error: 'Failed to generate review draft.' });
  }
});

// 9. POST AI Response Generator
app.post('/api/tools/response-generator', async (req, res) => {
  try {
    const { customerReview, businessName, businessType, reviewType, tone } = req.body;

    if (!customerReview) {
      return res.status(400).json({ error: 'Customer review text is required.' });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ error: 'AI service unavailable. Using local fallback generator.' });
    }

    const prompt = `Draft a professional, customer-service oriented reply to this customer review:
Customer Review: "${customerReview}"
Business Name: ${businessName || 'Our Business'}
Industry/Category: ${businessType || 'General Service'}
Sentiment: ${reviewType || 'Positive'}
Desired Tone: ${tone || 'Professional'}

RULES:
- Be polite, constructive, and respectful.
- If negative, express empathy, apologize for shortcomings without admitting legal liability, and invite them to private support.
- Output ONLY the response draft text without meta explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a professional reputation manager crafting brand-aligned review responses.',
        temperature: 0.6,
      },
    });

    const reply = response.text ? response.text.trim() : '';
    res.json({ success: true, response: reply });
  } catch (err: any) {
    console.error('AI Response Generator error:', err);
    res.status(500).json({ error: 'Failed to generate review response.' });
  }
});

// Start Express and integrate Vite in development mode
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      // Pass API requests and static assets through
      if (req.originalUrl.startsWith('/api') || req.originalUrl.includes('.')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`USA Review Store Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
