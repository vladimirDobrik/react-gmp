import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieListPage from './MovieListPage';

const mockDto = {
  id: 347882,
  title: 'Sleight',
  tagline: 'You can change the cards you\'re dealt',
  vote_average: 5.2,
  vote_count: 290,
  release_date: '2017-04-28',
  poster_path: 'https://image.tmdb.org/t/p/w500/wridRvGxDqGldhzAIh3IcZhHT5F.jpg',
  overview: 'A young street magician is left to take care of his little sister...',
  budget: 0,
  revenue: 0,
  genres: ['Drama', 'Thriller', 'Action', 'Science Fiction'],
  runtime: 89,
};

const mockDto2 = {
  id: 1,
  title: 'Interstellar',
  release_date: '2014-11-07',
  poster_path: 'https://image.tmdb.org/t/p/w500/abc.jpg',
  overview: 'Space travel',
  genres: ['Drama', 'Science Fiction'],
  runtime: 169,
  vote_average: 8.6,
};

describe('MovieListPage', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockDto, mockDto2],
    });
  });

  afterEach(() => {
    (global as any).fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('fetches movies on mount with default params and renders list', async () => {
    render(<MovieListPage />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:4000/movies?sortBy=title'),
      expect.any(Object)
    );
    expect(await screen.findByText('Sleight')).toBeInTheDocument();
    expect(await screen.findByText('Interstellar')).toBeInTheDocument();
  });

  it('triggers fetch when genre changes', async () => {
    render(<MovieListPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockDto],
    });

    const dramaBtn = screen.getAllByTestId('genre-button').find((b) => b.textContent === 'Drama');
    expect(dramaBtn).toBeTruthy();
    fireEvent.click(dramaBtn as HTMLElement);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const url = (global.fetch as jest.Mock).mock.calls[1][0] as string;
    expect(url).toContain('filter=Drama');
  });

  it('triggers fetch when sort criterion changes', async () => {
    render(<MovieListPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockDto2],
    });

    const sortSelect = screen.getByTestId('sort-select') as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: 'releaseDate' } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const url = (global.fetch as jest.Mock).mock.calls[1][0] as string;
    expect(url).toContain('sortBy=releaseDate');
  });

  it('triggers fetch when searching via SearchBar', async () => {
    render(<MovieListPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockDto],
    });

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'sleight' } });
    fireEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const url = (global.fetch as jest.Mock).mock.calls[1][0] as string;
    expect(url).toContain('search=sleight');
  });
});
