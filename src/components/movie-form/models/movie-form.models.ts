import { MovieInfo } from '../../../shared/models/movie-info';

export interface MovieFormProps {
  initialMovie?: MovieInfo;
  onSubmit: (movieData: any) => void;
}
