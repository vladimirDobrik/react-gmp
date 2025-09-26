import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../movie-details/MovieDetails';
import { MovieInfo } from '../../shared/models/movie-info';
import { mapMovieDtoToMovieInfo } from '../../shared/mappers/movie.mapper';

const MovieDetailsWrapper: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieInfo | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        
        if (response.ok) {
          const data = await response.json();
          const mappedMovie = mapMovieDtoToMovieInfo(data);
          setMovie(mappedMovie);
        }
      } catch (err) {
        console.error('Error fetchMovie:', err);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleClose = () => {
    navigate('/movies');
  };

  if (!movie) {
    return null;
  }

  return <MovieDetails movie={movie} onClose={handleClose} />;
};

export default MovieDetailsWrapper;
