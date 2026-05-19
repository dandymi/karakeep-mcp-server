#!/usr/bin/env node
import 'path';
import 'url';
import dotenv from 'dotenv';
import { FastMCP } from 'fastmcp';
import { z } from 'zod';

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var init_esm_shims = __esm({
  "node_modules/.pnpm/tsup@8.5.1_postcss@8.5.14_tsx@4.21.0_typescript@6.0.3/node_modules/tsup/assets/esm_shims.js"() {
  }
});

// src/version.ts
var VERSION;
var init_version = __esm({
  "src/version.ts"() {
    init_esm_shims();
    VERSION = "0.1.0";
  }
});
function validateConfig() {
  const missingVars = [];
  if (!process.env.KARAKEEP_API_KEY) {
    missingVars.push("KARAKEEP_API_KEY");
  }
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }
}
var config;
var init_config = __esm({
  "src/config.ts"() {
    init_esm_shims();
    init_version();
    dotenv.config();
    config = {
      karakeep: {
        apiUrl: process.env.KARAKEEP_API_URL || "https://try.karakeep.app/api/v1",
        /* Some MCP clients can't handle large amounts of data.
         * The client may explicitly request more at their own peril. */
        defaultPerPage: 10,
        mediaType: process.env.KARAKEEP_MEDIA_TYPE || "application/json",
        apiKey: process.env.KARAKEEP_API_KEY,
        userAgent: process.env.KARAKEEP_USER_AGENT || `KarakeepMCPServer/${VERSION}`
      },
      server: {
        name: process.env.SERVER_NAME || "Karakeep MCP Server",
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
        host: process.env.SERVER_HOST || "0.0.0.0"
      }
    };
  }
});

// src/utils.ts
async function karakeepRequest(method, endpoint, data = null, options = {}) {
  const url = `${config.karakeep.apiUrl}${endpoint}`;
  const fetchOptions = {
    method,
    headers: {
      "Authorization": `Bearer ${config.karakeep.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": config.karakeep.userAgent,
      ...options.headers
    },
    ...options
  };
  if (data !== null && (method === "POST" || method === "PUT" || method === "PATCH")) {
    fetchOptions.body = JSON.stringify(data);
  }
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Karakeep API error: ${response.status} ${response.statusText} - ${errorData.message || ""}`);
  }
  return await response.json();
}
var log;
var init_utils = __esm({
  "src/utils.ts"() {
    init_esm_shims();
    init_config();
    log = {
      info: (message, ...args) => console.log(`[KarakeepMCP] ${message}`, ...args),
      error: (message, ...args) => console.error(`[KarakeepMCP] ${message}`, ...args),
      warn: (message, ...args) => console.warn(`[KarakeepMCP] ${message}`, ...args)
    };
  }
});

// src/services/highlights.ts
var highlights_exports = {};
__export(highlights_exports, {
  HighlightsService: () => HighlightsService
});
var HighlightsService;
var init_highlights = __esm({
  "src/services/highlights.ts"() {
    init_esm_shims();
    init_utils();
    HighlightsService = class {
      /**
       * Get all highlights for the authenticated user
       * @param params - Query parameters for filtering and pagination
       */
      static async getAllHighlights(params = {}) {
        const queryParams = new URLSearchParams();
        if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
        if (params.cursor) queryParams.append("cursor", params.cursor);
        const endpoint = `/highlights?${queryParams.toString()}`;
        return await karakeepRequest("GET", endpoint);
      }
      /**
       * Create a new highlight
       * @param highlightData - Highlight data to create
       */
      static async createHighlight(highlightData) {
        return await karakeepRequest("POST", "/highlights", highlightData);
      }
      /**
       * Get a single highlight by ID
       * @param id - Highlight ID
       */
      static async getHighlight(id) {
        return await karakeepRequest("GET", `/highlights/${id}`);
      }
      /**
       * Update a highlight by ID
       * @param id - Highlight ID
       * @param highlightData - Updated highlight data
       */
      static async updateHighlight(id, highlightData) {
        return await karakeepRequest("PUT", `/highlights/${id}`, highlightData);
      }
      /**
       * Delete a highlight by ID
       * @param id - Highlight ID
       */
      static async deleteHighlight(id) {
        return await karakeepRequest("DELETE", `/highlights/${id}`);
      }
      /**
       * Get bookmarks with a highlight
       * @param id - Highlight ID
       * @param params - Query parameters for filtering and pagination
       */
      static async getHighlightBookmarks(id, params = {}) {
        const queryParams = new URLSearchParams();
        if (params.archived !== void 0) queryParams.append("archived", String(params.archived));
        if (params.favourited !== void 0) queryParams.append("favourited", String(params.favourited));
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
        if (params.cursor) queryParams.append("cursor", params.cursor);
        const endpoint = `/highlights/${id}/bookmarks?${queryParams.toString()}`;
        return await karakeepRequest("GET", endpoint);
      }
    };
  }
});

// src/services/tags.ts
var tags_exports = {};
__export(tags_exports, {
  TagsService: () => TagsService
});
var TagsService;
var init_tags = __esm({
  "src/services/tags.ts"() {
    init_esm_shims();
    init_utils();
    TagsService = class {
      /**
       * Get all tags for the authenticated user
       * @param params - Query parameters for filtering and pagination
       */
      static async getAllTags(params = {}) {
        const queryParams = new URLSearchParams();
        if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
        if (params.cursor) queryParams.append("cursor", params.cursor);
        const endpoint = `/tags?${queryParams.toString()}`;
        return await karakeepRequest("GET", endpoint);
      }
      /**
       * Create a new tag
       * @param tagData - Tag data to create
       */
      static async createTag(tagData) {
        return await karakeepRequest("POST", "/tags", tagData);
      }
      /**
       * Get a single tag by ID
       * @param id - Tag ID
       */
      static async getTag(id) {
        return await karakeepRequest("GET", `/tags/${id}`);
      }
      /**
       * Update a tag by ID
       * @param id - Tag ID
       * @param tagData - Updated tag data
       */
      static async updateTag(id, tagData) {
        return await karakeepRequest("PUT", `/tags/${id}`, tagData);
      }
      /**
       * Delete a tag by ID
       * @param id - Tag ID
       */
      static async deleteTag(id) {
        return await karakeepRequest("DELETE", `/tags/${id}`);
      }
      /**
       * Get bookmarks with a tag
       * @param id - Tag ID
       * @param params - Query parameters for filtering and pagination
       */
      static async getTagBookmarks(id, params = {}) {
        const queryParams = new URLSearchParams();
        if (params.archived !== void 0) queryParams.append("archived", String(params.archived));
        if (params.favourited !== void 0) queryParams.append("favourited", String(params.favourited));
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
        if (params.cursor) queryParams.append("cursor", params.cursor);
        const endpoint = `/tags/${id}/bookmarks?${queryParams.toString()}`;
        return await karakeepRequest("GET", endpoint);
      }
    };
  }
});

// src/index.ts
init_esm_shims();
init_config();

// src/tools/index.ts
init_esm_shims();

// src/tools/bookmarks.ts
init_esm_shims();

// src/services/bookmarks.ts
init_esm_shims();
init_utils();
var BookmarksService = class {
  /**
   * Get all bookmarks for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllBookmarks(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.archived !== void 0) queryParams.append("archived", String(params.archived));
    if (params.favourited !== void 0) queryParams.append("favourited", String(params.favourited));
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
    if (params.cursor) queryParams.append("cursor", params.cursor);
    if (params.includeContent !== void 0) queryParams.append("includeContent", String(params.includeContent));
    const endpoint = `/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Create a new bookmark
   * @param bookmarkData - Bookmark data to create
   */
  static async createBookmark(bookmarkData) {
    return await karakeepRequest("POST", "/bookmarks", bookmarkData);
  }
  /**
   * Search bookmarks
   * @param query - Search query
   * @param params - Additional query parameters
   */
  static async searchBookmarks(query, params = {}) {
    const queryParams = new URLSearchParams();
    queryParams.append("q", query);
    if (params.archived !== void 0) queryParams.append("archived", String(params.archived));
    if (params.favourited !== void 0) queryParams.append("favourited", String(params.favourited));
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
    if (params.cursor) queryParams.append("cursor", params.cursor);
    const endpoint = `/bookmarks/search?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Check if a URL exists in bookmarks
   * @param url - URL to check
   */
  static async urlExists(url) {
    const queryParams = new URLSearchParams();
    queryParams.append("url", url);
    const endpoint = `/bookmarks/exists?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Get a single bookmark by ID
   * @param id - Bookmark ID
   */
  static async getBookmark(id) {
    return await karakeepRequest("GET", `/bookmarks/${id}`);
  }
  /**
   * Delete a bookmark by ID
   * @param id - Bookmark ID
   */
  static async deleteBookmark(id) {
    return await karakeepRequest("DELETE", `/bookmarks/${id}`);
  }
  /**
   * Update a bookmark by ID
   * @param id - Bookmark ID
   * @param bookmarkData - Updated bookmark data
   */
  static async updateBookmark(id, bookmarkData) {
    return await karakeepRequest("PUT", `/bookmarks/${id}`, bookmarkData);
  }
  /**
   * Summarize a bookmark by ID
   * @param id - Bookmark ID
   */
  static async summarizeBookmark(id) {
    return await karakeepRequest("GET", `/bookmarks/${id}/summarize`);
  }
  /**
   * Attach tags to a bookmark
   * @param id - Bookmark ID
   * @param tagIds - Array of tag IDs to attach
   */
  static async attachTags(id, tagIds) {
    return await karakeepRequest("POST", `/bookmarks/${id}/tags`, { tagIds });
  }
  /**
   * Detach tags from a bookmark
   * @param id - Bookmark ID
   * @param tagIds - Array of tag IDs to detach
   */
  static async detachTags(id, tagIds) {
    return await karakeepRequest("DELETE", `/bookmarks/${id}/tags`, { tagIds });
  }
  /**
   * Get lists of a bookmark
   * @param id - Bookmark ID
   */
  static async getBookmarkLists(id) {
    return await karakeepRequest("GET", `/bookmarks/${id}/lists`);
  }
  /**
   * Get highlights of a bookmark
   * @param id - Bookmark ID
   */
  static async getBookmarkHighlights(id) {
    return await karakeepRequest("GET", `/bookmarks/${id}/highlights`);
  }
  /**
   * Attach asset to a bookmark
   * @param id - Bookmark ID
   * @param assetData - Asset data to attach
   */
  static async attachAsset(id, assetData) {
    return await karakeepRequest("POST", `/bookmarks/${id}/assets`, assetData);
  }
  /**
   * Replace asset on a bookmark
   * @param id - Bookmark ID
   * @param assetData - Asset data to replace with
   */
  static async replaceAsset(id, assetData) {
    return await karakeepRequest("PUT", `/bookmarks/${id}/assets`, assetData);
  }
  /**
   * Detach asset from a bookmark
   * @param id - Bookmark ID
   */
  static async detachAsset(id) {
    return await karakeepRequest("DELETE", `/bookmarks/${id}/assets`);
  }
};
function registerBookmarksTools(server) {
  const getAllBookmarksTool = {
    name: "get-all-bookmarks",
    description: "Get all bookmarks with filtering and pagination",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const createBookmarkTool = {
    name: "create-bookmark",
    description: "Create a new bookmark",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarkByIdTool = {
    name: "get-bookmark-by-id",
    description: "Get a specific bookmark by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmark(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateBookmarkTool = {
    name: "update-bookmark",
    description: "Update an existing bookmark",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteBookmarkTool = {
    name: "delete-bookmark",
    description: "Delete a bookmark by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.deleteBookmark(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const searchBookmarksTool = {
    name: "search-bookmarks",
    description: "Search bookmarks by query",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarkAssetsTool = {
    name: "get-bookmark-assets",
    description: "Get assets for a bookmark",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmarkLists(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const addBookmarkAssetTool = {
    name: "add-bookmark-asset",
    description: "Add an asset to a bookmark",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const removeBookmarkAssetTool = {
    name: "remove-bookmark-asset",
    description: "Remove an asset from a bookmark",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarkSummaryTool = {
    name: "get-bookmark-summary",
    description: "Get AI-generated summary for a bookmark",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.summarizeBookmark(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const regenerateBookmarkSummaryTool = {
    name: "regenerate-bookmark-summary",
    description: "Regenerate AI-generated summary for a bookmark",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.summarizeBookmark(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarkHighlightsTool = {
    name: "get-bookmark-highlights",
    description: "Get highlights for a bookmark",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BookmarksService.getBookmarkHighlights(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const addBookmarkHighlightTool = {
    name: "add-bookmark-highlight",
    description: "Add a highlight to a bookmark",
    parameters: z.object({
      bookmarkId: z.string(),
      content: z.string()
    }),
    canAccess: () => true,
    execute: async ({ bookmarkId, content }) => {
      const { HighlightsService: HighlightsService2 } = await Promise.resolve().then(() => (init_highlights(), highlights_exports));
      const result = await HighlightsService2.createHighlight({ content, bookmarkId });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateBookmarkHighlightTool = {
    name: "update-bookmark-highlight",
    description: "Update a bookmark highlight",
    parameters: z.object({
      id: z.string(),
      content: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id, content }) => {
      const { HighlightsService: HighlightsService2 } = await Promise.resolve().then(() => (init_highlights(), highlights_exports));
      const result = await HighlightsService2.updateHighlight(id, { content });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteBookmarkHighlightTool = {
    name: "delete-bookmark-highlight",
    description: "Delete a bookmark highlight",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const { HighlightsService: HighlightsService2 } = await Promise.resolve().then(() => (init_highlights(), highlights_exports));
      const result = await HighlightsService2.deleteHighlight(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarkTagsTool = {
    name: "get-bookmark-tags",
    description: "Get tags for a bookmark",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const { TagsService: TagsService2 } = await Promise.resolve().then(() => (init_tags(), tags_exports));
      const result = await TagsService2.getTagBookmarks(id, {
        archived: void 0,
        favourited: void 0,
        sortOrder: void 0,
        limit: void 0,
        cursor: void 0
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const addBookmarkTagTool = {
    name: "add-bookmark-tag",
    description: "Add a tag to a bookmark",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const removeBookmarkTagTool = {
    name: "remove-bookmark-tag",
    description: "Remove a tag from a bookmark",
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
            type: "text",
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

// src/tools/lists.ts
init_esm_shims();

// src/services/lists.ts
init_esm_shims();
init_utils();
var ListsService = class {
  /**
   * Get all lists for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllLists(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
    if (params.cursor) queryParams.append("cursor", params.cursor);
    const endpoint = `/lists?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Create a new list
   * @param listData - List data to create
   */
  static async createList(listData) {
    return await karakeepRequest("POST", "/lists", listData);
  }
  /**
   * Get a single list by ID
   * @param id - List ID
   */
  static async getList(id) {
    return await karakeepRequest("GET", `/lists/${id}`);
  }
  /**
   * Update a list by ID
   * @param id - List ID
   * @param listData - Updated list data
   */
  static async updateList(id, listData) {
    return await karakeepRequest("PUT", `/lists/${id}`, listData);
  }
  /**
   * Delete a list by ID
   * @param id - List ID
   */
  static async deleteList(id) {
    return await karakeepRequest("DELETE", `/lists/${id}`);
  }
  /**
   * Get bookmarks in a list
   * @param id - List ID
   * @param params - Query parameters for filtering and pagination
   */
  static async getListBookmarks(id, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.archived !== void 0) queryParams.append("archived", String(params.archived));
    if (params.favourited !== void 0) queryParams.append("favourited", String(params.favourited));
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
    if (params.cursor) queryParams.append("cursor", params.cursor);
    const endpoint = `/lists/${id}/bookmarks?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Add bookmarks to a list
   * @param id - List ID
   * @param bookmarkIds - Array of bookmark IDs to add
   */
  static async addBookmarksToList(id, bookmarkIds) {
    return await karakeepRequest("POST", `/lists/${id}/bookmarks`, { bookmarkIds });
  }
  /**
   * Remove bookmarks from a list
   * @param id - List ID
   * @param bookmarkIds - Array of bookmark IDs to remove
   */
  static async removeBookmarksFromList(id, bookmarkIds) {
    return await karakeepRequest("DELETE", `/lists/${id}/bookmarks`, { bookmarkIds });
  }
};
function registerListsTools(server) {
  const getAllListsTool = {
    name: "get-all-lists",
    description: "Get all lists with pagination",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const createListTool = {
    name: "create-list",
    description: "Create a new list",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getListByIdTool = {
    name: "get-list-by-id",
    description: "Get a specific list by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await ListsService.getList(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateListTool = {
    name: "update-list",
    description: "Update an existing list",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteListTool = {
    name: "delete-list",
    description: "Delete a list by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await ListsService.deleteList(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getListBookmarksTool = {
    name: "get-list-bookmarks",
    description: "Get bookmarks in a list",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const addBookmarksToListTool = {
    name: "add-bookmarks-to-list",
    description: "Add bookmarks to a list",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const removeBookmarksFromListTool = {
    name: "remove-bookmarks-from-list",
    description: "Remove bookmarks from a list",
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
            type: "text",
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

// src/tools/tags.ts
init_esm_shims();
init_tags();
function registerTagsTools(server) {
  const getAllTagsTool = {
    name: "get-all-tags",
    description: "Get all tags with pagination",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const createTagTool = {
    name: "create-tag",
    description: "Create a new tag",
    parameters: z.object({
      label: z.string()
    }),
    canAccess: () => true,
    execute: async ({ label }) => {
      const result = await TagsService.createTag({ label });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getTagTool = {
    name: "get-tag-by-id",
    description: "Get a specific tag by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await TagsService.getTag(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateTagTool = {
    name: "update-tag",
    description: "Update an existing tag",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteTagTool = {
    name: "delete-tag",
    description: "Delete a tag by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await TagsService.deleteTag(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarksWithTagTool = {
    name: "get-bookmarks-with-tag",
    description: "Get bookmarks with a specific tag",
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
            type: "text",
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

// src/tools/highlights.ts
init_esm_shims();
init_highlights();
function registerHighlightsTools(server) {
  const getAllHighlightsTool = {
    name: "get-all-highlights",
    description: "Get all highlights with pagination",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const createHighlightTool = {
    name: "create-highlight",
    description: "Create a new highlight",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getHighlightByIdTool = {
    name: "get-highlight-by-id",
    description: "Get a specific highlight by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await HighlightsService.getHighlight(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateHighlightTool = {
    name: "update-highlight",
    description: "Update an existing highlight",
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
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteHighlightTool = {
    name: "delete-highlight",
    description: "Delete a highlight by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await HighlightsService.deleteHighlight(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBookmarksWithHighlightsTool = {
    name: "get-bookmarks-with-highlights",
    description: "Get bookmarks that have highlights",
    parameters: z.object({
      archived: z.boolean().optional(),
      favourited: z.boolean().optional(),
      sortOrder: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ archived, favourited, sortOrder, limit, cursor }) => {
      const result = await HighlightsService.getHighlightBookmarks("placeholder-id", {
        archived,
        favourited,
        sortOrder,
        limit,
        cursor
      });
      return {
        content: [
          {
            type: "text",
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

// src/tools/users.ts
init_esm_shims();

// src/services/users.ts
init_esm_shims();
init_utils();
var UsersService = class {
  /**
   * Get the current authenticated user's profile
   */
  static async getCurrentUser() {
    return await karakeepRequest("GET", "/users/me");
  }
  /**
   * Get a user by ID
   * @param id - User ID
   */
  static async getUser(id) {
    return await karakeepRequest("GET", `/users/${id}`);
  }
  /**
   * Update the current user's profile
   * @param userData - Updated user data
   */
  static async updateCurrentUser(userData) {
    return await karakeepRequest("PUT", "/users/me", userData);
  }
};
function registerUsersTools(server) {
  const getCurrentUserTool = {
    name: "get-current-user",
    description: "Get the currently authenticated user",
    parameters: z.object({}),
    // Empty object schema
    canAccess: () => true,
    execute: async () => {
      const result = await UsersService.getCurrentUser();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getUserTool = {
    name: "get-user",
    description: "Get a user by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await UsersService.getUser(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const updateCurrentUserTool = {
    name: "update-current-user",
    description: "Update the current user's profile",
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
            type: "text",
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

// src/tools/admin.ts
init_esm_shims();

// src/services/admin.ts
init_esm_shims();
init_utils();
var AdminService = class {
  /**
   * Get system statistics (admin only)
   */
  static async getStats() {
    return await karakeepRequest("GET", "/admin/stats");
  }
  /**
   * Get system information (admin only)
   */
  static async getInfo() {
    return await karakeepRequest("GET", "/admin/info");
  }
};
function registerAdminTools(server) {
  const getAdminStatsTool = {
    name: "get-admin-stats",
    description: "Get system stats (admin only)",
    parameters: z.object({}),
    // Empty object schema
    canAccess: () => true,
    // In reality, this should check admin privileges
    execute: async () => {
      const result = await AdminService.getStats();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getAdminInfoTool = {
    name: "get-admin-info",
    description: "Get system info (admin only)",
    parameters: z.object({}),
    // Empty object schema
    canAccess: () => true,
    // In reality, this should check admin privileges
    execute: async () => {
      const result = await AdminService.getInfo();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  server.addTool(getAdminStatsTool);
  server.addTool(getAdminInfoTool);
}

// src/tools/backups.ts
init_esm_shims();

// src/services/backups.ts
init_esm_shims();
init_utils();
var BackupsService = class {
  /**
   * Get all backups for the authenticated user
   * @param params - Query parameters for filtering and pagination
   */
  static async getAllBackups(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.limit !== void 0) queryParams.append("limit", String(params.limit));
    if (params.cursor) queryParams.append("cursor", params.cursor);
    const endpoint = `/backups?${queryParams.toString()}`;
    return await karakeepRequest("GET", endpoint);
  }
  /**
   * Create a new backup
   */
  static async createBackup() {
    return await karakeepRequest("POST", "/backups");
  }
  /**
   * Get a single backup by ID
   * @param id - Backup ID
   */
  static async getBackup(id) {
    return await karakeepRequest("GET", `/backups/${id}`);
  }
  /**
   * Delete a backup by ID
   * @param id - Backup ID
   */
  static async deleteBackup(id) {
    return await karakeepRequest("DELETE", `/backups/${id}`);
  }
  /**
   * Restore from a backup
   * @param id - Backup ID
   */
  static async restoreBackup(id) {
    return await karakeepRequest("POST", `/backups/${id}/restore`);
  }
};
function registerBackupsTools(server) {
  const getAllBackupsTool = {
    name: "get-all-backups",
    description: "Get all backups with pagination",
    parameters: z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional()
    }),
    canAccess: () => true,
    execute: async ({ limit, cursor }) => {
      const result = await BackupsService.getAllBackups({ limit, cursor });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const createBackupTool = {
    name: "create-backup",
    description: "Create a new backup",
    parameters: z.object({}),
    canAccess: () => true,
    execute: async () => {
      const result = await BackupsService.createBackup();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const getBackupByIdTool = {
    name: "get-backup-by-id",
    description: "Get a specific backup by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BackupsService.getBackup(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const deleteBackupTool = {
    name: "delete-backup",
    description: "Delete a backup by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BackupsService.deleteBackup(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  const restoreBackupTool = {
    name: "restore-backup",
    description: "Restore a backup by ID",
    parameters: z.object({
      id: z.string()
    }),
    canAccess: () => true,
    execute: async ({ id }) => {
      const result = await BackupsService.restoreBackup(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  };
  server.addTool(getAllBackupsTool);
  server.addTool(createBackupTool);
  server.addTool(getBackupByIdTool);
  server.addTool(deleteBackupTool);
  server.addTool(restoreBackupTool);
}

// src/tools/index.ts
function registerTools(server) {
  registerBookmarksTools(server);
  registerListsTools(server);
  registerTagsTools(server);
  registerHighlightsTools(server);
  registerUsersTools(server);
  registerAdminTools(server);
  registerBackupsTools(server);
}

// src/index.ts
init_utils();
init_version();
function assertTransportType(transportType) {
  return transportType === "stdio" || transportType === "stream";
}
try {
  validateConfig();
  const transportType = process.argv[2] ?? "stdio";
  if (!assertTransportType(transportType)) {
    throw Error(
      `Invalid transport type: "${transportType}". Allowed: 'stdio' (default) or 'stream'.`
    );
  }
  const server = new FastMCP({
    name: config.server.name,
    version: VERSION
  });
  registerTools(server);
  if (transportType === "stdio") {
    server.start({ transportType });
  } else if (transportType === "stream") {
    server.start({
      transportType: "httpStream",
      httpStream: {
        port: config.server.port,
        host: config.server.host
      }
    });
  }
  log.info(`${config.server.name} started with transport type: ${transportType}`);
} catch (error) {
  log.error(`Failed to run the ${config.server.name}: `, error);
  process.exit(1);
}
process.on("SIGINT", () => {
  log.info("Shutting down server...");
  process.exit(0);
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map