export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: 'calculator' | 'sparkles' | 'message-square' | 'link' | 'award' | 'qr-code';
  category: 'analytics' | 'content' | 'links';
  badge?: string;
}

export const TOOLS_LIST: ToolItem[] = [
  {
    id: 'review-calculator',
    slug: 'review-calculator',
    title: 'Review Calculator',
    shortDescription: 'See exactly how many 5-star reviews it takes to hit your target rating.',
    longDescription: 'Calculate the exact number of additional 5-star reviews mathematically required to raise your average customer rating on Google, Trustpilot, or any platform to your target goal.',
    iconName: 'calculator',
    category: 'analytics',
    badge: 'Popular',
  },
  {
    id: 'ai-review-generator',
    slug: 'ai-review-generator',
    title: 'AI Review Generator',
    shortDescription: 'Turn genuine customer experiences into polished review drafts.',
    longDescription: 'An AI review draft assistant designed to help real customers turn their honest experiences and quick bullet points into clear, well-structured, professional review drafts.',
    iconName: 'sparkles',
    category: 'content',
    badge: 'AI Powered',
  },
  {
    id: 'ai-response-generator',
    slug: 'ai-response-generator',
    title: 'AI Response Generator',
    shortDescription: 'Paste a customer review and get a professional response draft.',
    longDescription: 'Draft empathetic, professional, and brand-aligned public responses to customer reviews in seconds, whether positive, neutral, or critical.',
    iconName: 'message-square',
    category: 'content',
    badge: 'AI Powered',
  },
  {
    id: 'review-link-generator',
    slug: 'review-link-generator',
    title: 'Review Link Generator',
    shortDescription: 'Turn your Google Business Profile URL into a direct review link.',
    longDescription: 'Generate direct, 1-click review links using your Google Place ID or Business Profile URL so customers can leave feedback instantly without navigation hassle.',
    iconName: 'link',
    category: 'links',
    badge: '1-Click Link',
  },
  {
    id: 'review-badge-generator',
    slug: 'review-badge-generator',
    title: 'Review Badge Generator',
    shortDescription: 'Create an embeddable rating badge for your website.',
    longDescription: 'Design lightweight, mobile-responsive website badges that highlight your authentic rating score and total review count to boost visitor trust.',
    iconName: 'award',
    category: 'links',
    badge: 'Embeddable',
  },
  {
    id: 'review-qr-code',
    slug: 'review-qr-code',
    title: 'Review QR Code',
    shortDescription: 'Create a printable QR code that sends customers to your review page.',
    longDescription: 'Generate high-resolution printable QR codes for receipts, counter displays, and business cards to easily direct physical customers to your online review page.',
    iconName: 'qr-code',
    category: 'links',
    badge: 'Print Ready',
  },
];
