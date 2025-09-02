import React from "react";
import MovieTile from "../movie-tile/MovieTile";
import { SearchResultProps } from "./models/search-result.models";
import { mockedMovies } from '../../data/movies';

import './SearchResult.css';

const SearchResult: React.FC<SearchResultProps> = ({
  movies = mockedMovies,
  onSelectMovie,
  onEditMovie,
  onDeleteMovie,
}) => {
  return (
    <div className="search-result">
      {movies.map((movie) => (
        <MovieTile
          key={movie.id ?? movie.title}
          movie={movie}
          onClick={(m) => onSelectMovie?.(m)}
          onEdit={(m) => onEditMovie?.(m)}
          onDelete={(m) => onDeleteMovie?.(m)}
        />
      ))}
    </div>
  );
};

export default SearchResult;
