/**
 * Make a request to the Karakeep API
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param endpoint - API endpoint (without base URL)
 * @param data - Data to send in request body (for POST/PUT)
 * @param options - Additional fetch options
 * @returns Parsed JSON response
 */
export declare function karakeepRequest(method: string, endpoint: string, data?: any, options?: any): Promise<any>;
/**
 * Log utility function
 */
export declare const log: {
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
};
//# sourceMappingURL=utils.d.ts.map