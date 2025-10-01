import React, { useEffect } from "react";
import { mapApiResponseToMovieInfoArray } from "../mappers/movie.mapper";
import { MovieInfo } from "../models/movie-info";

interface UseFetchMoviesProps {
    searchQuery: string;
    selectedGenre: string;
    sortSelection: string
    setMovies: React.Dispatch<React.SetStateAction<MovieInfo[]>>;
}

export function useFetchMovies({
  searchQuery,
  selectedGenre,
  sortSelection,
  setMovies,
}: UseFetchMoviesProps) {
  useEffect(() => {
    const controller = new AbortController();

    const buildQuery = () => {
      const params = new URLSearchParams();

      if (searchQuery?.trim()) {
        params.set("search", searchQuery.trim());
      };

      if (sortSelection) {
        params.set("sortBy", sortSelection);
      }

      if (selectedGenre && selectedGenre !== "All") {
        params.set("filter", selectedGenre);
      }

      params.set("limit", "12");
      params.set("searchBy", "title");

      return params.toString();
    };

    const fetchMovies = async () => {
      try {
        const query = buildQuery();
        const url = `http://localhost:4000/movies${query ? `?${query}` : ""}`;

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
            throw new Error(`${res.status}`);
        }

        const data = await res.json();
        const movies: MovieInfo[] = mapApiResponseToMovieInfoArray(data);

        setMovies(movies);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [searchQuery, selectedGenre, sortSelection, setMovies]);
}
