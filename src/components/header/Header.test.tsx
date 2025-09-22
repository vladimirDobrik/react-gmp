import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders children when provided', () => {
    render(
      <Header>
        <div data-testid="test-child">Test Child</div>
      </Header>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('does not render children container when no children provided', () => {
    render(<Header />);
    expect(screen.queryByText('Test Child')).not.toBeInTheDocument();
  });
});
