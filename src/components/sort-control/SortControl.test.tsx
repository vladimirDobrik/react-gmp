import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from './SortControl';

describe('SortControl', () => {
  const mockOnSelectionChange = jest.fn();

  beforeEach(() => {
    mockOnSelectionChange.mockClear();
  });

  describe('rendering', () => {
    test('should render select', () => {
      render(<SortControl currentSelection="releaseDate" onSelectionChange={mockOnSelectionChange} />);
      
      const select = screen.getByTestId('sort-select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveAttribute('id', 'sort-select');
    });

    test('should render all sort options', () => {
      render(<SortControl currentSelection="releaseDate" onSelectionChange={mockOnSelectionChange} />);
      
      const options = screen.getAllByRole('option');
      
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveValue('releaseDate');
      expect(options[0]).toHaveTextContent('Release Date');
      expect(options[1]).toHaveValue('title');
      expect(options[1]).toHaveTextContent('Title');
    });
  });

  describe('selection', () => {
    test('should display current selection for releaseDate', () => {
      render(<SortControl currentSelection="releaseDate" onSelectionChange={mockOnSelectionChange} />);
      
      const select = screen.getByTestId('sort-select');
      expect(select).toHaveValue('releaseDate');
    });

    test('should display current selection for title', () => {
      render(<SortControl currentSelection="title" onSelectionChange={mockOnSelectionChange} />);
      
      const select = screen.getByTestId('sort-select');
      expect(select).toHaveValue('title');
    });
  });

  describe('interaction', () => {
    test('should call onSelectionChange when selection changes to title', () => {
      render(<SortControl currentSelection="releaseDate" onSelectionChange={mockOnSelectionChange} />);
      
      const select = screen.getByTestId('sort-select');
      fireEvent.change(select, { target: { value: 'title' } });
      
      expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
      expect(mockOnSelectionChange).toHaveBeenCalledWith('title');
    });

    test('should call onSelectionChange when selection changes to releaseDate', () => {
      render(<SortControl currentSelection="title" onSelectionChange={mockOnSelectionChange} />);
      
      const select = screen.getByTestId('sort-select');
      fireEvent.change(select, { target: { value: 'releaseDate' } });
      
      expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
      expect(mockOnSelectionChange).toHaveBeenCalledWith('releaseDate');
    });
  });
});
