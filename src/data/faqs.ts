export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'services-overview',
    category: 'General Services',
    question: 'What services do you provide?',
    answer: 'USA Review Store provides legitimate digital reputation management services, including automated customer feedback collection, review-request campaigns, multi-platform reputation monitoring, review-response writing, business profile optimization, and reputation consulting.'
  },
  {
    id: 'fake-reviews-policy',
    category: 'Ethics & Compliance',
    question: 'Do your services create fake reviews?',
    answer: 'No. Our services are designed around legitimate customer feedback, reputation management, and review-request strategies. We do not provide fabricated customer identities or fake reviews.'
  },
  {
    id: 'no-account-needed',
    category: 'Ordering & Guest Checkout',
    question: 'Do I need an account to place an order?',
    answer: 'No! USA Review Store operates on a guest checkout model. You do not need to register, remember passwords, or set up a profile. Simply choose your service, enter your details at checkout, and submit payment.'
  },
  {
    id: 'how-ordering-works',
    category: 'Ordering & Guest Checkout',
    question: 'How does ordering work?',
    answer: 'Select your preferred service from our catalog, configure the quantity or package, and proceed to checkout. Fill in your business details and platform URL, then click "Continue to Payment". You will receive a unique order reference number (e.g., URS-2026-XXXXX) to submit and track your payment.'
  },
  {
    id: 'payment-methods',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), BNB, Tether (USDT on ERC20, TRC20, BEP20), USD Coin (USDC), BUSD, Litecoin (LTC), TRON (TRX), and Dogecoin (DOGE).'
  },
  {
    id: 'crypto-payment-process',
    category: 'Payments',
    question: 'How do cryptocurrency payments work?',
    answer: 'On the checkout payment page, select your preferred cryptocurrency asset and network. The corresponding wallet address and QR code will be displayed. Send the exact order total from your crypto wallet, copy your Transaction Hash (TXID), enter it into the form, and click "Submit Payment".'
  },
  {
    id: 'payment-verification-time',
    category: 'Payments',
    question: 'How long does payment verification take?',
    answer: 'Payment verification typically takes between 15 to 45 minutes depending on blockchain network congestion and block confirmation speeds. Once verified, your order status updates automatically from "Payment Verification" to "Processing".'
  },
  {
    id: 'wrong-network-warning',
    category: 'Payments',
    question: 'What happens if I send crypto to the wrong network?',
    answer: 'Cryptocurrency transactions are generally irreversible. Sending funds on an incorrect network (e.g., sending USDT ERC20 to a TRC20 address) can lead to permanent loss. Always double-check both the coin symbol and the network selection before confirming your transfer.'
  },
  {
    id: 'order-tracking',
    category: 'Tracking & Updates',
    question: 'Can I track my order?',
    answer: 'Yes. You can visit our "Track Order" page at any time and enter your unique Order Reference Number (e.g., URS-2026-XXXXX) along with your checkout email address to view real-time status updates.'
  },
  {
    id: 'customer-support',
    category: 'Support',
    question: 'Can I contact support?',
    answer: 'Yes! We offer 24/7 dedicated support via Telegram (@EgSupport24) and WhatsApp (+1 (307) 393-9979). You can also send a message via our Contact page.'
  },
  {
    id: 'refund-policy',
    category: 'Policies',
    question: 'Can I request a refund?',
    answer: 'If we fail to initiate your reputation campaign or if an unresolvable technical issue occurs on our side, you may request a refund in accordance with our Refund Policy. Contact support with your order number for assistance.'
  }
];
