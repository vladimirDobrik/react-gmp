import React, { FormEvent } from 'react';
import { MovieFormProps } from './models/movie-form.models';
import './MovieForm.css';

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const movieData = Object.fromEntries(formData);

    const selectedGenres = formData.getAll('genres') as string[];
    const genres = selectedGenres.length > 0
      ? selectedGenres.map((genre) => String(genre)).filter((genre) => genre)
      : [];

    const year = movieData.year ? Number(movieData.year) : new Date().getFullYear();
    
    const processedMovieData = {
      ...movieData,
      genres,
      year,
    };
    
    onSubmit(processedMovieData);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialMovie?.title || ''}
            placeholder="Enter movie title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Release date</label>
          <input
            type="number"
            id="year"
            name="year"
            min="1960"
            max="9999"
            maxLength={4}
            defaultValue={initialMovie?.year || new Date().getFullYear()}
            placeholder="Enter release year"
          />
        </div>
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="imageUrl">Movie URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            defaultValue={initialMovie?.imageUrl || ''}
            placeholder="Enter movie poster URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            defaultValue={initialMovie?.rating || ''}
            placeholder="Enter rating"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="genres">Genre</label>
          <select 
            id="genres"
            name="genres"
            multiple 
            size={5}
            defaultValue={initialMovie?.genres || []}
            >
              <option value="All">All</option>
              <option value="Documentary">Documentary</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Crime">Crime</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Runtime</label>
          <input
            type="text"
            id="duration"
            name="duration"
            defaultValue={initialMovie?.duration || ''}
            placeholder="Enter runtime"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="description">Overview</label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialMovie?.description || ''}
            rows={4}
            placeholder="Enter movie overview"
          />
        </div>
      </div>
      <div className="form-group-row"></div>

      <div className="form-actions">
        <button type="reset" className="reset-button">  
          Reset
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
