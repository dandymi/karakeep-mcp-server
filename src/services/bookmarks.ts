import { karakeepRequest } from '../utils.ts';

/**
 * Bookmarks service for Karakeep API
 */
export class BookmarksService {
  /**
   * Get all bookmarks for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllBookmarks(params: { archived?: boolean; favourited?: boolean; sortOrder?: string; limit?: number; cursor?: string; includeContent?: boolean } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived));
    if (params.favourited !== undefined) queryParams.append('favourited', String(params.favourited));
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    if (params.includeContent !== undefined) queryParams.append('includeContent', String(params.includeContent));
    
    const endpoint = `/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Create a new bookmark
   * @param bookmarkData - Bookmark data to create
   */
  static async createBookmark(bookmarkData: any) {
    return await karakeepRequest('POST', '/bookmarks', bookmarkData);
  }

  /**
   * Search bookmarks
   * @param query - Search query
   * @param params - Additional query parameters
   */
  static async searchBookmarks(query: string, params: { archived?: boolean; favourited?: boolean; sortOrder?: string; limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived));
    if (params.favourited !== undefined) queryParams.append('favourited', String(params.favourited));
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/bookmarks/search?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Check if a URL exists in bookmarks
   * @param url - URL to check
   */
  static async urlExists(url: string) {
    const queryParams = new URLSearchParams();
    queryParams.append('url', url);
    const endpoint = `/bookmarks/exists?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Get a single bookmark by ID
   * @param id - Bookmark ID
   */
  static async getBookmark(id: string) {
    return await karakeepRequest('GET', `/bookmarks/${id}`);
  }

  /**
   * Delete a bookmark by ID
   * @param id - Bookmark ID
   */
  static async deleteBookmark(id: string) {
    return await karakeepRequest('DELETE', `/bookmarks/${id}`);
  }

  /**
   * Update a bookmark by ID
   * @param id - Bookmark ID
   * @param bookmarkData - Updated bookmark data
   */
  static async updateBookmark(id: string, bookmarkData: any) {
    return await karakeepRequest('PUT', `/bookmarks/${id}`, bookmarkData);
  }

  /**
   * Summarize a bookmark by ID
   * @param id - Bookmark ID
   */
  static async summarizeBookmark(id: string) {
    return await karakeepRequest('GET', `/bookmarks/${id}/summarize`);
  }

  /**
   * Attach tags to a bookmark
   * @param id - Bookmark ID
   * @param tagIds - Array of tag IDs to attach
   */
  static async attachTags(id: string, tagIds: string[]) {
    return await karakeepRequest('POST', `/bookmarks/${id}/tags`, { tagIds });
  }

  /**
   * Detach tags from a bookmark
   * @param id - Bookmark ID
   * @param tagIds - Array of tag IDs to detach
   */
  static async detachTags(id: string, tagIds: string[]) {
    return await karakeepRequest('DELETE', `/bookmarks/${id}/tags`, { tagIds });
  }

  /**
   * Get lists of a bookmark
   * @param id - Bookmark ID
   */
  static async getBookmarkLists(id: string) {
    return await karakeepRequest('GET', `/bookmarks/${id}/lists`);
  }

  /**
   * Get highlights of a bookmark
   * @param id - Bookmark ID
   */
  static async getBookmarkHighlights(id: string) {
    return await karakeepRequest('GET', `/bookmarks/${id}/highlights`);
  }

  /**
   * Attach asset to a bookmark
   * @param id - Bookmark ID
   * @param assetData - Asset data to attach
   */
  static async attachAsset(id: string, assetData: any) {
    return await karakeepRequest('POST', `/bookmarks/${id}/assets`, assetData);
  }

  /**
   * Replace asset on a bookmark
   * @param id - Bookmark ID
   * @param assetData - Asset data to replace with
   */
  static async replaceAsset(id: string, assetData: any) {
    return await karakeepRequest('PUT', `/bookmarks/${id}/assets`, assetData);
  }

  /**
   * Detach asset from a bookmark
   * @param id - Bookmark ID
   */
  static async detachAsset(id: string) {
    return await karakeepRequest('DELETE', `/bookmarks/${id}/assets`);
  }
}
