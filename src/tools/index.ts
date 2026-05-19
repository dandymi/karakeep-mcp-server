import { FastMCP } from 'fastmcp';
import { registerBookmarksTools } from './bookmarks.ts';
import { registerListsTools } from './lists.ts';
import { registerTagsTools } from './tags.ts';
import { registerHighlightsTools } from './highlights.ts';
import { registerUsersTools } from './users.ts';
import { registerAdminTools } from './admin.ts';
import { registerBackupsTools } from './backups.ts';

/**
 * Registers all MCP tools with the server
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP): void {
  registerBookmarksTools(server);
  registerListsTools(server);
  registerTagsTools(server);
  registerHighlightsTools(server);
  registerUsersTools(server);
  registerAdminTools(server);
  registerBackupsTools(server);
}
