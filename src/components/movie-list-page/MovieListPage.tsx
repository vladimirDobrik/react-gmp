import React, { useState } from 'react';
import Header from '../header/Header';
import GenreList from '../genre-list/GenreList';
import SortControl from '../sort-control/SortControl';
import MovieList from '../movie-list/MovieList';
import ModalDialogScrollLock from '../modal-dialog-scroll-lock/ModalDoalogScrollLock';
import { MovieInfo } from '../../shared/models/movie-info';
import './MovieListPage.css';
import { useFetchMovies } from '../../shared/hooks/useFetchMovies';
import { useMoviesSearchParams } from '../../shared/hooks/useMoviesSearchParams';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

const MovieListPage: React.FC = () => {
  const genres = ['All', 'Action', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Drama'];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    searchQuery,
    sortSelection,
    selectedGenre,
    updateSortSelection,
    updateSelectedGenre,
  } = useMoviesSearchParams();

  const [movies, setMovies] = useState<MovieInfo[]>([]);

  const handleOnEditMovie = (movie: MovieInfo) => {
    const currentParams = searchParams.toString();
    const url = `/movies/${movie.id}/edit${currentParams ? `?${currentParams}` : ''}`;
    navigate(url);
  };

  const handleSelectMovie = (movie: MovieInfo) => {
    const currentParams = searchParams.toString();
    const url = `/movies/${movie.id}${currentParams ? `?${currentParams}` : ''}`;
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <Outlet />
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
    </div>
  );
};

export default MovieListPage;
