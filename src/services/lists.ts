import { karakeepRequest } from '../utils.ts';

/**
 * Lists service for Karakeep API
 */
export class ListsService {
  /**
   * Get all lists for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllLists(params: { limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/lists?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Create a new list
   * @param listData - List data to create
   */
  static async createList(listData: any) {
    return await karakeepRequest('POST', '/lists', listData);
  }

  /**
   * Get a single list by ID
   * @param id - List ID
   */
  static async getList(id: string) {
    return await karakeepRequest('GET', `/lists/${id}`);
  }

  /**
   * Update a list by ID
   * @param id - List ID
   * @param listData - Updated list data
   */
  static async updateList(id: string, listData: any) {
    return await karakeepRequest('PUT', `/lists/${id}`, listData);
  }

  /**
   * Delete a list by ID
   * @param id - List ID
   */
  static async deleteList(id: string) {
    return await karakeepRequest('DELETE', `/lists/${id}`);
  }

  /**
   * Get bookmarks in a list
   * @param id - List ID
   * @param params - Query parameters for filtering and pagination
   */
  static async getListBookmarks(id: string, params: { archived?: boolean; favourited?: boolean; sortOrder?: string; limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived));
    if (params.favourited !== undefined) queryParams.append('favourited', String(params.favourited));
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/lists/${id}/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Add bookmarks to a list
   * @param id - List ID
   * @param bookmarkIds - Array of bookmark IDs to add
   */
  static async addBookmarksToList(id: string, bookmarkIds: string[]) {
    return await karakeepRequest('POST', `/lists/${id}/bookmarks`, { bookmarkIds });
  }

  /**
   * Remove bookmarks from a list
   * @param id - List ID
   * @param bookmarkIds - Array of bookmark IDs to remove
   */
  static async removeBookmarksFromList(id: string, bookmarkIds: string[]) {
    return await karakeepRequest('DELETE', `/lists/${id}/bookmarks`, { bookmarkIds });
  }
}
