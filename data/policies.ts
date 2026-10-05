export interface PolicyData {
  slug: string;
  title: string;
  lastUpdated: string;
  content: string[];
}

export const POLICIES: Record<string, PolicyData> = {
  refund: {
    slug: 'refund',
    title: 'REFUND & EXCHANGE POLICY',
    lastUpdated: 'October 2026',
    content: [
      '**DRAFT POLICY — PLEASE CONFIRM AND REPLACE WITH THE STORE OWNER’S OFFICIAL TERMS.**',
      'At ELLANE, we want you to love what you wear. We offer a 7-day hassle-free exchange and return window from the date of delivery for all unworn, unwashed items with original tags intact.',
      '### 1. Eligibility for Returns & Exchanges',
      '- Items must be unused, in their original packaging, with all brand tags and barcodes attached.',
      '- Size exchanges are completely free of reverse pickup charges for the first exchange request.',
      '- Sale items tagged with "Festive Sale" or "Final Clearance" are eligible for size exchange only or store credit voucher.',
      '- Accessories, socks, and personal care items are non-returnable due to hygiene standards unless defective on arrival.',
      '### 2. Return Process',
      '- To initiate an exchange or return, WhatsApp our support at +91 7204154843 or email us at contact@ellane.store with your Order ID (#EL-XXXX) and photos of the item.',
      '- Reverse pickup will be arranged within 24–48 working hours.',
      '### 3. Refunds',
      '- Prepaid orders: Refund will be credited back to the original payment source (UPI / Card / Net Banking) within 5–7 working days after quality inspection.',
      '- Cash on Delivery (COD) orders: Refund will be processed via direct UPI transfer or store credit voucher as preferred by the customer.',
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'PRIVACY POLICY',
    lastUpdated: 'October 2026',
    content: [
      '**DRAFT POLICY — PLEASE CONFIRM AND REPLACE WITH THE STORE OWNER’S OFFICIAL TERMS.**',
      'ELLANE ("we", "our", or "us") respects your privacy and is committed to protecting your personal information.',
      '### 1. Information We Collect',
      '- Contact information (Name, delivery address, phone number, email address) provided during checkout and order tracking.',
      '- Transaction details necessary to fulfill and verify your order.',
      '- Technical log data including device type, IP address, and browser session to improve website performance.',
      '### 2. How We Use Your Data',
      '- To process, pack, and dispatch your orders via our courier partners.',
      '- To send real-time order updates, tracking links, and delivery notifications via SMS and WhatsApp.',
      '- To provide customer support and handle exchange requests.',
      '### 3. Data Protection',
      '- We never sell, rent, or trade your personal data to third parties. All payment processing is handled through PCI-DSS compliant secure gateways.',
    ],
  },
  terms: {
    slug: 'terms',
    title: 'TERMS OF SERVICE',
    lastUpdated: 'October 2026',
    content: [
      '**DRAFT POLICY — PLEASE CONFIRM AND REPLACE WITH THE STORE OWNER’S OFFICIAL TERMS.**',
      'Welcome to ELLANE (ellane.store). By visiting our website or purchasing products from us, you agree to comply with and be bound by the following terms and conditions.',
      '### 1. General Conditions',
      '- We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion if fraud or breach of terms is suspected.',
      '- Product colors displayed on your screen may vary slightly depending on monitor calibration and lighting during photography.',
      '### 2. Pricing and Availability',
      '- All prices listed on the site are in Indian Rupees (INR) and inclusive of applicable GST unless stated otherwise.',
      '- Prices and product availability are subject to change without prior notice.',
      '### 3. Governing Law',
      '- These Terms and any separate agreements shall be governed by and construed in accordance with the laws of Bengaluru, Karnataka, India.',
    ],
  },
  shipping: {
    slug: 'shipping',
    title: 'SHIPPING & DELIVERY POLICY',
    lastUpdated: 'October 2026',
    content: [
      '**DRAFT POLICY — PLEASE CONFIRM AND REPLACE WITH THE STORE OWNER’S OFFICIAL TERMS.**',
      'ELLANE ships orders across India using trusted express logistics partners including Delhivery, Blue Dart, and XpressBees.',
      '### 1. Shipping Charges & Free Delivery',
      '- All orders with a cart total of Rs. 1,999 or more qualify for **FREE Standard Delivery** across India.',
      '- Orders below Rs. 1,999 carry a flat delivery fee of Rs. 99.',
      '- Cash on Delivery (COD) is available for eligible PIN codes across India.',
      '### 2. Dispatch and Delivery Timelines',
      '- Metro cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata): 2–4 business days.',
      '- Rest of India: 4–7 business days.',
      '- Orders placed before 2:00 PM are typically dispatched on the same business day from our Bengaluru fulfillment hub.',
      '### 3. Tracking Your Shipment',
      '- Once dispatched, you will receive an SMS/WhatsApp notification with the AWB number and live tracking link.',
      '- You can also track your shipment anytime via our dedicated [Order Tracking](/track-order) page.',
    ],
  },
  'contact-information': {
    slug: 'contact-information',
    title: 'CONTACT INFORMATION',
    lastUpdated: 'October 2026',
    content: [
      '**DRAFT POLICY — PLEASE CONFIRM AND REPLACE WITH THE STORE OWNER’S OFFICIAL TERMS.**',
      'We are here to help you elevate your outfits. Reach out to our team through any of the channels below:',
      '### Store Address',
      '- **ELLANE Store**',
      '- Shop No. 12, Commercial Complex, Main Road, Bengaluru, Karnataka (CONFIRM with owner)',
      '- Store Operating Hours: Monday to Sunday: 11:00 AM – 9:30 PM IST',
      '### Direct Customer Support',
      '- **WhatsApp Support**: +91 7204154843',
      '- **Phone**: +91 7204154843',
      '- **Email**: contact@ellane.store',
      '- **Instagram**: [@ellane_store_](https://www.instagram.com/ellane_store_/)',
    ],
  },
};

export function getPolicyBySlug(slug: string): PolicyData | undefined {
  return POLICIES[slug];
}
