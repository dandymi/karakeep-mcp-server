import { FastMCP, Tool } from 'fastmcp';
import { ListsService } from '../services/lists.ts';
import { z } from 'zod';

/**
 * Registers lists-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerListsTools(server: FastMCP): void {
  // Get all lists
  const getAllListsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-all-lists',
    description: 'Get all lists with pagination',
    parameters: z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ limit, cursor }) => {
      const result = await ListsService.getAllLists({ limit, cursor });
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

  // Create a new list
  const createListTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'create-list',
    description: 'Create a new list',
    parameters: z.object({
      title: z.string(),
      description: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ title, description }) => {
      const result = await ListsService.createList({ title, description });
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

  // Get list by ID
  const getListByIdTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-list-by-id',
    description: 'Get a specific list by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await ListsService.getList(id);
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

  // Update list
  const updateListTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-list',
    description: 'Update an existing list',
    parameters: z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ id, title, description }) => {
      const result = await ListsService.updateList(id, { title, description });
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

  // Delete list
  const deleteListTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'delete-list',
    description: 'Delete a list by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await ListsService.deleteList(id);
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

  // Get list bookmarks
  const getListBookmarksTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-list-bookmarks',
    description: 'Get bookmarks in a list',
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
      const result = await ListsService.getListBookmarks(id, {
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

  // Add bookmarks to list
  const addBookmarksToListTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'add-bookmarks-to-list',
    description: 'Add bookmarks to a list',
    parameters: z.object({
      listId: z.string(),
      bookmarkIds: z.array(z.string())
    }),
    canAccess: () => true,
    execute: async ({ listId, bookmarkIds }) => {
      const result = await ListsService.addBookmarksToList(listId, bookmarkIds);
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

  // Remove bookmarks from list
  const removeBookmarksFromListTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'remove-bookmarks-from-list',
    description: 'Remove bookmarks from a list',
    parameters: z.object({
      listId: z.string(),
      bookmarkIds: z.array(z.string())
    }),
    canAccess: () => true,
    execute: async ({ listId, bookmarkIds }) => {
      const result = await ListsService.removeBookmarksFromList(listId, bookmarkIds);
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

  server.addTool(getAllListsTool);
  server.addTool(createListTool);
  server.addTool(getListByIdTool);
  server.addTool(updateListTool);
  server.addTool(deleteListTool);
  server.addTool(getListBookmarksTool);
  server.addTool(addBookmarksToListTool);
  server.addTool(removeBookmarksFromListTool);
}
