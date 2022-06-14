import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import Home from '../../pages/index';
import { MockedProvider } from '@apollo/client/testing';

import mocks from './fxitures/home';

describe('index page', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
  });
  it('fetches objects from the backend', async () => {
    await waitFor(() => screen.getByTestId('loading'));
    expect(screen.getByTestId('loading')).not.toBeNull();

    await act(async () => {
      // Move to the next "tick" of the event loop so that mocked data is loaded
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => screen.getByTestId('imageList'));
    const items = screen.getAllByTestId('imageItem');
    expect(items).toHaveLength(1);
  });
  it('fetches objects from the backend with correct page when page changed', async () => {
    await waitFor(() => screen.getByTestId('loading'));
    expect(screen.getByTestId('loading')).not.toBeNull();

    await act(async () => {
      // Move to the next "tick" of the event loop so that mocked data is loaded
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => screen.getByTestId('imageList'));
    let items = screen.getAllByTestId('imageItem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Charles Erskine - 1737James McArdell');

    act(() => {
      const navigationButtons = screen.getAllByRole('button', {
        name: 'Go to page 2',
      });
      fireEvent.click(navigationButtons[0]);
    });

    await waitFor(() => screen.getByTestId('loading'));
    expect(screen.getByTestId('loading')).not.toBeNull();

    await act(async () => {
      // Move to the next "tick" of the event loop so that mocked data is loaded
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => screen.getByTestId('imageList'));
    items = screen.getAllByTestId('imageItem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent(
      'The Bible in Pictures - 1858After Julius Schnorr von Carolsfeld'
    );
  });
  it('shows an error message when query fails', async () => {
    await act(async () => {
      // Move to the next "tick" of the event loop so that mocked data is loaded
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => screen.getByTestId('imageList'));

    act(() => {
      const navigationButtons = screen.getAllByRole('button', {
        name: 'Go to page 3',
      });
      fireEvent.click(navigationButtons[0]);
    });

    await act(async () => {
      // Move to the next "tick" of the event loop so that mocked data is loaded
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('error')).toHaveTextContent('An error occurred');
  });
});
