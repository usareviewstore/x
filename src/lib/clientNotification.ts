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
  const payload = {
    access_key: '64861be3-df64-42f8-b39f-27f9999602f3', // public form submission channel
    subject: `🔥 [USA REVIEW STORE ORDER] ${order.orderNumber} - ${order.serviceName} ($${order.total.toFixed(2)} USD)`,
    from_name: 'USA Review Store Orders',
    replyto: order.email,
    recipient: 'smmbuy2022@gmail.com',
    'Order Reference': order.orderNumber,
    'Customer Name': order.customerName,
    'Customer Email': order.email,
    'Phone / Telegram': order.phone || 'N/A',
    'Business Name': order.businessName,
    'Business Website': order.businessWebsite || 'N/A',
    'Service': order.serviceName,
    'Package Tier': order.packageName || 'Standard',
    'Quantity': `${order.quantity} units ($${order.unitPrice}/unit)`,
    'Total Amount': `$${order.total.toFixed(2)} USD`,
    'Target Profile URL': order.platformUrl,
    'Special Instructions': order.specialInstructions || 'None',
    'Date & Time': new Date().toUTCString(),
  };

  try {
    // Attempt 1: Web3Forms free public email gateway
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log('[ClientNotification] Order notification successfully dispatched via Web3Forms.');
      return true;
    }
  } catch (err) {
    console.warn('[ClientNotification] Web3Forms dispatch error:', err);
  }

  try {
    // Attempt 2: FormSubmit gateway backup
    const formSubmitUrl = 'https://formsubmit.co/ajax/smmbuy2022@gmail.com';
    const res2 = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `🔥 [NEW ORDER] ${order.orderNumber} - ${order.serviceName} ($${order.total.toFixed(2)})`,
        _replyto: order.email,
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_email: order.email,
        phone: order.phone,
        business_name: order.businessName,
        service: order.serviceName,
        quantity: order.quantity,
        total: `$${order.total.toFixed(2)} USD`,
        target_url: order.platformUrl,
        instructions: order.specialInstructions,
      }),
    });

    if (res2.ok) {
      console.log('[ClientNotification] Order notification successfully dispatched via FormSubmit.');
      return true;
    }
  } catch (err2) {
    console.warn('[ClientNotification] FormSubmit backup error:', err2);
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
  const payload = {
    access_key: '64861be3-df64-42f8-b39f-27f9999602f3',
    subject: `📩 [CONTACT MESSAGE] From ${contact.name}${contact.orderNumber ? ` (Order #${contact.orderNumber})` : ''}`,
    from_name: 'USA Review Store Contact Desk',
    replyto: contact.email,
    recipient: 'smmbuy2022@gmail.com',
    'Customer Name': contact.name,
    'Customer Email': contact.email,
    'Order Reference': contact.orderNumber || 'N/A',
    'Message': contact.message,
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
    console.warn('[ClientContactNotification] Web3Forms error:', err);
  }

  try {
    const res2 = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `📩 [CONTACT MESSAGE] From ${contact.name}`,
        _replyto: contact.email,
        name: contact.name,
        email: contact.email,
        order_number: contact.orderNumber,
        message: contact.message,
      }),
    });
    if (res2.ok) return true;
  } catch (err2) {
    console.warn('[ClientContactNotification] FormSubmit error:', err2);
  }

  return false;
}

