import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';

import MapFilters from './MapFilters';

const meta = {
  title: 'Clubs/MapFilters',
  component: MapFilters,
  args: {
    formats: ['Все', 'Онлайн', 'Офлайн'] as const,
    activeFormat: 'Все',
    tags: ['AI', 'Design', 'Product', 'Growth'],
    activeTag: null,
  },
} satisfies Meta<typeof MapFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

const Playground = (args: ComponentProps<typeof MapFilters>) => {
  const [activeFormat, setActiveFormat] = useState<'Все' | 'Онлайн' | 'Офлайн'>(args.activeFormat);
  const [activeTag, setActiveTag] = useState<string | null>(args.activeTag);

  return (
    <MapFilters
      {...args}
      activeFormat={activeFormat}
      activeTag={activeTag}
      onFormatChange={setActiveFormat}
      onTagChange={setActiveTag}
    />
  );
};

export const Interactive: Story = {
  args: {
    activeFormat: 'Все',
    activeTag: null,
    onFormatChange: () => {},
    onTagChange: () => {},
  },
  render: (args) => <Playground {...args} />,
};

