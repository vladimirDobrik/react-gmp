import { MovieInfo } from "../../../shared/models/movie-info";

export interface MovieListProps {
    movies?: MovieInfo[];
    onSelectMovie?: (movie: MovieInfo) => void;
    onEditMovie?: (movie: MovieInfo) => void;
    onDeleteMovie?: (movie: MovieInfo) => void;
}
