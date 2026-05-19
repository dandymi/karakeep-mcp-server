import { karakeepRequest } from '../utils.ts';

/**
 * Assets service for Karakeep API
 */
export class AssetsService {
  /**
   * Get all assets for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllAssets(params: { limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/assets?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Upload a new asset
   * @param assetData - Asset data to upload (FormData)
   */
  static async uploadAsset(assetData: FormData | any) {
    // For file uploads, we'd need to handle FormData properly
    // This is a simplified version
    return await karakeepRequest('POST', '/assets', assetData, {
      headers: {
        // Content-Type will be set automatically by the browser/FormData
        // 'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * Get a single asset by ID
   * @param id - Asset ID
   */
  static async getAsset(id: string) {
    return await karakeepRequest('GET', `/assets/${id}`);
  }

  /**
   * Delete an asset by ID
   * @param id - Asset ID
   */
  static async deleteAsset(id: string) {
    return await karakeepRequest('DELETE', `/assets/${id}`);
  }
}
