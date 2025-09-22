import type { Meta, StoryObj } from '@storybook/react';
import MovieForm from '../MovieForm';
import ModalDialog from '../../modal-dialog/ModalDialog';

const meta: Meta<typeof MovieForm> = {
  title: 'Components/MovieForm/Modal',
  component: MovieForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.5)', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <ModalDialog
          title={context.args.initialMovie ? "Edit Movie" : "Add Movie"}
          onClose={() => {}}
        >
          <Story />
        </ModalDialog>
      </div>
    ),
  ],
  argTypes: {
    initialMovie: {
      control: false,
      description: 'Optional initial movie data',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function called when form is submitted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AddMovieModal: Story = {
  args: {
    onSubmit: (data: any) => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal dialog with empty MovieForm for adding a new movie',
      },
    },
  },
};

export const EditMovieModal: Story = {
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
    onSubmit: (data: any) => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal dialog with prefilled MovieForm for editing an existing movie',
      },
    },
  },
};
