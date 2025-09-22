import React, { useState } from 'react';
import Header from '../header/Header';
import GenreList from '../genre-list/GenreList';
import SortControl from '../sort-control/SortControl';
import MovieList from '../movie-list/MovieList';
import MovieDetails from '../movie-details/MovieDetails';
import ModalDialog from '../modal-dialog/ModalDialog';
import ModalDialogScrollLock from '../modal-dialog-scroll-lock/ModalDoalogScrollLock';
import MovieForm from '../movie-form/MovieForm';
import { MovieInfo } from '../../shared/models/movie-info';
import { SortOption } from '../sort-control/models/sort-control.models';

import './MovieListPage.css';
import SearchBar from '../search-bar/SearchBar';
import { useFetchMovies } from '../../shared/hooks/useFetchMovies';

const MovieListPage: React.FC = () => {
  const genres = ['All', 'Action', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Drama'];

  const [selectedMovie, setSelectedMovie] = useState<MovieInfo | null>(null);
  const [sortSelection, setSortSelection] = useState<SortOption>('title');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [showMovieModal, setShowMovieModal] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<MovieInfo | null>(null);
  const [movies, setMovies] = useState<MovieInfo[]>([]);

  const handleSelect = (movie: MovieInfo) => {
    setSelectedMovie(movie);
  };

  const handleSortChangeSelect = (sortOption: SortOption) => {
    setSortSelection(sortOption);
  };

  const handleMovieSubmit = (movieData: any) => {
    setShowMovieModal(false);
    setEditingMovie(null);
  };

  const handleOnEditMovie = (movie: MovieInfo) => {
    setEditingMovie(movie);
    setShowMovieModal(true);
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
          {selectedMovie ? (
            <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
          ) : (
            <>
              <button className="add-movie" onClick={() => setShowMovieModal(true)}>
                + Add movie
              </button>
              <h1>Find your movie</h1>
              <SearchBar initialQuery={searchQuery} onSearch={setSearchQuery} />
            </>
          )}
        </Header>

        <div className="sort-control-wrapper">
          <GenreList
            genres={genres}
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
          />
          <SortControl currentSelection={sortSelection} onSelectionChange={handleSortChangeSelect} />
        </div>

        <MovieList movies={movies} onEditMovie={handleOnEditMovie} onSelectMovie={handleSelect}></MovieList>
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
