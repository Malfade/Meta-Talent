import type { Meta, StoryObj } from '@storybook/react';

import InsightStatCard from './InsightStatCard';

const meta = {
  title: 'Cards/InsightStatCard',
  component: InsightStatCard,
  args: {
    label: 'Тип профиля',
    value: 'AI Storyteller',
    description: 'Комбинирует технические и креативные навыки.',
    trend: 'up',
  },
} satisfies Meta<typeof InsightStatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};



