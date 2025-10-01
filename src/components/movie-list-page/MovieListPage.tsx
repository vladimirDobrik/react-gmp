import React, { useState } from 'react';
import Header from '../header/Header';
import GenreList from '../genre-list/GenreList';
import SortControl from '../sort-control/SortControl';
import MovieList from '../movie-list/MovieList';
import ModalDialog from '../modal-dialog/ModalDialog';
import ModalDialogScrollLock from '../modal-dialog-scroll-lock/ModalDoalogScrollLock';
import MovieForm from '../movie-form/MovieForm';
import { MovieInfo } from '../../shared/models/movie-info';

import './MovieListPage.css';
import SearchBar from '../search-bar/SearchBar';
import { useFetchMovies } from '../../shared/hooks/useFetchMovies';
import { useMoviesSearchParams } from '../../shared/hooks/useMoviesSearchParams';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const MovieListPage: React.FC = () => {
  const genres = ['All', 'Action', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Drama'];
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    searchQuery,
    sortSelection,
    selectedGenre,
    updateSearchQuery,
    updateSortSelection,
    updateSelectedGenre,
  } = useMoviesSearchParams();

  const [showMovieModal, setShowMovieModal] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<MovieInfo | null>(null);
  const [movies, setMovies] = useState<MovieInfo[]>([]);

  const isMovieDetailsRoute = location.pathname !== '/';

  const handleMovieSubmit = (movieData: any) => {
    setShowMovieModal(false);
    setEditingMovie(null);
  };

  const handleOnEditMovie = (movie: MovieInfo) => {
    setEditingMovie(movie);
    setShowMovieModal(true);
  };

  const handleSelectMovie = (movie: MovieInfo) => {
    const currentParams = searchParams.toString();
    const url = `/movies/${movie.id}${currentParams ? `?${currentParams}` : ''}`;
    navigate(url);
  };

  useFetchMovies({
    searchQuery,
    selectedGenre,
    sortSelection,
    setMovies,
  });

  return (
    <div className='app-wrapper'>
      <ModalDialogScrollLock />

      <div className="app">
        <Header>
          {isMovieDetailsRoute ? (
            <Outlet />
          ) : (
            <>
              <button className="add-movie" onClick={() => setShowMovieModal(true)}>
                + Add movie
              </button>
              <h1>Find your movie</h1>
              <SearchBar initialQuery={searchQuery} onSearch={updateSearchQuery} />
            </>
          )}
        </Header>

        <div className="sort-control-wrapper">
          <GenreList
            genres={genres}
            selectedGenre={selectedGenre}
            onSelect={updateSelectedGenre}
          />
          <SortControl currentSelection={sortSelection} onSelectionChange={updateSortSelection} />
        </div>

        <MovieList 
          movies={movies} 
          onSelectMovie={handleSelectMovie}
          onEditMovie={handleOnEditMovie}
        />
      </div>

      {showMovieModal && (
        <ModalDialog
          title={editingMovie ? 'Edit movie' : 'Add movie'}
          onClose={() => {
            setShowMovieModal(false);
            setEditingMovie(null);
          }}
        >
          <MovieForm initialMovie={editingMovie || undefined} onSubmit={handleMovieSubmit} />
        </ModalDialog>
      )}
    </div>
  );
};

export default MovieListPage;
