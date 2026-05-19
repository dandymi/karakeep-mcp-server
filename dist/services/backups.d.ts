/**
 * Backups service for Karakeep API
 */
export declare class BackupsService {
    /**
     * Get all backups for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllBackups(params?: {
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Create a new backup
     */
    static createBackup(): Promise<any>;
    /**
     * Get a single backup by ID
     * @param id - Backup ID
     */
    static getBackup(id: string): Promise<any>;
    /**
     * Delete a backup by ID
     * @param id - Backup ID
     */
    static deleteBackup(id: string): Promise<any>;
    /**
     * Restore from a backup
     * @param id - Backup ID
     */
    static restoreBackup(id: string): Promise<any>;
}
//# sourceMappingURL=backups.d.ts.map