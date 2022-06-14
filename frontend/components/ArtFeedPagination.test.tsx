import { fireEvent, render, screen } from '@testing-library/react';
import ArtFeedPagination from './ArtFeedPagination';

describe('ArtFeedPagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ArtFeedPagination
        page={3}
        totalPages={15}
        onPageChange={mockOnPageChange}
      />
    );
  });
  it('should show the total pages from props', () => {
    const navigationButtons = screen.getAllByRole('button');
    expect(navigationButtons).toHaveLength(8);
    expect(navigationButtons[navigationButtons.length - 2]).toHaveTextContent(
      '15'
    );
  });
  it('should set the current page from props', () => {
    const navigationButtons = screen.getAllByRole('button');
    expect(navigationButtons).toHaveLength(8);
    expect(navigationButtons[3]).toHaveAttribute('aria-current', 'true');
  });
  it('call onPageChange when the page is changed', () => {
    const navigationButtons = screen.getAllByRole('button');
    fireEvent.click(navigationButtons[2]);
    expect(mockOnPageChange).toHaveBeenNthCalledWith(1, 2);
    fireEvent.click(navigationButtons[5]);
    expect(mockOnPageChange).toHaveBeenNthCalledWith(2, 5);
    fireEvent.click(navigationButtons[navigationButtons.length - 2]);
    expect(mockOnPageChange).toHaveBeenNthCalledWith(3, 15);
  });
});
