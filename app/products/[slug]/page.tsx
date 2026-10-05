import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';
import { getReviewsByProductId } from '@/data/reviews';
import { ProductGallery } from '@/components/store/ProductGallery';
import { ProductGrid } from '@/components/store/ProductGrid';
import { ProductDetailsClient } from './ProductDetailsClient';
import { SITE } from '@/lib/config';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} — ${SITE.name}`,
    description: product.description,
    openGraph: {
      title: `${product.title} — ${SITE.name}`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.src || `/products/${product.slug}/1.svg`,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const reviews = getReviewsByProductId(product.id);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((i) => `https://ellane.store${i.src}`),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: `https://ellane.store/products/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column: Sticky Product Purchase Form & Accordions */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductDetailsClient product={product} reviews={reviews} />
          </div>
        </div>

        {/* Related Products: You May Also Like */}
        {relatedProducts.length > 0 && (
          <section aria-label="You May Also Like" className="mt-20 pt-12 border-t border-zinc-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-red-700 block">
                  RECOMMENDATIONS // おすすめ
                </span>
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-black">
                  YOU MAY ALSO LIKE
                </h3>
              </div>
            </div>

            <ProductGrid products={relatedProducts} priorityCount={2} />
          </section>
        )}
      </div>
    </>
  );
}
