import { karakeepRequest } from '../utils.ts';

/**
 * Admin service for Karakeep API
 */
export class AdminService {
  /**
   * Get system statistics (admin only)
   */
  static async getStats() {
    return await karakeepRequest('GET', '/admin/stats');
  }

  /**
   * Get system information (admin only)
   */
  static async getInfo() {
    return await karakeepRequest('GET', '/admin/info');
  }
}
