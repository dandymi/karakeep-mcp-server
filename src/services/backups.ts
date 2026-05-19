import { karakeepRequest } from '../utils.ts';

/**
 * Backups service for Karakeep API
 */
export class BackupsService {
  /**
   * Get all backups for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllBackups(params: { limit?: number; cursor?: string } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.cursor) queryParams.append('cursor', params.cursor);
    
    const endpoint = `/backups?${queryParams.toString()}`;
    return await karakeepRequest('GET', endpoint);
  }

  /**
   * Create a new backup
   */
  static async createBackup(): Promise<any> {
    return await karakeepRequest('POST', '/backups');
  }

  /**
   * Get a single backup by ID
   * @param id - Backup ID
   */
  static async getBackup(id: string) {
    return await karakeepRequest('GET', `/backups/${id}`);
  }

  /**
   * Delete a backup by ID
   * @param id - Backup ID
   */
  static async deleteBackup(id: string) {
    return await karakeepRequest('DELETE', `/backups/${id}`);
  }

  /**
   * Restore from a backup
   * @param id - Backup ID
   */
  static async restoreBackup(id: string) {
    return await karakeepRequest('POST', `/backups/${id}/restore`);
  }
}
