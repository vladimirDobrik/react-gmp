import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './MovieForm';

const mockOnSubmit = jest.fn();

const mockInitialMovie = {
  id: 1,
  title: 'Test Movie',
  year: 2020,
  genres: ['Action', 'Drama'],
  imageUrl: 'https://example.com/image.jpg',
  rating: '8.5',
  duration: '2h 30m',
  description: 'A test movie description'
};

describe('MovieForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/movie url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/overview/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('prefills form fields when initialMovie', () => {
    render(<MovieForm initialMovie={mockInitialMovie} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByDisplayValue('Test Movie')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2h 30m')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A test movie description')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const yearInput = screen.getByLabelText(/release date/i);
    const imageUrlInput = screen.getByLabelText(/movie url/i);
    const ratingInput = screen.getByLabelText(/rating/i);
    const durationInput = screen.getByLabelText(/runtime/i);
    const descriptionInput = screen.getByLabelText(/overview/i);
    const genresSelect = screen.getByLabelText(/genre/i) as HTMLSelectElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await userEvent.type(titleInput, 'New Movie');
    await userEvent.clear(yearInput);
    await userEvent.type(yearInput, '2023');
    await userEvent.type(imageUrlInput, 'https://example.com/poster.jpg');
    await userEvent.type(ratingInput, '8.5');
    await userEvent.type(durationInput, '2h 30m');
    await userEvent.type(descriptionInput, 'A great movie description');
    await userEvent.selectOptions(genresSelect, ['Drama']);
    
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: '',
        title: 'New Movie',
        year: '2023',
        genres: ['Drama'],
        imageUrl: 'https://example.com/poster.jpg',
        rating: '08.5',
        duration: '2h 30m',
        description: 'A great movie description'
      });
    });
  });

  it('collects multiple selected genres from multi-select', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const imageUrlInput = screen.getByLabelText(/movie url/i);
    const ratingInput = screen.getByLabelText(/rating/i);
    const durationInput = screen.getByLabelText(/runtime/i);
    const descriptionInput = screen.getByLabelText(/overview/i);
    const genresSelect = screen.getByLabelText(/genre/i) as HTMLSelectElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(titleInput, 'Test Movie');
    await userEvent.type(imageUrlInput, 'https://example.com/poster.jpg');
    await userEvent.type(ratingInput, '7.5');
    await userEvent.type(durationInput, '2h 0m');
    await userEvent.type(descriptionInput, 'A test movie description');

    await userEvent.selectOptions(genresSelect, ['Documentary', 'Crime']);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          genres: ['Documentary', 'Crime']
        })
      );
    });
  });
});
