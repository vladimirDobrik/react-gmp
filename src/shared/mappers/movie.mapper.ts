import { MovieInfo } from '../models/movie-info';

export interface MovieDto {
  id: number | string;
  title: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  budget?: number;
  revenue?: number;
  genres?: string[];
  runtime?: number;
}

function extractYear(releaseDate?: string): number | string {
  if (!releaseDate) {
    return ''
  };

  const year = Number(String(releaseDate).slice(0, 4));

  return Number.isFinite(year) ? year : '';
}

function formatRuntime(runtime?: number): string {
  if (!runtime || runtime <= 0) {
    return '';
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours <= 0) {
    return `${minutes}m`
  };
  if (minutes <= 0) {
    return `${hours}h`
  };

  return `${hours}h ${minutes}m`;
}

export function mapMovieDtoToMovieInfo(dto: MovieDto): MovieInfo {
  return {
    id: dto.id,
    imageUrl: dto.poster_path ?? '',
    title: dto.title,
    year: extractYear(dto.release_date),
    genres: dto.genres ?? [],
    rating: dto.vote_average != null ? String(dto.vote_average) : '',
    duration: formatRuntime(dto.runtime),
    description: dto.overview ?? '',
  };
}

export function mapApiResponseToMovieInfoArray(payload: unknown): MovieInfo[] {
  const list = Array.isArray(payload) ? payload : (payload as any)?.data ?? [];
  return Array.isArray(list) ? list.map((item) => mapMovieDtoToMovieInfo(item as MovieDto)) : [];
}
