import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from '../MovieDetails';
import { MovieInfo } from '../../../shared/models/movie-info';

const mockMovie: MovieInfo = {
  id: 1,
  imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
  title: 'Inception',
  year: 2010,
  genres: ['Action', 'Sci-Fi', 'Thriller'],
  rating: '8.8',
  duration: '148 min',
  description: 'A mind-bending thriller about dreams within dreams. A skilled thief is given a chance at redemption if he can pull off the impossible: inception, the planting of an idea in someone\'s mind.'
};

const meta: Meta<typeof MovieDetails> = {
  title: 'components/MovieDetails',
  component: MovieDetails,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A Movie Details component.',
      },
    },
  },
  argTypes: {
    movie: {
      description: 'Movie info object',
      control: { type: 'object' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default movie details view',
      },
    },
  },
};
