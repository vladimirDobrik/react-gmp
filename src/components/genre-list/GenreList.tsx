import React from 'react';
import { GenreListProps } from './models/genre-list.models';
import './GenreList.css';

const GenreList: React.FC<GenreListProps> = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="genre-list">
      {genres.map((genre) => (
        <button
          data-testid="genre-button"
          key={genre}
          className={`genre-button ${genre === selectedGenre ? 'selected' : ''}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
