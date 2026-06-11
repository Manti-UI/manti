import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const tones = [
  'primary',
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
};

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Knead dough',
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    loading: false,
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    tone: { control: 'select', options: tones },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {variants.map((variant) => (
        <div style={row} key={variant}>
          {tones.map((tone) => (
            <Button {...args} key={tone} variant={variant} tone={tone}>
              {tone}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} leadingIcon={<span aria-hidden>＋</span>}>
        Add filling
      </Button>
      <Button
        {...args}
        variant="soft"
        trailingIcon={<span aria-hidden>→</span>}
      >
        Continue
      </Button>
      <Button {...args} iconOnly aria-label="More options">
        <span aria-hidden>⋯</span>
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};
