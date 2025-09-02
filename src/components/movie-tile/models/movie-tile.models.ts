import { MovieInfo } from "../../../shared/models/movie-info";

export interface MovieTileProps {
    movie: MovieInfo;
    onClick: (movie: MovieInfo) => void;
    onEdit?: (movie: MovieInfo) => void;
    onDelete?: (movie: MovieInfo) => void;
}
