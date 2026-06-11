import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

const items = [
  {
    value: 'dough',
    label: 'Dough',
    content: 'Flour, egg, water, and a pinch of salt.',
  },
  {
    value: 'filling',
    label: 'Filling',
    content: 'Beef or lamb, grated onion, and spice.',
  },
  {
    value: 'sauce',
    label: 'Sauce',
    content: 'Garlic yogurt under warm paprika butter.',
  },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { items, tone: 'primary' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger', 'info'],
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};
