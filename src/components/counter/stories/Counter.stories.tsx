import type { Meta, StoryObj } from '@storybook/react';
import Counter from '../Counter';

const meta: Meta<typeof Counter> = {
  title: 'components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A counter component that allows incrementing and decrementing a value.',
      },
    },
  },
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      description: 'The initial value for the counter',
      defaultValue: 0,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 0,
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Counter starting with an initial value of 5.',
      },
    },
  },
};
