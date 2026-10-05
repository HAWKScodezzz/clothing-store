'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ProductImage({
  src,
  alt,
  className,
  fallbackSrc = '/categories/all-products.svg',
  ...props
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || 'ELLANE product photo'}
      className={cn('transition-all duration-300', className)}
      onError={() => {
        setHasError(true);
        setImgSrc(fallbackSrc);
      }}
      {...props}
    />
  );
}
