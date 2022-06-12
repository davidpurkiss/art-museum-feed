import nock from 'nock';
import request from 'supertest';
import server from '../server';
import mockObjects from './fixtures/harvardArtMuseum/objects.json';
import config from '../config';

jest.mock('../config', () => ({
  harvardArtMuseum: {
    baseUrl: 'https://api.test.com',
    apiKey: 'test-api-key',
  },
  enableCsrfPrevention: false,
}));

nock(config.harvardArtMuseum.baseUrl)
  .get('/object')
  .query(true)
  .reply(200, mockObjects);

nock(config.harvardArtMuseum.baseUrl)
  .get('/classification')
  .query(true)
  .reply(200);

nock(config.harvardArtMuseum.baseUrl)
  .get('/classification')
  .query(true)
  .reply(504);

describe('service', () => {
  let url;

  beforeAll(async () => {
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing
    const serverInfo = await server.listen({ port: 0 });
    url = serverInfo.url;
  });

  afterAll(async () => {
    await server?.stop();
  });

  describe('objects', () => {
    it('fetches objects from the harvard art museum api', async () => {
      const res = await server.executeOperation({
        query: `query getBooks($page: Int, $size: Int) { objects(page: $page, size: $size) { title } }`,
        variables: { page: 1, size: 10 },
      });
      expect(res).toMatchSnapshot();
    });
  });

  describe('health check', () => {
    it('returns 200 when healthy', async () => {
      // send our request to the url of the test server
      const response = await request(url).get('health');
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
    });

    it('returns 503 when not healthy', async () => {
      // send our request to the url of the test server
      const response = await request(url).get('health');
      expect(response.ok).toBe(false);
      expect(response.status).toBe(503);
    });
  });
});
