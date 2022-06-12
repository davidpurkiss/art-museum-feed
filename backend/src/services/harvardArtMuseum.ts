import fetch from 'node-fetch';
import { getQueryParamsString } from '../utils/httpUtils';

export interface ObjectQueryOptions {
  size?: number;
  page?: number;
  sort?: string;
  sortorder?: 'asc' | 'desc';
  classification?: string;
  hasimage?: 0 | 1;
  q?: string;
}

export default class HarvardArtMuseumService {
  private readonly baseUrl: string;

  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getObjects(options: ObjectQueryOptions = {}) {
    const queryParams = getQueryParamsString(options);
    const response = await fetch(
      `${this.baseUrl}/object?apikey=${this.apiKey}${
        queryParams ? `&${queryParams}` : ''
      }`
    );

    if (response.ok) {
      const json = await response.json();
      return json.records;
    }

    throw new Error(
      `Harvard Art Museum API responded with: ${response.status} - ${response.statusText}`
    );
  }

  async healthCheck() {
    const response = await fetch(
      `${this.baseUrl}/classification?apikey=${this.apiKey}&size=1`
    );

    if (!response.ok) {
      throw new Error('Harvard Art Museum API is unhealthy.');
    }
  }
}
