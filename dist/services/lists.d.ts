/**
 * Lists service for Karakeep API
 */
export declare class ListsService {
    /**
     * Get all lists for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllLists(params?: {
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Create a new list
     * @param listData - List data to create
     */
    static createList(listData: any): Promise<any>;
    /**
     * Get a single list by ID
     * @param id - List ID
     */
    static getList(id: string): Promise<any>;
    /**
     * Update a list by ID
     * @param id - List ID
     * @param listData - Updated list data
     */
    static updateList(id: string, listData: any): Promise<any>;
    /**
     * Delete a list by ID
     * @param id - List ID
     */
    static deleteList(id: string): Promise<any>;
    /**
     * Get bookmarks in a list
     * @param id - List ID
     * @param params - Query parameters for filtering and pagination
     */
    static getListBookmarks(id: string, params?: {
        archived?: boolean;
        favourited?: boolean;
        sortOrder?: string;
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Add bookmarks to a list
     * @param id - List ID
     * @param bookmarkIds - Array of bookmark IDs to add
     */
    static addBookmarksToList(id: string, bookmarkIds: string[]): Promise<any>;
    /**
     * Remove bookmarks from a list
     * @param id - List ID
     * @param bookmarkIds - Array of bookmark IDs to remove
     */
    static removeBookmarksFromList(id: string, bookmarkIds: string[]): Promise<any>;
}
//# sourceMappingURL=lists.d.ts.map