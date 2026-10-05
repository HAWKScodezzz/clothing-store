'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-surface group-[.toaster]:text-text group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-sm group-[.toaster]:font-sans',
          description: 'group-[.toast]:text-muted group-[.toast]:text-xs',
          actionButton:
            'group-[.toast]:bg-accent group-[.toast]:text-white group-[.toast]:font-mono group-[.toast]:text-xs group-[.toast]:uppercase group-[.toast]:rounded-sm',
          cancelButton:
            'group-[.toast]:bg-surface-2 group-[.toast]:text-muted group-[.toast]:font-mono group-[.toast]:text-xs group-[.toast]:uppercase group-[.toast]:rounded-sm',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
