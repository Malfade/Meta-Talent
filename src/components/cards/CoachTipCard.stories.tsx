import type { Meta, StoryObj } from '@storybook/react';

import CoachTipCard from './CoachTipCard';

const meta = {
  title: 'Cards/CoachTipCard',
  component: CoachTipCard,
  args: {
    title: 'Python + Основы ИИ',
    description: 'Выдели 2 тайм-бокса и покажи результат на Dev Lab.',
    badge: 'Следующий шаг',
    emphasis: 'primary',
  },
} satisfies Meta<typeof CoachTipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Neutral: Story = {
  args: {
    title: 'AI Product Jam',
    description: 'Подготовь питч и пригласи команду на демо.',
    badge: 'Комьюнити',
    emphasis: 'neutral',
  },
};

