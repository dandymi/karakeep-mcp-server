import { karakeepRequest } from '../utils.ts';

/**
 * Tags service for Karakeep API
 */
export class TagsService {
  /**
   * Get all tags for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllTags(params: { limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/tags?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Create a new tag
   * @param tagData - Tag data to create
   */
  static async createTag(tagData: any) {
    return await karakeepRequest('POST', '/tags', tagData);
  }

  /**
   * Get a single tag by ID
   * @param id - Tag ID
   */
  static async getTag(id: string) {
    return await karakeepRequest('GET', `/tags/${id}`);
  }

  /**
   * Update a tag by ID
   * @param id - Tag ID
   * @param tagData - Updated tag data
   */
  static async updateTag(id: string, tagData: { label?: string }) {
    return await karakeepRequest('PUT', `/tags/${id}`, tagData);
  }

  /**
   * Delete a tag by ID
   * @param id - Tag ID
   */
  static async deleteTag(id: string) {
    return await karakeepRequest('DELETE', `/tags/${id}`);
  }

  /**
   * Get bookmarks with a tag
   * @param id - Tag ID
   * @param params - Query parameters for filtering and pagination
   */
  static async getTagBookmarks(id: string, params: { archived?: boolean; favourited?: boolean; sortOrder?: string; limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived));
    if (params.favourited !== undefined) queryParams.append('favourited', String(params.favourited));
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/tags/${id}/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }
}
