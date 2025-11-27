import type { Meta, StoryObj } from '@storybook/react';
import GradientButton from './GradientButton';

const meta = {
  title: 'Components/GradientButton',
  component: GradientButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Начать тест',
  },
} satisfies Meta<typeof GradientButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Soft: Story = {
  args: {
    soft: true,
    children: 'Подробнее',
  },
};

