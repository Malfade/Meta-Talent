import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    soft?: boolean;
  }>;

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60';

const GradientButton = ({ children, className, soft, ...rest }: GradientButtonProps) => (
  <button
    className={clsx(
      baseClass,
      soft
        ? 'border border-white/60 bg-white/80 text-brand-dark shadow-sm hover:bg-white/90'
        : 'bg-cta-gradient text-white shadow-glass',
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

export default GradientButton;

