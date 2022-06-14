export interface Config {
  backendBaseUrl: string;
}

const config: Config = {
  backendBaseUrl:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000/',
};
export default config;
