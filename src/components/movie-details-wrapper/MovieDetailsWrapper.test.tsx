import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieDetailsWrapper from './MovieDetailsWrapper';

const mockNavigate = jest.fn();
const mockParams = { movieId: '123' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams,
}));

jest.mock('../../shared/mappers/movie.mapper', () => ({
  mapMovieDtoToMovieInfo: jest.fn(),
}));

const mockMovieDto = {
  id: 123,
  title: 'Test Movie',
  poster_path: 'http://example.com/poster.jpg',
  release_date: '2023-01-01',
  genres: ['Action', 'Drama'],
  vote_average: 7.5,
  runtime: 120,
  overview: 'A test movie overview.',
};

const mockMappedMovie = {
  id: 123,
  imageUrl: 'http://example.com/poster.jpg',
  title: 'Test Movie',
  year: '2023',
  genres: ['Action', 'Drama'],
  rating: '7.5',
  duration: '2h 0m',
  description: 'A test movie overview.',
};

describe('MovieDetailsWrapper', () => {
  const originalFetch = global.fetch;
  const mockMapMovieDtoToMovieInfo = require('../../shared/mappers/movie.mapper').mapMovieDtoToMovieInfo;

  beforeEach(() => {
    mockMapMovieDtoToMovieInfo.mockReturnValue(mockMappedMovie);
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovieDto),
      })
    );
  });

  afterEach(() => {
    (global as any).fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('fetches and displays movie details', async () => {
    render(
      <BrowserRouter>
        <MovieDetailsWrapper />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/movies/123');
    });

    await waitFor(() => {
      expect(mockMapMovieDtoToMovieInfo).toHaveBeenCalledWith(mockMovieDto);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2h 0m')).toBeInTheDocument();
    expect(screen.getByText('A test movie overview.')).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <MovieDetailsWrapper />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/movies/123');
    });

    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('handles network error gracefully', async () => {
    (global as any).fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <MovieDetailsWrapper />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/movies/123');
    });

    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('navigates to /movies when close is called', async () => {
    render(
      <BrowserRouter>
        <MovieDetailsWrapper />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/movies');
  });
});
