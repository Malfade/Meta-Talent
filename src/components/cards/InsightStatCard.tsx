type InsightStatCardProps = {
  label: string;
  value: string;
  description: string;
  trend?: 'up' | 'steady';
};

const InsightStatCard = ({ label, value, description, trend = 'steady' }: InsightStatCardProps) => (
  <div className="rounded-3xl border border-brand-primary/15 p-4">
    <p className="text-xs uppercase tracking-[0.3em] text-muted">{label}</p>
    <p className="mt-2 text-lg font-semibold text-brand-dark">{value}</p>
    <p className="text-xs text-muted">{description}</p>
    <span
      className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
        trend === 'up' ? 'text-brand-primary' : 'text-muted'
      }`}
    >
      {trend === 'up' ? '↗ растёт' : '→ стабильно'}
    </span>
  </div>
);

export default InsightStatCard;



