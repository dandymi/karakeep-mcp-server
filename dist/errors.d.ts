import { UserError } from 'fastmcp';
export declare class DiscogsError extends Error {
    readonly status: number;
    readonly response: unknown;
    constructor(message: string, status: number, response: unknown);
}
export declare class DiscogsAuthenticationError extends DiscogsError {
    constructor(message?: string);
}
export declare class DiscogsMethodNotAllowedError extends DiscogsError {
    constructor(message?: string);
}
export declare class DiscogsPermissionError extends DiscogsError {
    constructor(message?: string);
}
export declare class DiscogsRateLimitError extends DiscogsError {
    readonly resetAt: Date;
    constructor(message: string | undefined, resetAt: Date);
}
export declare class DiscogsResourceNotFoundError extends DiscogsError {
    constructor(message?: string);
}
export declare class DiscogsValidationFailedError extends DiscogsError {
    constructor(response?: unknown);
}
/**
 * Creates a specific Discogs error instance based on HTTP status code
 *
 * @param status HTTP status code from the Discogs API response
 * @param response Response data from the Discogs API
 * @returns An appropriate DiscogsError subclass instance
 */
export declare function createDiscogsError(status: number, response: any): DiscogsError;
/**
 * Creates a user-friendly error from any error object
 * This will be displayed cleanly in FastMCP without error class prefixes
 *
 * @param error The error to format
 * @returns A UserError with the original error message
 */
export declare function formatDiscogsError(error: unknown): UserError;
/**
 * Type guard to check if an error is a DiscogsError
 *
 * @param error The error to check
 * @returns True if the error is a DiscogsError or subclass
 */
export declare function isDiscogsError(error: unknown): error is DiscogsError;
//# sourceMappingURL=errors.d.ts.map