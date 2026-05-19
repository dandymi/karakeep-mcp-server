// Mock Karakeep API service for testing
// This simulates the Karakeep API endpoints used in the MCP server

export class KarakeepService {
  // Mock methods that will be overridden in tests
  request: jest.Mock;

  constructor() {
    this.request = jest.fn();
  }

  // Example method - actual methods depend on what's being tested
  async get(endpoint: string, params?: any) {
    return this.request(endpoint, { method: 'GET', params });
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, { method: 'POST', data });
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, { method: 'PUT', data });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Export an instance for use in tests
export const karakeepService = new KarakeepService();
