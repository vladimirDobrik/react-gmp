import type { Meta, StoryObj } from '@storybook/react';
import MovieTileMenu from '../MovieTileMenu';

const meta: Meta<typeof MovieTileMenu> = {
  title: 'components/MovieTileMenu',
  component: MovieTileMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown menu component',
      },
    },
  },
  argTypes: {
    onEdit: { type: 'function'},
    onDelete: { type: 'function'}
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WithInitialValue: Story = {
  args: {
    onEdit: () => {},
    onDelete: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown menu component',
      },
    },
  },
};
