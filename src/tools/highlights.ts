import { FastMCP, Tool } from 'fastmcp';
import { HighlightsService } from '../services/highlights.ts';
import { z } from 'zod';

/**
 * Registers highlights-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerHighlightsTools(server: FastMCP): void {
  // Get all highlights
  const getAllHighlightsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-all-highlights',
    description: 'Get all highlights with pagination',
    parameters: z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ limit, cursor }) => {
      const result = await HighlightsService.getAllHighlights({ limit, cursor });
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

  // Create highlight
  const createHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'create-highlight',
    description: 'Create a new highlight',
    parameters: z.object({
      content: z.string(),
      bookmarkId: z.string()
    }),
    canAccess: () => true,
    execute: async ({ content, bookmarkId }) => {
      const result = await HighlightsService.createHighlight({ content, bookmarkId });
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

  // Get highlight by ID
  const getHighlightByIdTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-highlight-by-id',
    description: 'Get a specific highlight by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await HighlightsService.getHighlight(id);
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

  // Update highlight
  const updateHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-highlight',
    description: 'Update an existing highlight',
    parameters: z.object({
      id: z.string(),
      content: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id, content }) => {
      const result = await HighlightsService.updateHighlight(id, { content });
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

  // Delete highlight
  const deleteHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'delete-highlight',
    description: 'Delete a highlight by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await HighlightsService.deleteHighlight(id);
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

  // Get bookmarks with highlights
  const getBookmarksWithHighlightsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmarks-with-highlights',
    description: 'Get bookmarks that have highlights',
    parameters: z.object({
      archived: z.boolean().optional(),
      favourited: z.boolean().optional(),
      sortOrder: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ archived, favourited, sortOrder, limit, cursor }) => {
      // Note: Using getHighlightBookmarks from highlights service with a placeholder ID
      // This needs to be implemented properly in the service
      const result = await HighlightsService.getHighlightBookmarks('placeholder-id', {
        archived,
        favourited,
        sortOrder,
        limit,
        cursor
      });
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

  server.addTool(getAllHighlightsTool);
  server.addTool(createHighlightTool);
  server.addTool(getHighlightByIdTool);
  server.addTool(updateHighlightTool);
  server.addTool(deleteHighlightTool);
  server.addTool(getBookmarksWithHighlightsTool);
}
