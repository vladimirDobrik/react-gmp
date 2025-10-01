import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalDialog from '../modal-dialog/ModalDialog';
import MovieForm from '../movie-form/MovieForm';
import { MovieInfo } from '../../shared/models/movie-info';
import { mapMovieInfoToMovieDto, mapMovieDtoToMovieInfo, MovieDto } from '../../shared/mappers/movie.mapper';

const EditMovieForm: React.FC = () => {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieInfo | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        
        if (response.ok) {
          const movieDto: MovieDto = await response.json();
          const mappedMovie = mapMovieDtoToMovieInfo(movieDto);
          setMovie(mappedMovie);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = async (movieData: MovieInfo) => {
    if (!movieId) return;

    try {
      const movieDto: MovieDto = mapMovieInfoToMovieDto(movieData);
      
      const response = await fetch('http://localhost:4000/movies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieDto),
      });

      if (response.ok) {
        const updatedMovie = await response.json();
        navigate(`/movies/${updatedMovie.id}`);
      }
    } catch (error) {
      console.error('Update:', error);
    }
  };

  return (movie &&
    <ModalDialog title="Edit movie" onClose={handleClose}>
      <MovieForm initialMovie={movie} onSubmit={handleSubmit} />
    </ModalDialog>
  );
};

export default EditMovieForm;
