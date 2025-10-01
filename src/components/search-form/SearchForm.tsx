import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../search-bar/SearchBar';
import { useMoviesSearchParams } from '../../shared/hooks/useMoviesSearchParams';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchQuery, updateSearchQuery } = useMoviesSearchParams();

  const handleAddMovie = () => {
    const currentParams = searchParams.toString();
    const url = `/new${currentParams ? `?${currentParams}` : ''}`;
    navigate(url);
  };

  return (
    <>
      <button className="add-movie" onClick={handleAddMovie}>
        + Add movie
      </button>
      <h1>Find your movie</h1>
      <SearchBar initialQuery={searchQuery} onSearch={updateSearchQuery} />
      <Outlet />
    </>
  );
};

export default SearchForm;
