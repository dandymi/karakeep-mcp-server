import { config } from './config.ts';

/**
 * Make a request to the Karakeep API
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param endpoint - API endpoint (without base URL)
 * @param data - Data to send in request body (for POST/PUT)
 * @param options - Additional fetch options
 * @returns Parsed JSON response
 */
export async function karakeepRequest(method: string, endpoint: string, data: any = null, options: any = {}): Promise<any> {
  const url = `${config.karakeep.apiUrl}${endpoint}`;

  const fetchOptions = {
    method,
    headers: {
      'Authorization': `Bearer ${config.karakeep.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': config.karakeep.userAgent,
      ...options.headers
    },
    ...options
  };

  // Only add body for methods that support it
  if (data !== null && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Karakeep API error: ${response.status} ${response.statusText} - ${(errorData as any).message || ''}`);
  }

  return await response.json();
}

/**
 * Log utility function
 */
export const log = {
  info: (message: string, ...args: any[]) => console.log(`[KarakeepMCP] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[KarakeepMCP] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[KarakeepMCP] ${message}`, ...args)
};