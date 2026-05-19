import { FastMCP, Tool } from 'fastmcp';
import { BookmarksService } from '../services/bookmarks.ts';
import { z } from 'zod';

/**
 * Registers bookmarks-related MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerBookmarksTools(server: FastMCP): void {
  // Get all bookmarks
  const getAllBookmarksTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-all-bookmarks',
    description: 'Get all bookmarks with filtering and pagination',
    parameters: z.object({
      archived: z.boolean().optional(),
      favourited: z.boolean().optional(),
      sortOrder: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional(),
      includeContent: z.boolean().optional()
    }),
    canAccess: () => true,
    execute: async ({ archived, favourited, sortOrder, limit, cursor, includeContent }) => {
      const result = await BookmarksService.getAllBookmarks({
        archived,
        favourited,
        sortOrder,
        limit,
        cursor,
        includeContent
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

  // Create bookmark
  const createBookmarkTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'create-bookmark',
    description: 'Create a new bookmark',
    parameters: z.object({
      url: z.string().url(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      favourited: z.boolean().optional(),
      archived: z.boolean().optional(),
      tagIds: z.array(z.string()).optional()
    }),
    canAccess: () => true,
    execute: async ({ url, title, description, content, favourited, archived, tagIds }) => {
      const result = await BookmarksService.createBookmark({
        url,
        title,
        description,
        content,
        favourited,
        archived,
        tagIds
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

  // Get bookmark by ID
  const getBookmarkByIdTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmark-by-id',
    description: 'Get a specific bookmark by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmark(id);
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

  // Update bookmark
  const updateBookmarkTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-bookmark',
    description: 'Update an existing bookmark',
    parameters: z.object({
      id: z.string(),
      url: z.string().url().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      favourited: z.boolean().optional(),
      archived: z.boolean().optional(),
      tagIds: z.array(z.string()).optional()
    }),
    canAccess: () => true,
    execute: async ({ id, url, title, description, content, favourited, archived, tagIds }) => {
      const result = await BookmarksService.updateBookmark(id, {
        url,
        title,
        description,
        content,
        favourited,
        archived,
        tagIds
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

  // Delete bookmark
  const deleteBookmarkTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'delete-bookmark',
    description: 'Delete a bookmark by ID',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.deleteBookmark(id);
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

  // Search bookmarks
  const searchBookmarksTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'search-bookmarks',
    description: 'Search bookmarks by query',
    parameters: z.object({
      query: z.string(),
      archived: z.boolean().optional(),
      favourited: z.boolean().optional(),
      sortOrder: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ query, archived, favourited, sortOrder, limit, cursor }) => {
      const result = await BookmarksService.searchBookmarks(query, {
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

  // Get bookmark assets (using getBookmarkLists as approximation)
  const getBookmarkAssetsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmark-assets',
    description: 'Get assets for a bookmark',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmarkLists(id);
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

  // Add asset to bookmark
  const addBookmarkAssetTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'add-bookmark-asset',
    description: 'Add an asset to a bookmark',
    parameters: z.object({
      bookmarkId: z.string(),
      assetId: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, assetId }) => {
      const result = await BookmarksService.attachAsset(bookmarkId, { id: assetId });
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

  // Remove asset from bookmark
  const removeBookmarkAssetTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'remove-bookmark-asset',
    description: 'Remove an asset from a bookmark',
    parameters: z.object({
      bookmarkId: z.string(),
      assetId: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, assetId }) => {
      const result = await BookmarksService.detachAsset(bookmarkId);
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

  // Get bookmark summary
  const getBookmarkSummaryTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmark-summary',
    description: 'Get AI-generated summary for a bookmark',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.summarizeBookmark(id);
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

  // Regenerate bookmark summary
  const regenerateBookmarkSummaryTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'regenerate-bookmark-summary',
    description: 'Regenerate AI-generated summary for a bookmark',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.summarizeBookmark(id);
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

  // Get bookmark highlights
  const getBookmarkHighlightsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmark-highlights',
    description: 'Get highlights for a bookmark',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmarkHighlights(id);
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

  // Add highlight to bookmark (using highlights service)
  const addBookmarkHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'add-bookmark-highlight',
    description: 'Add a highlight to a bookmark',
    parameters: z.object({
      bookmarkId: z.string(),
      content: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, content }) => {
      const { HighlightsService } = await import('../services/highlights.ts');
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

  // Update bookmark highlight (using highlights service)
  const updateBookmarkHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'update-bookmark-highlight',
    description: 'Update a bookmark highlight',
    parameters: z.object({
      id: z.string(),
      content: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id, content }) => {
      const { HighlightsService } = await import('../services/highlights.ts');
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

  // Delete bookmark highlight (using highlights service)
  const deleteBookmarkHighlightTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'delete-bookmark-highlight',
    description: 'Delete a bookmark highlight',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const { HighlightsService } = await import('../services/highlights.ts');
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

  // Get bookmark tags (using tags service)
  const getBookmarkTagsTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'get-bookmark-tags',
    description: 'Get tags for a bookmark',
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const { TagsService } = await import('../services/tags.ts');
      const result = await TagsService.getTagBookmarks(id, {
        archived: undefined,
        favourited: undefined,
        sortOrder: undefined,
        limit: undefined,
        cursor: undefined
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

  // Add tag to bookmark
  const addBookmarkTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'add-bookmark-tag',
    description: 'Add a tag to a bookmark',
    parameters: z.object({
      bookmarkId: z.string(),
      tagId: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, tagId }) => {
      const result = await BookmarksService.attachTags(bookmarkId, [tagId]);
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

  // Remove tag from bookmark
  const removeBookmarkTagTool: Tool<import('fastmcp').FastMCPSessionAuth, z.ZodType<any>, any> = {
    name: 'remove-bookmark-tag',
    description: 'Remove a tag from a bookmark',
    parameters: z.object({
      bookmarkId: z.string(),
      tagId: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, tagId }) => {
      const result = await BookmarksService.detachTags(bookmarkId, [tagId]);
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

  server.addTool(getAllBookmarksTool);
  server.addTool(createBookmarkTool);
  server.addTool(getBookmarkByIdTool);
  server.addTool(updateBookmarkTool);
  server.addTool(deleteBookmarkTool);
  server.addTool(searchBookmarksTool);
  server.addTool(getBookmarkAssetsTool);
  server.addTool(addBookmarkAssetTool);
  server.addTool(removeBookmarkAssetTool);
  server.addTool(getBookmarkSummaryTool);
  server.addTool(regenerateBookmarkSummaryTool);
  server.addTool(getBookmarkHighlightsTool);
  server.addTool(addBookmarkHighlightTool);
  server.addTool(updateBookmarkHighlightTool);
  server.addTool(deleteBookmarkHighlightTool);
  server.addTool(getBookmarkTagsTool);
  server.addTool(addBookmarkTagTool);
  server.addTool(removeBookmarkTagTool);
}
