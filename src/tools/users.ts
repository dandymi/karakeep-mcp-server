import { FastMCP, Tool } from 'fastmcp';
import { UsersService } from '../services/users.ts';
import { z } from 'zod';

/**
 * Registers users-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerUsersTools(server: FastMCP): void {
  // Get current user
  const getCurrentUserTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-current-user',
    description: 'Get the currently authenticated user',
    parameters: z.object({}), // Empty object schema
    canAccess: () => true,
    execute: async () => {
      const result = await UsersService.getCurrentUser();
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

  // Get user by ID
  const getUserTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-user',
    description: 'Get a user by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await UsersService.getUser(id);
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

  // Update current user
  const updateCurrentUserTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-current-user',
    description: 'Update the current user\'s profile',
    parameters: z.object({
      name: z.string().optional(),
      email: z.string().email().optional()
    }),
    canAccess: () => true,
    execute: async ({ name, email }) => {
      const result = await UsersService.updateCurrentUser({ name, email });
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

  server.addTool(getCurrentUserTool);
  server.addTool(getUserTool);
  server.addTool(updateCurrentUserTool);
}
