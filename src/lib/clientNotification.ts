/**
 * Client-Side Order Notification Service
 * Ensures orders placed on static hosting (e.g. GitHub Pages) or when backend is unreachable
 * still dispatch instant email and notification alerts to the administrator (smmbuy2022@gmail.com).
 */

export interface ClientOrderNotificationData {
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
  specialInstructions?: string;
}

export async function dispatchClientOrderNotification(order: ClientOrderNotificationData): Promise<boolean> {
  const formData = new FormData();
  formData.append('_subject', `🔥 [NEW ORDER] ${order.orderNumber} - ${order.serviceName} ($${order.total.toFixed(2)} USD)`);
  formData.append('_replyto', order.email);
  formData.append('Order Number', order.orderNumber);
  formData.append('Customer Name', order.customerName);
  formData.append('Email', order.email);
  formData.append('Phone/Telegram', order.phone || 'N/A');
  formData.append('Business Name', order.businessName);
  formData.append('Website', order.businessWebsite || 'N/A');
  formData.append('Service', order.serviceName);
  formData.append('Tier', order.packageName || 'Standard');
  formData.append('Quantity', String(order.quantity));
  formData.append('Total Amount', `$${order.total.toFixed(2)} USD`);
  formData.append('Target URL', order.platformUrl);
  formData.append('Instructions', order.specialInstructions || 'None');
  formData.append('Date', new Date().toUTCString());

  // Method 1: FormSubmit JSON
  try {
    const res = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `🔥 [NEW ORDER] ${order.orderNumber} - ${order.serviceName} ($${order.total.toFixed(2)})`,
        _replyto: order.email,
        _template: 'table',
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_email: order.email,
        phone: order.phone || 'N/A',
        business_name: order.businessName,
        business_website: order.businessWebsite || 'N/A',
        service: order.serviceName,
        package: order.packageName || 'Standard',
        quantity: order.quantity,
        total: `$${order.total.toFixed(2)} USD`,
        target_url: order.platformUrl,
        instructions: order.specialInstructions || 'None',
      }),
    });
    if (res.ok) {
      console.log('[ClientNotification] Order notification sent via FormSubmit AJAX');
      return true;
    }
  } catch (err) {
    console.warn('[ClientNotification] FormSubmit AJAX error:', err);
  }

  // Method 2: FormSubmit FormData
  try {
    const res2 = await fetch('https://formsubmit.co/smmbuy2022@gmail.com', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });
    console.log('[ClientNotification] Order dispatched via FormSubmit no-cors');
    return true;
  } catch (err2) {
    console.warn('[ClientNotification] FormSubmit no-cors error:', err2);
  }

  return false;
}

export interface ClientPaymentNotificationData {
  orderNumber: string;
  cryptoSymbol: string;
  network?: string;
  walletAddress?: string;
  transactionHash: string;
  amountUsd: number;
}

export async function dispatchClientPaymentNotification(payment: ClientPaymentNotificationData): Promise<boolean> {
  const payload = {
    access_key: '64861be3-df64-42f8-b39f-27f9999602f3',
    subject: `💰 [PAYMENT SUBMITTED] Order #${payment.orderNumber} - $${payment.amountUsd.toFixed(2)} (${payment.cryptoSymbol})`,
    from_name: 'USA Review Store Payment Verifications',
    recipient: 'smmbuy2022@gmail.com',
    'Order Reference': payment.orderNumber,
    'Amount': `$${payment.amountUsd.toFixed(2)} USD`,
    'Cryptocurrency': `${payment.cryptoSymbol} (${payment.network || 'Standard'})`,
    'Wallet Address': payment.walletAddress || 'N/A',
    'Transaction Hash (TXID)': payment.transactionHash,
    'Submitted At': new Date().toUTCString(),
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return true;
  } catch (err) {
    console.warn('[ClientPaymentNotification] Web3Forms error:', err);
  }

  try {
    const res2 = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `💰 [PAYMENT SUBMITTED] Order #${payment.orderNumber} - $${payment.amountUsd.toFixed(2)} (${payment.cryptoSymbol})`,
        order_number: payment.orderNumber,
        amount: `$${payment.amountUsd.toFixed(2)} USD`,
        cryptocurrency: payment.cryptoSymbol,
        txid: payment.transactionHash,
        wallet: payment.walletAddress,
      }),
    });
    if (res2.ok) return true;
  } catch (err2) {
    console.warn('[ClientPaymentNotification] FormSubmit error:', err2);
  }

  return false;
}

export interface ClientContactNotificationData {
  name: string;
  email: string;
  orderNumber?: string;
  message: string;
}

export async function dispatchClientContactNotification(contact: ClientContactNotificationData): Promise<boolean> {
  const formData = new FormData();
  formData.append('_subject', `📩 [CONTACT MESSAGE] From ${contact.name}${contact.orderNumber ? ` (Order #${contact.orderNumber})` : ''}`);
  formData.append('_replyto', contact.email);
  formData.append('Name', contact.name);
  formData.append('Email', contact.email);
  formData.append('Order Number', contact.orderNumber || 'N/A');
  formData.append('Message', contact.message);
  formData.append('Submitted At', new Date().toUTCString());

  try {
    const res = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `📩 [CONTACT MESSAGE] From ${contact.name}${contact.orderNumber ? ` (Order #${contact.orderNumber})` : ''}`,
        _replyto: contact.email,
        _template: 'table',
        name: contact.name,
        email: contact.email,
        order_number: contact.orderNumber || 'N/A',
        message: contact.message,
      }),
    });
    if (res.ok) {
      console.log('[ClientContactNotification] FormSubmit AJAX success');
      return true;
    }
  } catch (err) {
    console.warn('[ClientContactNotification] FormSubmit AJAX error:', err);
  }

  try {
    await fetch('https://formsubmit.co/smmbuy2022@gmail.com', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });
    console.log('[ClientContactNotification] FormSubmit no-cors sent');
    return true;
  } catch (err2) {
    console.warn('[ClientContactNotification] FormSubmit error:', err2);
  }

  return false;
}

