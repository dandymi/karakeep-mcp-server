import { karakeepRequest } from '../utils.ts';

/**
 * Users service for Karakeep API
 */
export class UsersService {
  /**
   * Get the current authenticated user's profile
   */
  static async getCurrentUser() {
    return await karakeepRequest('GET', '/users/me');
  }

  /**
   * Get a user by ID
   * @param id - User ID
   */
  static async getUser(id: string) {
    return await karakeepRequest('GET', `/users/${id}`);
  }

  /**
   * Update the current user's profile
   * @param userData - Updated user data
   */
  static async updateCurrentUser(userData: { name?: string; email?: string }) {
    return await karakeepRequest('PUT', '/users/me', userData);
  }
}
