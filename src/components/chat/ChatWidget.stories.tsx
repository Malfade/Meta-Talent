import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ChatWidget from './ChatWidget';

const meta = {
  title: 'Screens/ChatWidget',
  component: ChatWidget,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-brand-surface">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ChatWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};



