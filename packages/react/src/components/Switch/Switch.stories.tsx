import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Garlic yogurt',
    size: 'md',
    tone: 'primary',
    defaultChecked: true,
    disabled: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    tone: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger', 'info'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Switch {...args} defaultChecked={false}>
        Off
      </Switch>
      <Switch {...args} defaultChecked>
        On
      </Switch>
      <Switch {...args} defaultChecked={false} disabled>
        Disabled
      </Switch>
      <Switch {...args} defaultChecked disabled>
        Disabled, on
      </Switch>
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {(['primary', 'success', 'warning', 'danger', 'info'] as const).map(
        (tone) => (
          <Switch {...args} key={tone} tone={tone}>
            {tone}
          </Switch>
        ),
      )}
    </div>
  ),
};
