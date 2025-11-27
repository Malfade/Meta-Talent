type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) => (
  <div className={align === 'center' ? 'text-center space-y-3' : 'space-y-2'}>
    {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{eyebrow}</p>}
    <h2 className="font-display text-2xl md:text-3xl text-brand-dark">{title}</h2>
    {description && <p className="text-sm text-muted max-w-2xl mx-auto">{description}</p>}
  </div>
);

export default SectionHeading;

