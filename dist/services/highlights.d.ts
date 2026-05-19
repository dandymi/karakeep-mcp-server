/**
 * Highlights service for Karakeep API
 */
export declare class HighlightsService {
    /**
     * Get all highlights for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllHighlights(params?: {
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Create a new highlight
     * @param highlightData - Highlight data to create
     */
    static createHighlight(highlightData: any): Promise<any>;
    /**
     * Get a single highlight by ID
     * @param id - Highlight ID
     */
    static getHighlight(id: string): Promise<any>;
    /**
     * Update a highlight by ID
     * @param id - Highlight ID
     * @param highlightData - Updated highlight data
     */
    static updateHighlight(id: string, highlightData: any): Promise<any>;
    /**
     * Delete a highlight by ID
     * @param id - Highlight ID
     */
    static deleteHighlight(id: string): Promise<any>;
    /**
     * Get bookmarks with a highlight
     * @param id - Highlight ID
     * @param params - Query parameters for filtering and pagination
     */
    static getHighlightBookmarks(id: string, params?: {
        archived?: boolean;
        favourited?: boolean;
        sortOrder?: string;
        limit?: number;
        cursor?: string;
    }): Promise<any>;
}
//# sourceMappingURL=highlights.d.ts.map