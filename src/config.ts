import dotenv from 'dotenv';
import { VERSION } from './version.js';

// Load environment variables from .env file
dotenv.config();

// Karakeep API configuration
export const config = {
  karakeep: {
    apiUrl: process.env.KARAKEEP_API_URL || 'https://try.karakeep.app/api/v1',
    /* Some MCP clients can't handle large amounts of data.
     * The client may explicitly request more at their own peril. */
    defaultPerPage: 10,
    mediaType: process.env.KARAKEEP_MEDIA_TYPE || 'application/json',
    apiKey: process.env.KARAKEEP_API_KEY,
    userAgent: process.env.KARAKEEP_USER_AGENT || `KarakeepMCPServer/${VERSION}`,
  },
  server: {
    name: process.env.SERVER_NAME || 'Karakeep MCP Server',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    host: process.env.SERVER_HOST || '0.0.0.0',
  },
};

// Validate required configuration
export function validateConfig(): void {
  const missingVars: string[] = [];

  if (!process.env.KARAKEEP_API_KEY) {
    missingVars.push('KARAKEEP_API_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}
