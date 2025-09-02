import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search bar with an input and a button that triggers onSearch.',
      },
    },
  },
  args: {
    initialQuery: '',
    onSearch: (value: string) => {},
  },
  argTypes: {
    initialQuery: {
      control: { type: 'text' },
      description: 'Initial input value',
      defaultValue: '',
    },
    onSearch: {
      action: 'search',
      description: 'Called when clicking Search or pressing Enter',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialQuery: '',
  },
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: 'Movie',
  },
};
