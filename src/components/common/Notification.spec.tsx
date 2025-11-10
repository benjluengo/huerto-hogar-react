import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notification from './Notification';

describe('Notification Component', () => {
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render success notification with correct message', () => {
    render(
      <Notification
        message="Operación exitosa"
        type="success"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Operación exitosa')).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('should render error notification with correct message', () => {
    render(
      <Notification
        message="Error occurred"
        type="error"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Error occurred')).toBeTruthy();
  });

  it('should render warning notification with correct message', () => {
    render(
      <Notification
        message="Warning message"
        type="warning"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Warning message')).toBeTruthy();
  });

  it('should render info notification with correct message', () => {
    render(
      <Notification
        message="Info message"
        type="info"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Info message')).toBeTruthy();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Notification
        message="Test message"
        type="info"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose after default duration (3000ms)', async () => {
    jest.useFakeTimers();

    render(
      <Notification
        message="Test message"
        type="info"
        onClose={mockOnClose}
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });

  it('should call onClose after custom duration', async () => {
    jest.useFakeTimers();

    render(
      <Notification
        message="Test message"
        type="info"
        onClose={mockOnClose}
        duration={1000}
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });

  it('should have correct CSS classes for different types', () => {
    const { rerender } = render(
      <Notification
        message="Test"
        type="success"
        onClose={mockOnClose}
      />
    );

    let alertElement = screen.getByRole('alert');
    expect(alertElement.classList.contains('alert-success')).toBe(true);

    rerender(
      <Notification
        message="Test"
        type="error"
        onClose={mockOnClose}
      />
    );

    alertElement = screen.getByRole('alert');
    expect(alertElement.classList.contains('alert-danger')).toBe(true);

    rerender(
      <Notification
        message="Test"
        type="warning"
        onClose={mockOnClose}
      />
    );

    alertElement = screen.getByRole('alert');
    expect(alertElement.classList.contains('alert-warning')).toBe(true);

    rerender(
      <Notification
        message="Test"
        type="info"
        onClose={mockOnClose}
      />
    );

    alertElement = screen.getByRole('alert');
    expect(alertElement.classList.contains('alert-info')).toBe(true);
  });

  it('should clear timeout on unmount', () => {
    jest.useFakeTimers();

    const { unmount } = render(
      <Notification
        message="Test"
        type="info"
        onClose={mockOnClose}
        duration={1000}
      />
    );

    unmount();

    jest.advanceTimersByTime(1000);

    // onClose should not be called after unmount
    expect(mockOnClose).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
