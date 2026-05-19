import { FastMCP, Tool } from 'fastmcp';
import { TagsService } from '../services/tags.ts';
import { z } from 'zod';

/**
 * Registers tags-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerTagsTools(server: FastMCP): void {
  // Get all tags
  const getAllTagsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-all-tags',
    description: 'Get all tags with pagination',
    parameters: z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ limit, cursor }) => {
      const result = await TagsService.getAllTags({ limit, cursor });
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

  // Create a new tag
  const createTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'create-tag',
    description: 'Create a new tag',
    parameters: z.object({
      label: z.string()
    }),
    canAccess: () => true,
    execute: async ({ label }) => {
      const result = await TagsService.createTag({ label });
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

  // Get tag by ID
  const getTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-tag-by-id',
    description: 'Get a specific tag by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await TagsService.getTag(id);
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

  // Update tag
  const updateTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-tag',
    description: 'Update an existing tag',
    parameters: z.object({
      id: z.string(),
      label: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ id, label }) => {
      const result = await TagsService.updateTag(id, { label });
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

  // Delete tag
  const deleteTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'delete-tag',
    description: 'Delete a tag by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await TagsService.deleteTag(id);
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

  // Get bookmarks with tag
  const getBookmarksWithTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmarks-with-tag',
    description: 'Get bookmarks with a specific tag',
    parameters: z.object({
      id: z.string(),
      archived: z.boolean().optional(),
      favourited: z.boolean().optional(),
      sortOrder: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ id, archived, favourited, sortOrder, limit, cursor }) => {
      const result = await TagsService.getTagBookmarks(id, {
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

  server.addTool(getAllTagsTool);
  server.addTool(createTagTool);
  server.addTool(getTagTool);
  server.addTool(updateTagTool);
  server.addTool(deleteTagTool);
  server.addTool(getBookmarksWithTagTool);
}
