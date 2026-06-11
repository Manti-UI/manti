import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const tones = [
  'primary',
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
] as const;
const variants = ['solid', 'soft', 'outline'] as const;

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  alignItems: 'center',
};

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Fresh',
    variant: 'soft',
    tone: 'success',
    size: 'sm',
    dot: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    tone: { control: 'select', options: tones },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {variants.map((variant) => (
        <div style={row} key={variant}>
          {tones.map((tone) => (
            <Badge {...args} key={tone} variant={variant} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: (args) => (
    <div style={row}>
      <Badge {...args} tone="success" dot>
        Ready
      </Badge>
      <Badge {...args} tone="warning" dot>
        Resting
      </Badge>
      <Badge {...args} tone="danger" dot>
        Burnt
      </Badge>
    </div>
  ),
};
