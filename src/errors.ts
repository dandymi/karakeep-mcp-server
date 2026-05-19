import { UserError } from 'fastmcp';

export class KarakeepError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class KarakeepAuthenticationError extends KarakeepError {
  constructor(message = 'Authentication failed') {
    super(message, 401, { message });
    this.name = new.target.name;
  }
}

export class KarakeepPermissionError extends KarakeepError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, { message });
    this.name = new.target.name;
  }
}

export class KarakeepRateLimitError extends KarakeepError {
  constructor(
    message = 'Rate limit exceeded',
    public readonly resetAt: Date,
  ) {
    super(message, 429, { message, reset_at: resetAt.toISOString() });
    this.name = new.target.name;
  }
}

export class KarakeepResourceNotFoundError extends KarakeepError {
  constructor(message = 'Resource not found') {
    super(message, 404, { message });
    this.name = new.target.name;
  }
}

export class KarakeepValidationFailedError extends KarakeepError {
  constructor(response?: unknown) {
    // Try to extract the detailed error message from the response
    let message = 'Validation failed';

    if (response && typeof response === 'object' && response !== null) {
      const detail = (response as { detail?: Array<{ msg?: string }> }).detail;
      if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
        message = detail[0].msg;
      }
    }

    super(message, 422, { message });
    this.name = new.target.name;
  }
}

/**
 * Creates a specific Karakeep error instance based on HTTP status code
 *
 * @param status HTTP status code from the Karakeep API response
 * @param response Response data from the Karakeep API
 * @returns An appropriate KarakeepError subclass instance
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createKarakeepError(status: number, response: any): KarakeepError {
  switch (status) {
    case 401:
      return new KarakeepAuthenticationError(response?.message);
    case 403:
      return new KarakeepPermissionError(response?.message);
    case 404:
      return new KarakeepResourceNotFoundError(response?.message || 'Resource');
    case 405:
      return new KarakeepMethodNotAllowedError(response?.message);
    case 422:
      return new KarakeepValidationFailedError(response);
    case 429:
      return new KarakeepRateLimitError(
        response?.message,
        new Date(response?.reset_at || Date.now() + 60000),
      );
    default:
      return new KarakeepError(response?.message || 'Karakeep API error', status, response);
  }
}

/**
 * Creates a user-friendly error from any error object
 * This will be displayed cleanly in FastMCP without error class prefixes
 *
 * @param error The error to format
 * @returns A UserError with the original error message
 */
export function formatKarakeepError(error: unknown): UserError {
  let message: string;

  if (error instanceof Error) {
    // For any Error object, use its message directly
    message = error.message;
  } else {
    // For non-Error objects
    message = String(error);
  }

  return new UserError(message);
}

/**
 * Type guard to check if an error is a KarakeepError
 *
 * @param error The error to check
 * @returns True if the error is a KarakeepError or subclass
 */
export function isKarakeepError(error: unknown): error is KarakeepError {
  return error instanceof KarakeepError;
}

/**
 * Method Not Allowed error
 */
export class KarakeepMethodNotAllowedError extends KarakeepError {
  constructor(message = 'Method not allowed') {
    super(message, 405, { message });
    this.name = new.target.name;
  }
}
