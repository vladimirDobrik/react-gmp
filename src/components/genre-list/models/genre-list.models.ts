export interface GenreListProps {
    genres: string[];
    selectedGenre: string;
    onSelect: (genre: string) => void;
}
