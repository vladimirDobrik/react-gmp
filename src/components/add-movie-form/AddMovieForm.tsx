import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDialog from '../modal-dialog/ModalDialog';
import MovieForm from '../movie-form/MovieForm';
import { MovieInfo } from '../../shared/models/movie-info';
import { mapMovieInfoToMovieDto, MovieDto } from '../../shared/mappers/movie.mapper';

const AddMovieForm: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (movieData: MovieInfo) => {
    try {

      const movieDto: MovieDto = mapMovieInfoToMovieDto(movieData, false);
      
      const response = await fetch('http://localhost:4000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieDto),
      });

      if (response.ok) {
        const newMovie = await response.json();
        navigate(`/movies/${newMovie.id}`);
      }
    } catch (error) {
      console.error('Add:', error);
    }
  };

  return (
    <ModalDialog title="Add movie" onClose={handleClose}>
      <MovieForm onSubmit={handleSubmit} />
    </ModalDialog>
  );
};

export default AddMovieForm;
