import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from './MovieDetails';
import { MovieInfo } from '../../shared/models/movie-info';

describe('MovieDetails', () => {
  const mockMovie: MovieInfo = {
    id: 1,
    imageUrl: 'https://example.com/poster.jpg',
    title: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    rating: '8.8',
    duration: '148 min',
    description: 'A mind-bending thriller about dreams within dreams.'
  };

  describe('rendering', () => {
    test('should render movie poster with correct attributes', () => {
      render(<MovieDetails movie={mockMovie} />);
      
      const poster = screen.getByTestId('movie-poster-large');
      expect(poster).toBeInTheDocument();
      expect(poster).toHaveAttribute('src', mockMovie.imageUrl);
      expect(poster).toHaveAttribute('alt', mockMovie.title);
    });

    test('should render movie title', () => {
      render(<MovieDetails movie={mockMovie} />);
      
      const title = screen.getByTestId('movie-title-large');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(mockMovie.title);
      expect(title).toHaveClass('movie-title-large');
    });

    test('should render movie year', () => {
      render(<MovieDetails movie={mockMovie} />);
      
      const year = screen.getByTestId('movie-year-large');
      expect(year).toBeInTheDocument();
      expect(year).toHaveTextContent(mockMovie.year.toString());
      expect(year).toHaveClass('movie-year-large');
    });

    test('should render movie genres', () => {
      render(<MovieDetails movie={mockMovie} />);
      
      const genres = screen.getByTestId('movie-genres');
      expect(genres).toBeInTheDocument();
      expect(genres).toHaveTextContent('Action, Sci-Fi, Thriller');
      expect(genres).toHaveClass('movie-genres');
    });
  });
});
