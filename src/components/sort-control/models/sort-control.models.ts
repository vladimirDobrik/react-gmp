export type SortOption = 'title' | 'releaseDate';

export interface SortControlProps {
  currentSelection: SortOption;
  onSelectionChange: (selection: SortOption) => void;
}
