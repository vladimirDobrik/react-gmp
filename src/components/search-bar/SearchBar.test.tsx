import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  describe('Initial value', () => {
    test('renders an input with initial value', () => {
      render(<SearchBar initialQuery="xxx" onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByTestId('search-input');

      expect(searchInput).toHaveValue('xxx');
    });
  
    test('renders empty input when no initial value is provided', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByTestId('search-input');

      expect(searchInput).toHaveValue('');
    });

    test('input has correct placeholder text', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByPlaceholderText('What do you want to watch?');
  
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveClass('search-input');
    });
  })

  describe('On search', () => {
    test('should call onSearch with the value from the input on search button click', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');
      
      fireEvent.change(searchInput, { target: { value: 'xxx' } });
      fireEvent.click(searchButton);
      
      expect(mockOnSearch).toHaveBeenCalledWith('xxx');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
  
    test('should call onSearch with the value from the input on keydown Enter', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByTestId('search-input');
      
      fireEvent.change(searchInput, { target: { value: 'xxx' } });
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
      
      expect(mockOnSearch).toHaveBeenCalledWith('xxx');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
  })
});
