import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-xs font-mono uppercase tracking-widest transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 select-none min-h-[44px]',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white font-bold hover:bg-white hover:text-black border border-accent shadow-sm',
        secondary: 'bg-transparent text-text border border-border hover:bg-white hover:text-black hover:border-white font-medium',
        outline: 'bg-transparent text-text border border-border hover:border-muted font-medium',
        ghost: 'text-text hover:bg-surface-2 hover:text-white',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        link: 'text-text underline-offset-4 hover:underline p-0 min-h-0',
      },
      size: {
        default: 'h-11 px-6 py-2 rounded-sm',
        sm: 'h-9 px-4 py-1 text-[11px] rounded-sm min-h-[36px]',
        lg: 'h-13 px-8 py-3 text-sm font-bold rounded-sm min-h-[50px]',
        icon: 'h-11 w-11 p-0 rounded-sm',
        iconSm: 'h-9 w-9 p-0 rounded-sm min-h-[36px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
