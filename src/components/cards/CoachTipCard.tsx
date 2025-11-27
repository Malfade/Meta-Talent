type CoachTipCardProps = {
  title: string;
  description: string;
  badge?: string;
  emphasis?: 'primary' | 'neutral';
};

const CoachTipCard = ({ title, description, badge, emphasis = 'neutral' }: CoachTipCardProps) => (
  <div
    className={`rounded-2xl border p-4 ${
      emphasis === 'primary'
        ? 'border-brand-primary/20 bg-brand-primary/10 text-brand-dark'
        : 'border-brand-primary/15 bg-brand-surface text-brand-dark'
    }`}
  >
    {badge && <p className="text-xs uppercase tracking-[0.3em] text-muted">{badge}</p>}
    <p className="mt-2 text-lg font-semibold text-brand-dark">{title}</p>
    <p className="text-sm text-muted">{description}</p>
  </div>
);

export default CoachTipCard;

