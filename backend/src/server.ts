import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import HarvardArtMuseumService from './services/harvardArtMuseum';
import config from './config';

const harvardArtMuseumService = new HarvardArtMuseumService(
  config.harvardArtMuseum.baseUrl,
  config.harvardArtMuseum.apiKey
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: config.enableCsrfPrevention,
  healthCheckPath: '/health',
  async onHealthCheck() {
    await harvardArtMuseumService.healthCheck();
  },
});

export default server;
