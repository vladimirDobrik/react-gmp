import React from 'react';
import { useForm } from 'react-hook-form';
import { MovieFormProps } from './models/movie-form.models';
import './MovieForm.css';

interface FormData {
  id: string | number;
  title: string;
  year: number;
  imageUrl: string;
  rating: number;
  genres: string[];
  duration: string;
  description: string;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      id: initialMovie?.id || '',
      title: initialMovie?.title || '',
      year: typeof initialMovie?.year === 'number' ? initialMovie.year : new Date().getFullYear(),
      imageUrl: initialMovie?.imageUrl || '',
      rating: initialMovie?.rating ? parseFloat(initialMovie.rating) : 0,
      genres: initialMovie?.genres || [],
      duration: initialMovie?.duration || '',
      description: initialMovie?.description || '',
    },
  });

  const onFormSubmit = (data: FormData) => {
    const movieData = {
      ...data,
      genres: data.genres.filter(genre => genre && genre !== 'All'),
    };
    onSubmit(movieData);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter movie title"
            {...register('title', { 
              required: 'Title is required',
              minLength: { value: 1, message: 'Title must be at least 1 character' }
            })}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="year">Release date</label>
          <input
            type="number"
            id="year"
            min="1960"
            max="9999"
            placeholder="Enter release year"
            {...register('year', { 
              required: 'Release year is required',
              min: { value: 1960, message: 'Year must be 1960 or later' },
              max: { value: 9999, message: 'Year must be 9999 or earlier' }
            })}
          />
          {errors.year && <span className="error-message">{errors.year.message}</span>}
        </div>
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="imageUrl">Movie URL</label>
          <input
            type="url"
            id="imageUrl"
            placeholder="Enter movie poster URL"
            {...register('imageUrl', { 
              required: 'Movie URL is required',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL'
              }
            })}
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            min="0"
            max="10"
            step="0.1"
            placeholder="Enter rating"
            {...register('rating', { 
              required: 'Rating is required',
              min: { value: 0, message: 'Rating must be 0 or higher' },
              max: { value: 10, message: 'Rating must be 10 or lower' }
            })}
          />
          {errors.rating && <span className="error-message">{errors.rating.message}</span>}
        </div>
      </div>
      
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="genres">Genre</label>
          <select 
            id="genres"
            multiple 
            size={5}
            {...register('genres', { 
              required: 'At least one genre is required',
              validate: (value) => value.length > 0 || 'Please select at least one genre'
            })}
          >
            <option value="Documentary">Documentary</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Action">Action</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
          </select>
          {errors.genres && <span className="error-message">{errors.genres.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Runtime</label>
          <input
            type="text"
            id="duration"
            placeholder="Enter runtime (e.g., 2h 30m)"
            {...register('duration', { 
              required: 'Runtime is required',
              pattern: {
                value: /^\d+h?\s*\d*m?$|^\d+m$/,
                message: 'Please enter runtime in format like "2h 30m" or "90m"'
              }
            })}
          />
          {errors.duration && <span className="error-message">{errors.duration.message}</span>}
        </div>
      </div>
      
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="description">Overview</label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter movie overview"
            {...register('description', { 
              required: 'Overview is required',
              minLength: { value: 10, message: 'Overview must be at least 10 characters' }
            })}
          />
          {errors.description && <span className="error-message">{errors.description.message}</span>}
        </div>
      </div>
      
      <div className="form-group-row"></div>

      <div className="form-actions">
        <button type="button" className="reset-button" onClick={handleReset}>  
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
