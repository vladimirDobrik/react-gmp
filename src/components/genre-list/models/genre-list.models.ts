export interface GenreListProps {
    genres: string[];
    selectedGenre?: string | null;
    onSelect: (genre: string) => void;
}
