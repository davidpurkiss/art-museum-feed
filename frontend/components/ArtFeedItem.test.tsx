import React from 'react';
import ArtFeedItemComponent from './ArtFeedItem';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ArtFeedItem } from '../types/ArtFeedItem';

const mockFeedItem: ArtFeedItem = {
  title: 'title',
  technique: 'technique',
  century: 'century',
  culture: 'culture',
  dated: 'dated',
  people: [
    {
      role: 'role',
      displaydate: 'displaydate',
      displayname: 'displayname',
    },
  ],
  images: [
    {
      baseimageurl: 'baseimageurl',
    },
  ],
};

describe('ArtFeedItem', () => {
  const handleCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ArtFeedItemComponent item={mockFeedItem} handleClose={handleCloseMock} />
    );
  });

  it('displays all the relevant info', async () => {
    await waitFor(() => screen.getByTestId('feedItem-title'));
    expect(screen.getByTestId('feedItem-title')).toHaveTextContent(
      mockFeedItem.title
    );
    expect(screen.getByTestId('feedItem-century')).toHaveTextContent(
      mockFeedItem.century
    );
    expect(screen.getByTestId('feedItem-date')).toHaveTextContent(
      mockFeedItem.dated
    );
    expect(screen.getByTestId('feedItem-culture')).toHaveTextContent(
      mockFeedItem.culture
    );
    expect(screen.getByTestId('feedItem-image')).toHaveAttribute(
      'src',
      mockFeedItem.images[0].baseimageurl
    );
  });

  it('calls handleClose when onClick', async () => {
    await waitFor(() => screen.getByTestId('feedItem-title'));
    fireEvent.click(screen.getByText(mockFeedItem.title));
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
