export interface MovieInfo {
    id?: string | number;
    tagline?: string;
    imageUrl: string;
    title: string;
    year: number | string;
    genres: string[];
    rating?: string;
    duration?: string;
    description?: string;
}
