import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER || 'smmbuy2022@gmail.com';
const SMTP_PASS = (process.env.SMTP_PASS || 'cozi ibbt kzwp xato').replace(/\s+/g, '');
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'smmbuy2022@gmail.com';
const APP_URL = process.env.APP_URL || 'https://usareviewstore.com';

// Lazy-initialized nodemailer transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  businessName: string;
  businessWebsite?: string;
  platformUrl: string;
  serviceName: string;
  packageName?: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: string;
  specialInstructions?: string;
  createdAt: string;
}

/**
 * Sends an email notification to Admin (smmbuy2022@gmail.com) and a confirmation email to the customer.
 */
export async function sendOrderEmails(order: OrderEmailData): Promise<{ adminSent: boolean; customerSent: boolean; error?: string }> {
  let adminSent = false;
  let customerSent = false;
  let errorDetail = '';

  const telegramUrl = `https://t.me/EgSupport24?text=Hello%20USA%20Review%20Store%2C%20I%20just%20placed%20order%20${encodeURIComponent(order.orderNumber)}`;
  const whatsappUrl = `https://wa.me/13073939979?text=Hello%20USA%20Review%20Store%2C%20I%20just%20placed%20order%20${encodeURIComponent(order.orderNumber)}`;
  const trackOrderUrl = `${APP_URL}/track-order?order=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.email)}`;
  const paymentUrl = `${APP_URL}/payment?order=${encodeURIComponent(order.orderNumber)}`;

  try {
    const mailer = getTransporter();

    // 1. ADMIN NOTIFICATION EMAIL
    const adminSubject = `🔥 [NEW ORDER] ${order.orderNumber} - ${order.serviceName} ($${order.total.toFixed(2)})`;
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0 0 6px; font-size: 20px; color: #60a5fa; }
    .badge { display: inline-block; background: #2563eb; color: #ffffff; font-weight: bold; font-size: 14px; padding: 6px 14px; border-radius: 6px; }
    .content { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
    .table th, .table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #f1f5f9; }
    .table th { background: #f8fafc; color: #64748b; font-weight: 600; width: 38%; }
    .table td { color: #0f172a; font-weight: 500; }
    .highlight { background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; }
    .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px; margin: 6px 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>USA Review Store — New Order Alert</h1>
      <span class="badge">Order ID: ${order.orderNumber}</span>
    </div>
    <div class="content">
      <p style="margin-top:0; font-size: 15px;"><strong>A new campaign order has been placed on USA Review Store:</strong></p>
      
      <table class="table">
        <tr><th>Order Reference</th><td><strong style="color:#2563eb;">${order.orderNumber}</strong></td></tr>
        <tr><th>Total Amount</th><td><strong style="color:#16a34a; font-size:16px;">$${order.total.toFixed(2)} ${order.currency}</strong></td></tr>
        <tr><th>Service</th><td><strong>${order.serviceName}</strong></td></tr>
        ${order.packageName ? `<tr><th>Package Tier</th><td>${order.packageName}</td></tr>` : ''}
        <tr><th>Quantity</th><td>${order.quantity} units (at $${order.unitPrice.toFixed(2)}/unit)</td></tr>
        <tr><th>Customer Name</th><td>${order.customerName}</td></tr>
        <tr><th>Customer Email</th><td><a href="mailto:${order.email}" style="color:#2563eb;">${order.email}</a></td></tr>
        <tr><th>Phone / Telegram</th><td>${order.phone || 'Not provided'}</td></tr>
        <tr><th>Business Name</th><td><strong>${order.businessName}</strong></td></tr>
        ${order.businessWebsite ? `<tr><th>Business Website</th><td><a href="${order.businessWebsite}" target="_blank" style="color:#2563eb;">${order.businessWebsite}</a></td></tr>` : ''}
        <tr><th>Target Listing URL</th><td><a href="${order.platformUrl}" target="_blank" style="color:#2563eb; word-break: break-all;">${order.platformUrl}</a></td></tr>
        <tr><th>Created At</th><td>${new Date(order.createdAt).toUTCString()}</td></tr>
      </table>

      ${order.specialInstructions ? `
      <div class="highlight">
        <strong>Special Instructions / Target Keywords:</strong><br>
        <span style="color:#334155;">${order.specialInstructions}</span>
      </div>` : ''}

      <div style="text-align: center; margin-top: 24px;">
        <a href="${paymentUrl}" class="btn">View Payment Details</a>
        <a href="${trackOrderUrl}" class="btn" style="background:#0f172a;">Track Live Status</a>
      </div>
    </div>
    <div class="footer">
      Automated Order Notification • USA Review Store Core Backend
    </div>
  </div>
</body>
</html>`;

    await mailer.sendMail({
      from: `"USA Review Store Orders" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: adminSubject,
      html: adminHtml,
      replyTo: order.email,
    });
    adminSent = true;
  } catch (err: any) {
    console.error('Error sending admin order notification email:', err);
    errorDetail += `Admin email error: ${err.message || err}. `;
  }

  // 2. CUSTOMER CONFIRMATION EMAIL
  try {
    const mailer = getTransporter();
    const customerSubject = `Order Confirmation #${order.orderNumber} — USA Review Store`;
    const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0 0 6px; font-size: 22px; color: #ffffff; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .order-badge { display: inline-block; background: #2563eb; color: #ffffff; font-weight: bold; font-size: 15px; padding: 8px 18px; border-radius: 8px; margin-top: 14px; letter-spacing: 0.5px; }
    .content { padding: 28px 24px; }
    .greeting { font-size: 16px; margin-top: 0; color: #0f172a; }
    .table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 14px; }
    .table th, .table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #f1f5f9; }
    .table th { background: #f8fafc; color: #64748b; font-weight: 600; width: 36%; }
    .table td { color: #0f172a; font-weight: 500; }
    .action-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px; margin: 22px 0; text-align: center; }
    .action-box h3 { margin: 0 0 8px; color: #166534; font-size: 15px; }
    .action-box p { margin: 0 0 14px; color: #15803d; font-size: 13px; }
    .btn-green { display: inline-block; background: #16a34a; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px; margin: 4px; }
    .btn-blue { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px; margin: 4px; }
    .btn-dark { display: inline-block; background: #0f172a; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px; margin: 4px; }
    .steps { background: #f8fafc; border-radius: 8px; padding: 16px 20px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 13px; }
    .steps ol { margin: 0; padding-left: 18px; }
    .steps li { margin-bottom: 8px; color: #334155; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>USA Review Store</h1>
      <p>Legitimate Digital Reputation & Customer Feedback Services</p>
      <div class="order-badge">Reference: ${order.orderNumber}</div>
    </div>
    
    <div class="content">
      <p class="greeting">Hello <strong>${order.customerName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        Thank you for choosing USA Review Store! We have successfully received your campaign order. Our dedicated team is ready to review your platform link and commence delivery.
      </p>

      <table class="table">
        <tr><th>Service</th><td><strong>${order.serviceName}</strong></td></tr>
        ${order.packageName ? `<tr><th>Plan / Tier</th><td>${order.packageName}</td></tr>` : ''}
        <tr><th>Quantity</th><td>${order.quantity} units</td></tr>
        <tr><th>Total Price</th><td><strong style="color: #2563eb; font-size: 15px;">$${order.total.toFixed(2)} USD</strong></td></tr>
        <tr><th>Business Name</th><td>${order.businessName}</td></tr>
        <tr><th>Target Listing</th><td><a href="${order.platformUrl}" target="_blank" style="color: #2563eb; word-break: break-all;">${order.platformUrl}</a></td></tr>
      </table>

      <!-- Direct Contact for Quick Activation -->
      <div class="action-box">
        <h3>⚡ Need Instant Activation or Have Questions?</h3>
        <p>Connect with our 24/7 dedicated campaign manager directly on Telegram or WhatsApp with your Order ID:</p>
        <div>
          <a href="${telegramUrl}" class="btn-blue" target="_blank">📱 Chat on Telegram (@EgSupport24)</a>
          <a href="${whatsappUrl}" class="btn-green" target="_blank">💬 WhatsApp (+1 307 393-9979)</a>
        </div>
      </div>

      <div class="steps">
        <strong style="color: #0f172a;">What happens next?</strong>
        <ol style="margin-top: 8px;">
          <li><strong>Payment Confirmation:</strong> Complete your payment via the Crypto Gateway if not submitted yet.</li>
          <li><strong>Account Manager Review:</strong> Our team reviews your target profile and configures geo-targeting & drip-feed pacing.</li>
          <li><strong>Live Tracking:</strong> Track every stage of your order live with your Order Reference ID.</li>
        </ol>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${trackOrderUrl}" class="btn-dark" target="_blank">🔍 Track Live Order Status</a>
        <a href="${paymentUrl}" class="btn-blue" target="_blank">💳 View Payment Gateway</a>
      </div>
    </div>

    <div class="footer">
      <strong>USA Review Store Support Desk</strong><br>
      Telegram: @EgSupport24 • WhatsApp: +1 (307) 393-9979<br>
      700 5th Ave, Suite 4000, Seattle, WA 98104, USA<br>
      © 2026 USA Review Store. All rights reserved.
    </div>
  </div>
</body>
</html>`;

    await mailer.sendMail({
      from: `"USA Review Store" <${SMTP_USER}>`,
      to: order.email,
      subject: customerSubject,
      html: customerHtml,
    });
    customerSent = true;
  } catch (err: any) {
    console.error('Error sending customer order confirmation email:', err);
    errorDetail += `Customer email error: ${err.message || err}. `;
  }

  return { adminSent, customerSent, error: errorDetail || undefined };
}

/**
 * Sends a notification email when a customer submits a payment TXID
 */
export async function sendPaymentVerificationEmail(payment: {
  orderNumber: string;
  cryptoSymbol: string;
  network?: string;
  walletAddress?: string;
  transactionHash: string;
  amountUsd: number;
}): Promise<boolean> {
  try {
    const mailer = getTransporter();
    const subject = `💰 [PAYMENT SUBMITTED] ${payment.orderNumber} - ${payment.cryptoSymbol} ($${payment.amountUsd})`;
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; padding: 20px; background: #f8fafc; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
    <h2 style="color: #16a34a; margin-top: 0;">Payment Submitted for Verification</h2>
    <p>A customer has submitted cryptocurrency payment details for their order:</p>
    <ul style="line-height: 1.8;">
      <li><strong>Order Number:</strong> ${payment.orderNumber}</li>
      <li><strong>Amount:</strong> $${payment.amountUsd} USD</li>
      <li><strong>Cryptocurrency:</strong> ${payment.cryptoSymbol} (${payment.network || 'Standard'})</li>
      <li><strong>Destination Wallet:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${payment.walletAddress || 'N/A'}</code></li>
      <li><strong>Transaction Hash (TXID):</strong> <br><code style="background: #eff6ff; padding: 4px 8px; border-radius: 4px; color: #2563eb; word-break: break-all;">${payment.transactionHash}</code></li>
    </ul>
    <p style="margin-top: 20px;">
      <a href="${APP_URL}/track-order?order=${payment.orderNumber}" style="background: #2563eb; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: bold;">Verify in Track Order</a>
    </p>
  </div>
</body>
</html>`;

    await mailer.sendMail({
      from: `"USA Review Store Payments" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject,
      html,
    });
    return true;
  } catch (e) {
    console.error('Error sending payment email alert:', e);
    return false;
  }
}
