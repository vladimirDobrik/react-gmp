import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenreList from './GenreList';

describe('GenreList', () => {
  const mockGenres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders all genres', () => {
    render(
      <GenreList
        genres={mockGenres}
        selectedGenre="All"
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getAllByTestId('genre-button')).toHaveLength(5);
  });

  describe('Highlight selected genre', () => {
    test('highlights a selected genre', () => {
      render(
        <GenreList
          genres={mockGenres}
          selectedGenre="All"
          onSelect={mockOnSelect}
        />
      );
  
      const selectedGenreButton = screen.getByText('All');
      expect(selectedGenreButton).toHaveClass('selected');
    });
  })

  describe('Select genre', () => {
    test('should select genre and call onSelect', () => {
      render(
        <GenreList
          genres={mockGenres}
          selectedGenre="All"
          onSelect={mockOnSelect}
        />
      );
  
      const horrorGenreButton = screen.getByText('Horror');
      fireEvent.click(horrorGenreButton);
  
      expect(mockOnSelect).toHaveBeenCalledWith('Horror');
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
  })
});
