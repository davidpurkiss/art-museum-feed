import resolvers from './resolvers';
import HarvardArtMuseumService from './services/harvardArtMuseum';

jest.mock('./services/harvardArtMuseum');

describe('resolvers', () => {
  describe('objects', () => {
    it('calls HarvardArtMuseumService with the correct parameters', () => {
      resolvers.Query.objects(
        {},
        {
          size: 12,
          page: 3,
        }
      );

      const mockHarvardArtMuseumServiceInstance: HarvardArtMuseumService = (
        HarvardArtMuseumService as any
      ).mock.instances[0];
      expect(
        mockHarvardArtMuseumServiceInstance.getObjects
      ).toHaveBeenCalledWith({
        classification: '23',
        hasimage: 1,
        page: 3,
        q: 'verificationlevel:4',
        size: 12,
        sort: 'rank',
        sortorder: 'desc',
      });
    });
  });
});
