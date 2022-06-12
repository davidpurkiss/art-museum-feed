export interface Config {
  harvardArtMuseum: {
    baseUrl: string;
    apiKey: string;
  };
  enableCsrfPrevention: boolean;
}

const config: Config = {
  harvardArtMuseum: {
    baseUrl: process.env.HARARD_ART_MUSEUM_BASE_URL,
    apiKey: process.env.HARARD_ART_MUSEUM_API_KEY,
  },
  enableCsrfPrevention: true,
};

export default config;
