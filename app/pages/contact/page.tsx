'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { SITE } from '@/lib/config';
import { Button } from '@/components/ui/button';
import {
  Phone,
  MessageSquare,
  Instagram,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a 10-digit phone number'),
  message: z.string().min(5, 'Please write your message or enquiry'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-zinc-200">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
          GET IN TOUCH // お問い合わせ
        </span>
        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
          CONTACT ELLANE
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-xl font-mono">
          Have a question about sizes, shipping, exchanges, or store visits? Reach out to our concierge desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
        {/* Left Column: Direct Channels & Store Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-md bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-black">
                    WHATSAPP SUPPORT
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">+91 {SITE.whatsapp}</span>
                </div>
              </div>
              <span className="text-emerald-700 font-mono text-xs uppercase font-bold group-hover:translate-x-1 transition-transform">
                Chat &rarr;
              </span>
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="p-5 rounded-md bg-zinc-50 border border-zinc-200 hover:border-red-600 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-zinc-100 border border-zinc-300 flex items-center justify-center text-red-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-black">
                    CALL OUR STORE
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">+91 {SITE.phone}</span>
                </div>
              </div>
              <span className="text-red-700 font-mono text-xs uppercase font-bold group-hover:translate-x-1 transition-transform">
                Call &rarr;
              </span>
            </a>

            {/* Instagram */}
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-md bg-zinc-50 border border-zinc-200 hover:border-rose-500 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-rose-50 border border-rose-300 flex items-center justify-center text-rose-600">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-black">
                    INSTAGRAM DM
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">{SITE.handle}</span>
                </div>
              </div>
              <span className="text-rose-600 font-mono text-xs uppercase font-bold group-hover:translate-x-1 transition-transform">
                DM &rarr;
              </span>
            </a>
          </div>

          {/* Physical Address */}
          <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase text-black flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-700" />
              <span>BENGALURU FLAGSHIP STORE</span>
            </h3>
            <div className="space-y-2 text-xs text-zinc-600 font-sans">
              <p>{SITE.address}</p>
              <div className="flex items-center gap-2 text-zinc-800 pt-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-red-700" />
                <span>{SITE.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-md bg-zinc-50 border border-zinc-200 space-y-6 shadow-xl">
            <h2 className="font-display font-bold text-base uppercase tracking-wider text-black">
              SEND US A MESSAGE
            </h2>

            {isSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-sm text-center space-y-3 font-mono text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-black font-bold text-sm uppercase">MESSAGE SENT SUCCESSFULLY</h3>
                <p className="text-zinc-600 max-w-sm mx-auto font-sans text-xs">
                  Thank you for reaching out. Our support team will reply to your phone/email within a few hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSent(false)}
                  className="font-mono text-xs uppercase mt-2 border-zinc-300 text-black hover:bg-zinc-200"
                >
                  SEND ANOTHER MESSAGE
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="uppercase font-bold text-zinc-700 block pb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full h-11 px-3 rounded-sm bg-white border border-zinc-300 text-black text-xs font-sans placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.name && <p className="text-red-600 text-[10px] pt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="uppercase font-bold text-zinc-700 block pb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full h-11 px-3 rounded-sm bg-white border border-zinc-300 text-black text-xs font-sans placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.email && <p className="text-red-600 text-[10px] pt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="uppercase font-bold text-zinc-700 block pb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full h-11 px-3 rounded-sm bg-white border border-zinc-300 text-black text-xs font-sans placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.phone && <p className="text-red-600 text-[10px] pt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="uppercase font-bold text-zinc-700 block pb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you elevate your outfits?"
                    className="w-full p-3 rounded-sm bg-white border border-zinc-300 text-black text-xs font-sans placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.message && <p className="text-red-600 text-[10px] pt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full h-12 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-black text-white hover:bg-zinc-800"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SENDING...' : 'TRANSMIT MESSAGE'}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
