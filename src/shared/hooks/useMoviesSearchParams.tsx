import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SortOption } from "../../components/sort-control/models/sort-control.models";

enum SearchParams {
  QUERY = 'query',
  SORT_BY = 'sortBy',
  GENRE = 'genre',
}

interface UseMoviesSearchParamsProps {
  searchQuery: string;
  sortSelection: SortOption;
  selectedGenre: string;
  updateSearchQuery: (query: string) => void;
  updateSortSelection: (sort: SortOption) => void;
  updateSelectedGenre: (genre: string) => void;
}

export function useMoviesSearchParams(): UseMoviesSearchParamsProps {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get(SearchParams.QUERY) || '';
  const sortSelection = (searchParams.get(SearchParams.SORT_BY) as SortOption) || 'title';
  const selectedGenre = searchParams.get(SearchParams.GENRE) || 'All';

  const updateSearchQuery = useCallback((query: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (query) {
        newParams.set(SearchParams.QUERY, query);
      } else {
        newParams.delete(SearchParams.QUERY);
      }

      return newParams;
    });
  }, [setSearchParams]);

  const updateSortSelection = useCallback((sort: SortOption) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.set(SearchParams.SORT_BY, sort);

      return newParams;
    });
  }, [setSearchParams]);

  const updateSelectedGenre = useCallback((genre: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (genre && genre !== 'All') {
        newParams.set(SearchParams.GENRE, genre);
      } else {
        newParams.delete(SearchParams.GENRE);
      }

      return newParams;
    });
  }, [setSearchParams]);

  return {
    searchQuery,
    sortSelection,
    selectedGenre,
    updateSearchQuery,
    updateSortSelection,
    updateSelectedGenre,
  };
}
