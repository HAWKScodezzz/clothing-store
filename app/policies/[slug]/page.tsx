import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { POLICIES, getPolicyBySlug } from '@/data/policies';
import { SITE } from '@/lib/config';
import { ShieldAlert } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return { title: 'Policy Not Found' };
  }

  return {
    title: `${policy.title} — ${SITE.name}`,
    description: `Official ${policy.title} terms for ${SITE.name}.`,
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 select-none bg-white text-black min-h-screen">
      {/* Policy Header */}
      <div className="space-y-2 pb-6 border-b border-zinc-200">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
          LEGAL &amp; COMPLIANCE // 規約
        </span>
        <h1 className="font-mono font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
          {policy.title}
        </h1>
        <p className="font-mono text-xs text-zinc-500">
          Last Updated: {policy.lastUpdated}
        </p>
      </div>

      {/* Policy Body */}
      <div className="max-w-none text-zinc-700 text-sm leading-relaxed space-y-4 pt-6 font-sans">
        {policy.content.map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="font-mono font-bold text-base text-black uppercase tracking-wide pt-4 pb-1 border-b border-zinc-200"
              >
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <li key={idx} className="ml-4 list-disc text-zinc-600">
                {paragraph.replace('- ', '')}
              </li>
            );
          }
          return (
            <p key={idx} className="text-zinc-600 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}
