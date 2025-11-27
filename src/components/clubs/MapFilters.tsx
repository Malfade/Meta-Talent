type MapFiltersProps = {
  formats: Array<'Все' | 'Онлайн' | 'Офлайн'>;
  activeFormat: 'Все' | 'Онлайн' | 'Офлайн';
  onFormatChange: (f: 'Все' | 'Онлайн' | 'Офлайн') => void;
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
};

const MapFilters = ({
  formats,
  activeFormat,
  onFormatChange,
  tags,
  activeTag,
  onTagChange,
}: MapFiltersProps) => (
  <div className="flex flex-wrap items-center gap-3">
    {formats.map((format) => (
      <button
        key={format}
        onClick={() => onFormatChange(format)}
        className={`rounded-full px-4 py-2 text-sm ${
          activeFormat === format ? 'bg-cta-gradient text-white' : 'bg-brand-surface text-brand-dark'
        }`}
      >
        {format}
      </button>
    ))}
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(activeTag === tag ? null : tag)}
          className={`rounded-full border px-3 py-1 text-xs ${
            activeTag === tag
              ? 'border-transparent bg-brand-primary/90 text-white'
              : 'border-brand-primary/20 text-brand-dark'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  </div>
);

export default MapFilters;



