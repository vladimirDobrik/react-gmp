import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieTile from './MovieTile';

describe('MovieTile', () => {
  const mockMovie = {
    id: 0,
    imageUrl: 'https://example.com/poster.jpg',
    title: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi'],
  };

  test('renders movie tile with title, year, genres and poster', () => {
    render(<MovieTile movie={mockMovie} onClick={jest.fn()} />);

    expect(screen.getByTestId('movie-title')).toHaveTextContent('Inception');
    expect(screen.getByTestId('movie-year')).toHaveTextContent('2010');
    expect(screen.getByTestId('movie-genres')).toHaveTextContent('Action, Sci-Fi');

    const img = screen.getByRole('img', { name: /inception/i });
    expect(img).toHaveAttribute('src', mockMovie.imageUrl);
    expect(img).toHaveAttribute('alt', mockMovie.title);
  });

  test('calls onClick with movie when tile is clicked', () => {
    const onClick = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={onClick} />);

    fireEvent.click(screen.getByTestId('movie-tile'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(mockMovie);
  });

  test('renders menu and triggers onEdit/onDelete', () => {
    const onClick = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={onClick} onEdit={onEdit} onDelete={onDelete} />);

    const menuButton = screen.getByTestId('movie-menu-button');
    fireEvent.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: /edit/i });
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockMovie);

    fireEvent.click(menuButton);
    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(mockMovie);
  });
});
