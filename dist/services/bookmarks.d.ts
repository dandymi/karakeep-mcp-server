/**
 * Bookmarks service for Karakeep API
 */
export declare class BookmarksService {
    /**
     * Get all bookmarks for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllBookmarks(params?: {
        archived?: boolean;
        favourited?: boolean;
        sortOrder?: string;
        limit?: number;
        cursor?: string;
        includeContent?: boolean;
    }): Promise<any>;
    /**
     * Create a new bookmark
     * @param bookmarkData - Bookmark data to create
     */
    static createBookmark(bookmarkData: any): Promise<any>;
    /**
     * Search bookmarks
     * @param query - Search query
     * @param params - Additional query parameters
     */
    static searchBookmarks(query: string, params?: {
        archived?: boolean;
        favourited?: boolean;
        sortOrder?: string;
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Check if a URL exists in bookmarks
     * @param url - URL to check
     */
    static urlExists(url: string): Promise<any>;
    /**
     * Get a single bookmark by ID
     * @param id - Bookmark ID
     */
    static getBookmark(id: string): Promise<any>;
    /**
     * Delete a bookmark by ID
     * @param id - Bookmark ID
     */
    static deleteBookmark(id: string): Promise<any>;
    /**
     * Update a bookmark by ID
     * @param id - Bookmark ID
     * @param bookmarkData - Updated bookmark data
     */
    static updateBookmark(id: string, bookmarkData: any): Promise<any>;
    /**
     * Summarize a bookmark by ID
     * @param id - Bookmark ID
     */
    static summarizeBookmark(id: string): Promise<any>;
    /**
     * Attach tags to a bookmark
     * @param id - Bookmark ID
     * @param tagIds - Array of tag IDs to attach
     */
    static attachTags(id: string, tagIds: string[]): Promise<any>;
    /**
     * Detach tags from a bookmark
     * @param id - Bookmark ID
     * @param tagIds - Array of tag IDs to detach
     */
    static detachTags(id: string, tagIds: string[]): Promise<any>;
    /**
     * Get lists of a bookmark
     * @param id - Bookmark ID
     */
    static getBookmarkLists(id: string): Promise<any>;
    /**
     * Get highlights of a bookmark
     * @param id - Bookmark ID
     */
    static getBookmarkHighlights(id: string): Promise<any>;
    /**
     * Attach asset to a bookmark
     * @param id - Bookmark ID
     * @param assetData - Asset data to attach
     */
    static attachAsset(id: string, assetData: any): Promise<any>;
    /**
     * Replace asset on a bookmark
     * @param id - Bookmark ID
     * @param assetData - Asset data to replace with
     */
    static replaceAsset(id: string, assetData: any): Promise<any>;
    /**
     * Detach asset from a bookmark
     * @param id - Bookmark ID
     */
    static detachAsset(id: string): Promise<any>;
}
//# sourceMappingURL=bookmarks.d.ts.map