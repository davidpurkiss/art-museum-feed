import { fireEvent, render, screen } from '@testing-library/react';
import ArtFeedList from './ArtFeedList';
import { ArtFeedItem } from '../types/ArtFeedItem';

const generateItems = (count: number) => {
  const getItem = (index: number): ArtFeedItem => {
    return {
      title: `title ${index}`,
      technique: `technique ${index}`,
      century: `century ${index}`,
      culture: `culture ${index}`,
      dated: `dated ${index}`,
      people: [
        {
          role: `role ${index}`,
          displaydate: `displaydate ${index}`,
          displayname: `displayname ${index}`,
        },
      ],
      images: [
        {
          baseimageurl: `baseimageurl ${index}`,
        },
      ],
    };
  };

  return Array.from({ length: count }, (_, i) => i + 1).map((index) =>
    getItem(index)
  );
};

describe('ArtFeedList', () => {
  it('shows the loading circle when loading', async () => {
    render(<ArtFeedList isLoading={true} items={[]} />);
    expect(screen.getByTestId('loading')).not.toBeNull();
    expect(screen.queryByTestId('imageList')).toBeNull();
  });
  it('shows the image list when not loading', () => {
    render(<ArtFeedList isLoading={false} items={[]} />);
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(screen.getByTestId('imageList')).not.toBeNull();
  });
  it('shows all image items', () => {
    render(<ArtFeedList isLoading={false} items={generateItems(3)} />);
    const items = screen.getAllByTestId('imageItem');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('title 1');
    expect(items[0]).toHaveTextContent('dated 1');
    expect(items[0]).toHaveTextContent('displayname 1');
    expect(items[0].querySelector('img')).toHaveAttribute(
      'src',
      'baseimageurl 1'
    );

    expect(items[2]).toHaveTextContent('title 3');
    expect(items[2]).toHaveTextContent('dated 3');
    expect(items[2]).toHaveTextContent('displayname 3');
    expect(items[2].querySelector('img')).toHaveAttribute(
      'src',
      'baseimageurl 3'
    );
  });
  it('shows the item details when clicking the info button', async () => {
    render(<ArtFeedList isLoading={false} items={generateItems(3)} />);

    fireEvent.click(screen.getByTestId('infoButton-title 2'));
    expect(screen.getByTestId('feedItemView')).not.toBeNull();
  });
  it('closes the item details when clicking', () => {
    render(<ArtFeedList isLoading={false} items={generateItems(3)} />);

    fireEvent.click(screen.getByTestId('infoButton-title 2'));
    expect(screen.getByTestId('feedItemView')).not.toBeNull();
    fireEvent.click(screen.getByTestId('feedItemView'));
    expect(screen.queryByTestId('feedItemView')).toBeNull();
  });
});
