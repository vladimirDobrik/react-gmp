import type { Meta, StoryObj } from '@storybook/react';
import MovieTile from '../../MovieTile';

const mockMoview = {
  id: 0,
  imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
  title: 'Inception',
  year: 2010,
  genres: ['Action', 'Sci-Fi']
};

const meta: Meta<typeof MovieTile> = {
  title: 'components/MovieTile',
  component: MovieTile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A moview tile component.',
      },
    },
  },
  argTypes: {
    onClick: { type: 'function' },
    onEdit: { type: 'function'},
    onDelete: { type: 'function'}
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: mockMoview,
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WithoutPoster: Story = {
  args: {
    movie: {...mockMoview, imageUrl: undefined},
    onEdit: () => {},
    onDelete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'A moview tile component without a poster',
      },
    },
  },
};
