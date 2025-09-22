import React from 'react';
import { MovieDetailsProps } from './models/movie-details.models';
import './MovieDetails.css';

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {

  return (
    <div className="movie-details" data-testid="movie-details">
      {onClose && <button className="movie-details-close" onClick={onClose}>X</button>}
      <div className="movie-poster-section">
        <img 
          className="movie-poster-large" 
          src={movie.imageUrl} 
          alt={movie.title}
          data-testid="movie-poster-large"
        />
      </div>
      <div className="movie-info-section">
        <div className="movie-meta-row">
          <h1 className="movie-title-large" data-testid="movie-title-large">
            {movie.title}
          </h1>
          {movie.rating && (
              <span className="movie-rating" data-testid="movie-rating">
                {movie.rating}
              </span>
          )}
        </div>
        <div className="movie-genres" data-testid="movie-genres">
          {movie.genres.join(', ')}
        </div>
        <div className="movie-meta-row">
          <span className="movie-year-large" data-testid="movie-year-large">
            {movie.year}
          </span>
          {movie.duration && (
            <span className="movie-duration" data-testid="movie-duration">
              {movie.duration}
            </span>
          )}
        </div>
        {movie.description && (
          <p className="movie-description" data-testid="movie-description">
            {movie.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
