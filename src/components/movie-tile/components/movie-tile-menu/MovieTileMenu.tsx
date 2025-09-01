import React, { MouseEvent, useState } from 'react';

import './MovieTileMenu.css';

export interface MovieMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const MovieTileMenu: React.FC<MovieMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onEdit?.();
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onDelete?.();
  };

  return (
    <>
      <button
        data-testid="movie-menu-button"
        className="movie-menu-button"
        onClick={toggleMenu}
      >
        &#8942;
      </button>
      {isOpen && (
        <div className="movie-menu" role="menu" data-testid="movie-menu">
          {onEdit && (
            <button className="movie-menu-item" 
              role="menuitem"
              onClick={handleEdit}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="movie-menu-item"
              role="menuitem" 
              onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default MovieTileMenu;
