import { FastMCP, Tool } from 'fastmcp';
import { AdminService } from '../services/admin.ts';
import { z } from 'zod';

/**
 * Registers admin-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerAdminTools(server: FastMCP): void {
  // Get admin stats
  const getAdminStatsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-admin-stats',
    description: 'Get system stats (admin only)',
    parameters: z.object({}), // Empty object schema
    canAccess: () => true, // In reality, this should check admin privileges
    execute: async () => {
      const result = await AdminService.getStats();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };

  // Get admin info
  const getAdminInfoTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-admin-info',
    description: 'Get system info (admin only)',
    parameters: z.object({}), // Empty object schema
    canAccess: () => true, // In reality, this should check admin privileges
    execute: async () => {
      const result = await AdminService.getInfo();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };

  server.addTool(getAdminStatsTool);
  server.addTool(getAdminInfoTool);
}
