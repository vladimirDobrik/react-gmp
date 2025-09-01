import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieTileMenu from './MovieTileMenu';

describe('MovieTileMenu', () => {
  test('toggles menu open/close state', () => {
    render(<MovieTileMenu />);

    expect(screen.queryByTestId('movie-menu')).not.toBeInTheDocument();

    const menuButton = screen.getByTestId('movie-menu-button');
    fireEvent.click(menuButton);

    expect(screen.getByTestId('movie-menu')).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.queryByTestId('movie-menu')).not.toBeInTheDocument();
  });

  test('calls onEdit and closes the menu', () => {
    const onEdit = jest.fn();
    render(<MovieTileMenu onEdit={onEdit} />);

    fireEvent.click(screen.getByTestId('movie-menu-button'));
    const editButton = screen.getByRole('menuitem', { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('movie-menu')).not.toBeInTheDocument();
  });

  test('calls onDelete and closes the menu', () => {
    const onDelete = jest.fn();
    render(<MovieTileMenu onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId('movie-menu-button'));
    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('movie-menu')).not.toBeInTheDocument();
  });
});
