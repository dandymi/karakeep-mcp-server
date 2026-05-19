/**
 * Users service for Karakeep API
 */
export declare class UsersService {
    /**
     * Get the current authenticated user's profile
     */
    static getCurrentUser(): Promise<any>;
    /**
     * Get a user by ID
     * @param id - User ID
     */
    static getUser(id: string): Promise<any>;
    /**
     * Update the current user's profile
     * @param userData - Updated user data
     */
    static updateCurrentUser(userData: {
        name?: string;
        email?: string;
    }): Promise<any>;
}
//# sourceMappingURL=users.d.ts.map