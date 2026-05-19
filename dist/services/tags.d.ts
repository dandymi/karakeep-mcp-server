/**
 * Tags service for Karakeep API
 */
export declare class TagsService {
    /**
     * Get all tags for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllTags(params?: {
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Create a new tag
     * @param tagData - Tag data to create
     */
    static createTag(tagData: any): Promise<any>;
    /**
     * Get a single tag by ID
     * @param id - Tag ID
     */
    static getTag(id: string): Promise<any>;
    /**
     * Update a tag by ID
     * @param id - Tag ID
     * @param tagData - Updated tag data
     */
    static updateTag(id: string, tagData: {
        label?: string;
    }): Promise<any>;
    /**
     * Delete a tag by ID
     * @param id - Tag ID
     */
    static deleteTag(id: string): Promise<any>;
    /**
     * Get bookmarks with a tag
     * @param id - Tag ID
     * @param params - Query parameters for filtering and pagination
     */
    static getTagBookmarks(id: string, params?: {
        archived?: boolean;
        favourited?: boolean;
        sortOrder?: string;
        limit?: number;
        cursor?: string;
    }): Promise<any>;
}
//# sourceMappingURL=tags.d.ts.map