export interface SearchBarProps {
    initialQuery?: string;
    onSearch: (value: string) => void;
}
  
export interface SearchBarState {
    query: string;
}
