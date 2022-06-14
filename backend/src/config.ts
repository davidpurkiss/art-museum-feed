import 'dotenv/config';

export interface Config {
  harvardArtMuseum: {
    baseUrl: string;
    apiKey: string;
  };
  enableCsrfPrevention: boolean;
}

const config: Config = {
  harvardArtMuseum: {
    baseUrl:
      process.env.HARVARD_ART_MUSEUM_BASE_URL ||
      'https://api.harvardartmuseums.org',
    apiKey: process.env.HARVARD_ART_MUSEUM_API_KEY,
  },
  enableCsrfPrevention: true,
};

export default config;
