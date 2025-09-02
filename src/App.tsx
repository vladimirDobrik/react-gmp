import React, { useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import Genres from './components/genres/Genres';
import SearchResult from './components/search-result/SearchResult';
import MovieDetails from './components/movie-details/MovieDetails';
import { MovieInfo } from './shared/models/movie-info';
import SortControl from './components/sort-control/SortControl';
import { SortOption } from './components/sort-control/models/sort-control.models';

function App(): React.JSX.Element {
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo | null>(null);
  const [sortSelection, setSortSelection] = useState<SortOption>('releaseDate');

  const handleSelect = (movie: MovieInfo) => {
    setSelectedMovie(movie);
  }

  const handleSortChangeSelect = (sortOption: SortOption) => {
    setSortSelection(sortOption);
  }

  return (
    <div className='app-wrapper'>
      <div className="app">
        <Search />
        {selectedMovie && <MovieDetails movie={selectedMovie}/>}
        
        <div className="sort-control-wrapper">
          <Genres/>
          <SortControl currentSelection={sortSelection} onSelectionChange={handleSortChangeSelect} />
        </div>
        <SearchResult onSelectMovie={handleSelect}></SearchResult>
      </div>
    </div>
  );
}

export default App;
