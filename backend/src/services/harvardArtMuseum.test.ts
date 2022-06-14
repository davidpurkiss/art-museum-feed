import fetch from 'node-fetch';
import HarvardArtMuseumService from './harvardArtMuseum';

jest.mock('node-fetch');

const mockNodeFetch = (
  ok: boolean,
  responseBody = undefined,
  response = {}
) => {
  fetch.mockResolvedValueOnce({
    ok,
    ...response,
    json: jest.fn(
      () =>
        responseBody || {
          records: [],
        }
    ),
  });
};

describe('HarvardArtMuseumService', () => {
  const service = new HarvardArtMuseumService('http://test-url.com', '123-abc');

  describe('getObjects', () => {
    it('calls the correct endpoint with query params when options provided', async () => {
      mockNodeFetch(true);
      await service.getObjects({
        page: 2,
        size: 20,
      });
      expect(fetch).toHaveBeenCalledWith(
        'http://test-url.com/object?apikey=123-abc&page=2&size=20'
      );
    });

    it('calls the correct endpoint without extra query params when no options provided', async () => {
      mockNodeFetch(true);
      await service.getObjects();
      expect(fetch).toHaveBeenCalledWith(
        'http://test-url.com/object?apikey=123-abc'
      );
    });

    it('returns the response body', async () => {
      const mockResponse = { records: [{ test: 'test' }] };
      mockNodeFetch(true, mockResponse);
      const response = await service.getObjects();
      expect(fetch).toHaveBeenCalledWith(
        'http://test-url.com/object?apikey=123-abc'
      );
      expect(response).toEqual(mockResponse);
    });

    it('throws an error when a non-ok response is returned', async () => {
      mockNodeFetch(
        false,
        {},
        {
          status: 400,
          statusText: 'Bad Request',
        }
      );

      await expect(service.getObjects()).rejects.toThrow(
        'Harvard Art Museum API responded with: 400 - Bad Request'
      );
    });
  });

  describe('healthCheck', () => {
    it('calls the correct endpoint', async () => {
      mockNodeFetch(true);
      await service.healthCheck();
      expect(fetch).toHaveBeenCalledWith(
        'http://test-url.com/classification?apikey=123-abc&size=1'
      );
    });

    it('throws an error when the request is not 200', async () => {
      mockNodeFetch(false);
      await expect(service.healthCheck()).rejects.toThrow(
        'Harvard Art Museum API is unhealthy.'
      );
    });
  });
});
