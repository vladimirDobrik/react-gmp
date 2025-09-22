import { MovieInfo } from '../../../shared/models/movie-info';

export interface MovieDetailsInfo extends MovieInfo {
  rating: string;
  duration: string;
  description: string;
}

export interface MovieDetailsProps {
  movie: MovieInfo;
  onClose?: () => void;
}
