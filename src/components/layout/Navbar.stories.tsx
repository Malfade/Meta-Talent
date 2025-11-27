import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
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
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};



