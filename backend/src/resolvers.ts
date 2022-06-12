import HarvardArtMuseumService from './services/harvardArtMuseum';
import config from './config';

const harvardArtMuseumService = new HarvardArtMuseumService(
  config.harvardArtMuseum.baseUrl,
  config.harvardArtMuseum.apiKey
);

const BEST_VERIFICATION_LEVEL = 4;
const PRINT_CLASSIFICATION = '23';

const resolvers = {
  Query: {
    objects: (parent, args) =>
      harvardArtMuseumService.getObjects({
        size: args.size,
        page: args.page,
        hasimage: 1,
        classification: PRINT_CLASSIFICATION,
        q: `verificationlevel:${BEST_VERIFICATION_LEVEL}`,
        sort: 'rank',
        sortorder: 'desc',
      }),
  },
};

export default resolvers;
