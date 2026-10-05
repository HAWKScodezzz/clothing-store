'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useCartStore } from '@/store/cart';
import { PRODUCTS, getProductById } from '@/data/products';
import { calculateCartTotals } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { ProductImage } from '@/components/store/ProductImage';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(8, 'Please enter complete delivery address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit PIN code'),
  paymentMethod: z.enum(['cod', 'upi', 'card']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clearCart, hasHydrated } = useCartStore();

  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    date: string;
  } | null>(null);

  if (!hasHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-zinc-500 uppercase animate-pulse">
        Initializing secure checkout...
      </div>
    );
  }

  const totals = calculateCartTotals(lines, PRODUCTS);

  if (lines.length === 0 && !orderConfirmed) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-mono font-bold text-2xl uppercase text-black">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-xs text-zinc-600">Add items to proceed to checkout.</p>
        <Button asChild variant="primary">
          <Link href="/collections/all-products">EXPLORE STORE</Link>
        </Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = `EL-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setOrderConfirmed({
        orderId: randomId,
        date: now,
      });
      clearCart();
      setIsSubmitting(false);
    }, 1000);
  };

  // Order Confirmed Success Screen
  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center select-none space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-700">
            ORDER PLACED SUCCESSFULLY // 注文完了
          </span>
          <h1 className="font-mono font-black text-3xl sm:text-4xl uppercase tracking-wider text-black">
            THANK YOU FOR YOUR ORDER
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600">
            We have received your order details and our fulfillment team has started preparing your package.
          </p>
        </div>

        {/* Order Details Confirmation Card */}
        <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 text-left font-mono text-xs space-y-3">
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="text-zinc-600">ORDER REFERENCE</span>
            <strong className="text-red-700 text-sm font-black">#{orderConfirmed.orderId}</strong>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="text-zinc-600">DELIVERY CONTACT</span>
            <span className="text-black font-semibold">{formData.fullName} ({formData.phone})</span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="text-zinc-600">SHIPPING ADDRESS</span>
            <span className="text-black text-right max-w-xs truncate">
              {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
            </span>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="text-zinc-600">PAYMENT METHOD</span>
            <span className="text-black uppercase font-semibold">{formData.paymentMethod}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-sm text-black">
            <span>TOTAL AMOUNT</span>
            <span className="text-black">{formatPrice(totals.grandTotal)}</span>
          </div>
        </div>

        {/* Notice that it is a demo order */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-[11px] font-mono text-amber-800">
          DEMO MODE NOTICE: This is a demonstration storefront. No real payments were charged and no physical package will be shipped.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild variant="primary" className="font-mono text-xs uppercase bg-black hover:bg-zinc-800 text-white">
            <Link href="/track-order">TRACK ORDER STATUS</Link>
          </Button>
          <Button asChild variant="secondary" className="font-mono text-xs uppercase border-zinc-300 hover:bg-zinc-100 text-black">
            <Link href="/">BACK TO HOME</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 pb-6 border-b border-zinc-200">
        <Link href="/cart" className="hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CART</span>
        </Link>
        <span>/</span>
        <span className="text-black font-bold">SECURE CHECKOUT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
        {/* Left Column: Checkout Delivery Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details */}
            <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4">
              <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                  1
                </span>
                <span>CONTACT INFORMATION</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600 font-sans"
                  />
                  {errors.fullName && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                      Mobile Phone (10 digits)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600 font-mono"
                    />
                    {errors.phone && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600 font-sans"
                    />
                    {errors.email && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4">
              <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                  2
                </span>
                <span>DELIVERY ADDRESS</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                    Street Address / Flat / Floor
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Building Name, Street"
                    className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600 font-sans"
                  />
                  {errors.address && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black font-sans"
                    />
                    {errors.city && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black font-sans"
                    />
                    {errors.state && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                      PIN Code (6 digits)
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="560001"
                      className="w-full h-11 px-3 rounded-md bg-white border border-zinc-300 text-xs text-black font-mono"
                    />
                    {errors.pincode && <p className="text-red-600 font-mono text-[10px] pt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4">
              <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                  3
                </span>
                <span>PAYMENT METHOD</span>
              </h2>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3.5 rounded-md bg-white border border-zinc-300 cursor-pointer hover:border-red-600">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-red-600 focus:ring-red-600"
                    />
                    <div>
                      <span className="font-mono text-xs font-bold uppercase text-black block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] text-zinc-600">Pay in cash or UPI upon delivery</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                    NO EXTRA CHARGE
                  </span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-md bg-white border border-zinc-300 cursor-pointer hover:border-red-600">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="text-red-600 focus:ring-red-600"
                    />
                    <div>
                      <span className="font-mono text-xs font-bold uppercase text-black block">
                        Instant UPI / QR Code (Mock)
                      </span>
                      <span className="text-[11px] text-zinc-600">Google Pay, PhonePe, Paytm</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    FAST CHECKOUT
                  </span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-md bg-white border border-zinc-300 cursor-pointer hover:border-red-600">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-red-600 focus:ring-red-600"
                    />
                    <div>
                      <span className="font-mono text-xs font-bold uppercase text-black block">
                        Credit / Debit Card (Mock)
                      </span>
                      <span className="text-[11px] text-zinc-600">Visa, Mastercard, RuPay</span>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-zinc-400" />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full h-14 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'PLACING ORDER...' : `PLACE ORDER · ${formatPrice(totals.grandTotal)}`}</span>
            </Button>
          </form>
        </div>

        {/* Right Column: Order Summary & Line Items */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4 shadow-sm">
            <h2 className="font-mono font-bold text-base uppercase tracking-wider text-black border-b border-zinc-200 pb-3">
              YOUR ORDER ({totals.itemsCount} ITEMS)
            </h2>

            {/* Items summary */}
            <div className="divide-y divide-zinc-200 max-h-72 overflow-y-auto pr-1">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;

                return (
                  <div key={`${line.productId}-${line.size}`} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-14 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                        <ProductImage
                          src={product.images[0]?.src || `/products/${product.slug}/1.svg`}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-mono text-xs font-bold uppercase text-black truncate">
                          {product.title}
                        </h4>
                        <span className="font-mono text-[10px] text-zinc-500 block">
                          Size: {line.size} · Qty: {line.qty}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-black shrink-0">
                      {formatPrice(product.price * line.qty)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs font-mono">
              <div className="flex justify-between text-zinc-600">
                <span>SUBTOTAL</span>
                <span className="text-black font-bold">{formatPrice(totals.subtotal)}</span>
              </div>

              {totals.savings > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>SAVINGS</span>
                  <span className="font-bold">-{formatPrice(totals.savings)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-600">
                <span>SHIPPING</span>
                <span>
                  {totals.shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-bold uppercase">FREE</strong>
                  ) : (
                    formatPrice(totals.shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-zinc-200">
                <span>TOTAL PAYABLE</span>
                <span className="font-mono text-lg text-black">{formatPrice(totals.grandTotal)}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-700 shrink-0" />
              <span>256-bit SSL encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
