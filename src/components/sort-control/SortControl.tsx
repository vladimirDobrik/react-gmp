import React from 'react';
import { SortControlProps, SortOption } from './models/sort-control.models';
import './SortControl.css';

const SortControl: React.FC<SortControlProps> = ({ currentSelection, onSelectionChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelection = event.target.value as SortOption;
    onSelectionChange(newSelection);
  };

  return (
    <div className="sort-control" data-testid="sort-control">
      <label className="sort-label" data-testid="sort-label" htmlFor="sort-select">
        Sort By
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={currentSelection}
        onChange={handleChange}
        data-testid="sort-select"
      >
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
