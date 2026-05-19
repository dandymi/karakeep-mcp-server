import { karakeepRequest } from '../utils.ts';

/**
 * Highlights service for Karakeep API
 */
export class HighlightsService {
  /**
   * Get all highlights for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllHighlights(params: { limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/highlights?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Create a new highlight
   * @param highlightData - Highlight data to create
   */
  static async createHighlight(highlightData: any) {
    return await karakeepRequest('POST', '/highlights', highlightData);
  }

  /**
   * Get a single highlight by ID
   * @param id - Highlight ID
   */
  static async getHighlight(id: string) {
    return await karakeepRequest('GET', `/highlights/${id}`);
  }

  /**
   * Update a highlight by ID
   * @param id - Highlight ID
   * @param highlightData - Updated highlight data
   */
  static async updateHighlight(id: string, highlightData: any) {
    return await karakeepRequest('PUT', `/highlights/${id}`, highlightData);
  }

  /**
   * Delete a highlight by ID
   * @param id - Highlight ID
   */
  static async deleteHighlight(id: string) {
    return await karakeepRequest('DELETE', `/highlights/${id}`);
  }

  /**
   * Get bookmarks with a highlight
   * @param id - Highlight ID
   * @param params - Query parameters for filtering and pagination
   */
  static async getHighlightBookmarks(id: string, params: { archived?: boolean; favourited?: boolean; sortOrder?: string; limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived));
    if (params.favourited !== undefined) queryParams.append('favourited', String(params.favourited));
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/highlights/${id}/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }
}
