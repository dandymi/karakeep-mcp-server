/**
 * Assets service for Karakeep API
 */
export declare class AssetsService {
    /**
     * Get all assets for the authenticated user
     * @param params - Query parameters for filtering and pagination
     */
    static getAllAssets(params?: {
        limit?: number;
        cursor?: string;
    }): Promise<any>;
    /**
     * Upload a new asset
     * @param assetData - Asset data to upload (FormData)
     */
    static uploadAsset(assetData: FormData | any): Promise<any>;
    /**
     * Get a single asset by ID
     * @param id - Asset ID
     */
    static getAsset(id: string): Promise<any>;
    /**
     * Delete an asset by ID
     * @param id - Asset ID
     */
    static deleteAsset(id: string): Promise<any>;
}
//# sourceMappingURL=assets.d.ts.map