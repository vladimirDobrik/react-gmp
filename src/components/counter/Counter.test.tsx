import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter', () => {
  describe('Initial value', () => {
    test('renders initial value', () => {
      render(<Counter initialValue={5} />);

      const counterValue = screen.getByTestId('counter-value');

      expect(counterValue).toBeInTheDocument();
    });
  })

  describe('Decrement and Increment', () => {
    test('decrements the displayed value on click', () => {
      render(<Counter initialValue={3} />);

      const decrementButton = screen.getByTestId('decrement-button');
      const counterValue = screen.getByTestId('counter-value');

      fireEvent.click(decrementButton);

      expect(counterValue).toHaveTextContent('2');
    });

    test('increments the displayed value on click', () => {
      render(<Counter initialValue={3} />);

      const incrementButton = screen.getByTestId('increment-button');
      const counterValue = screen.getByTestId('counter-value');

      fireEvent.click(incrementButton);

      expect(counterValue).toHaveTextContent('4');
    });

    test('decrement button does not go below 0', () => {
      render(<Counter initialValue={0} />);

      const decrementButton = screen.getByTestId('decrement-button');
      const counterValue = screen.getByTestId('counter-value');

      fireEvent.click(decrementButton);

      expect(counterValue).toHaveTextContent('0');
    });
  })
});
