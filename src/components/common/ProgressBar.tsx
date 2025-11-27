type ProgressBarProps = {
  value: number;
};

const ProgressBar = ({ value }: ProgressBarProps) => (
  <div className="h-2 rounded-full bg-white/30">
    <div
      className="h-full rounded-full bg-cta-gradient transition-[width]"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default ProgressBar;



