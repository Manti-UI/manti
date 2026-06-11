import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Recipe name',
    placeholder: 'Kayseri mantısı',
    size: 'md',
    tone: 'primary',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger', 'info'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHint: Story = {
  args: { hint: 'Shown to everyone browsing the cookbook.' },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'mantı',
    error: 'This recipe name is already taken.',
  },
};

export const WithAddons: Story = {
  args: {
    label: 'Servings',
    leadingAddon: <span aria-hidden>🍽️</span>,
    trailingAddon: <span style={{ fontSize: 13 }}>people</span>,
    placeholder: '4',
    type: 'number',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <TextField {...args} size="sm" label="Small" />
      <TextField {...args} size="md" label="Medium" />
      <TextField {...args} size="lg" label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: 'Locked recipe', disabled: true },
};
