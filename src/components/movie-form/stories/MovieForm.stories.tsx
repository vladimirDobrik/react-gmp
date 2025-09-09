import type { Meta, StoryObj } from '@storybook/react';
import MovieForm from '../MovieForm';

const meta: Meta<typeof MovieForm> = {
  title: 'Components/MovieForm',
  component: MovieForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialMovie: {
      control: false,
      description: 'Optional initial movie data to prefill the form',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function called when form is submitted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AddMovie: Story = {
  args: {
    onSubmit: (data: any) => console.log('Add movie:', data),
  },
};

export const EditMovie: Story = {
  args: {
    initialMovie: {
      id: 1,
      title: 'Inception',
      year: 2010,
      genres: ['Action', 'Sci-Fi', 'Thriller'],
      imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
      rating: '8.8',
      duration: '2h 28m',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
    },
    onSubmit: (data: any) => console.log('Update movie:', data),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form prefilled with movie data for editing. Note: The select dropdown will show the selected genres.',
      },
    },
  },
};
