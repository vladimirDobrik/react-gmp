import { MovieInfo } from '../models/movie-info';

export interface MovieDto {
  title: string;
  id?: number | string;
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

function parseRuntime(duration?: string): number {
  if (!duration) {
    return 0;
  }

  const hourMatch = duration.match(/(\d+)h/);
  const minuteMatch = duration.match(/(\d+)m/);
  
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;
  
  return hours * 60 + minutes;
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

function formatReleaseDate(year: number | string): string {
  if (!year) {
    return '';
  }
  
  const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;
  return `${yearNum}-01-01`;
}

export function mapMovieInfoToMovieDto(movieInfo: MovieInfo, includeId: boolean = true): MovieDto {
  const dto: MovieDto = {
    title: movieInfo.title,
    tagline: movieInfo.tagline,
    vote_average: movieInfo.rating ? parseFloat(movieInfo.rating) : 0,
    vote_count: 0,
    release_date: formatReleaseDate(movieInfo.year),
    poster_path: movieInfo.imageUrl,
    overview: movieInfo.description || '',
    budget: 0,
    revenue: 0,
    genres: movieInfo.genres || [],
    runtime: parseRuntime(movieInfo.duration),
  };

  if (includeId && movieInfo.id) {
    dto.id = movieInfo.id;
  }

  return dto;
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
