import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalDialog from './ModalDialog';

describe('ModalDialog', () => {
  it('renders title', () => {
    const onClose = jest.fn();
    render(
      <ModalDialog title="Title" onClose={onClose}>
        <div>Test</div>
      </ModalDialog>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('does not render title element when title is not provided', () => {
    const onClose = jest.fn();
    render(
      <ModalDialog onClose={onClose}>
        <div>Test</div>
      </ModalDialog>
    );

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <ModalDialog title="Closable" onClose={onClose}>
        <div>Test</div>
      </ModalDialog>
    );

    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
