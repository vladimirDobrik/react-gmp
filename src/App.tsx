import React, { useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import Genres from './components/genres/Genres';
import SearchResult from './components/search-result/SearchResult';
import MovieDetails from './components/movie-details/MovieDetails';
import { MovieInfo } from './shared/models/movie-info';
import SortControl from './components/sort-control/SortControl';
import { SortOption } from './components/sort-control/models/sort-control.models';
import { createPortal } from 'react-dom';
import ModalDialog from './components/modal-dialog/ModalDialog';
import ModalDialogScrollLock from './components/modal-dialog-scroll-lock/ModalDoalogScrollLock';
import Header from './components/header/Header';
import MovieForm from './components/movie-form/MovieForm';

function App(): React.JSX.Element {
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo | null>(null);
  const [sortSelection, setSortSelection] = useState<SortOption>('releaseDate');
  const [showMovieModal, setShowMovieModal] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<MovieInfo | null>(null);

  const handleSelect = (movie: MovieInfo) => {
    setSelectedMovie(movie);
  }

  const handleSortChangeSelect = (sortOption: SortOption) => {
    setSortSelection(sortOption);
  }

  const handleMovieSubmit = (movieData: any) => {
    setShowMovieModal(false);
    setEditingMovie(null);
  }

  const handleOnEditMovie = (movie: MovieInfo) => {
    setEditingMovie(movie);
    setShowMovieModal(true);
  }

  return (
    <div className='app-wrapper'>
      <ModalDialogScrollLock />

      <div className="app">
        <Header>
          {selectedMovie ? 
            (<MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>)
            :
            (<>
              <button className="add-movie" onClick={() => setShowMovieModal(true)}>
              + Add movie
              </button>
              <h1>Find your movie</h1>
              <Search /></>
            )
          }
        </Header>
        
        <div className="sort-control-wrapper">
          <Genres/>
          <SortControl currentSelection={sortSelection} onSelectionChange={handleSortChangeSelect} />
        </div>
        <SearchResult onEditMovie={handleOnEditMovie} onSelectMovie={handleSelect}></SearchResult>
      </div>

      {showMovieModal && createPortal(
        <ModalDialog 
          title={editingMovie ? "Edit movie" : "Add movie"}
          onClose={() => {
            setShowMovieModal(false);
            setEditingMovie(null);
          }}>
          <MovieForm 
            initialMovie={editingMovie || undefined}
            onSubmit={handleMovieSubmit}
          />
        </ModalDialog>,
        document.body
      )}
    </div>
  );
}

export default App;
