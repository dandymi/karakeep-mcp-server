# Available Tools

This MCP server exposes the following tools for interacting with the Karakeep API:

## Bookmarks (23 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-all-bookmarks` | Retrieve all bookmarks with pagination and filtering options |
| `create-bookmark` | Create a new bookmark |
| `get-bookmark-by-id` | Get a specific bookmark by its ID |
| `update-bookmark` | Update an existing bookmark |
| `delete-bookmark` | Delete a bookmark |
| `search-bookmarks` | Search bookmarks by query |
| `get-bookmark-assets` | Get assets associated with a bookmark |
| `add-bookmark-asset` | Add an asset to a bookmark |
| `remove-bookmark-asset` | Remove an asset from a bookmark |
| `get-bookmark-summary` | Get the AI-generated summary of a bookmark |
| `regenerate-bookmark-summary` | Regenerate the AI summary of a bookmark |
| `get-bookmark-highlights` | Get highlights for a bookmark |
| `add-bookmark-highlight` | Add a highlight to a bookmark |
| `update-bookmark-highlight` | Update an existing highlight |
| `delete-bookmark-highlight` | Delete a highlight |
| `get-bookmark-tags` | Get tags associated with a bookmark |
| `add-bookmark-tag` | Add a tag to a bookmark |
| `remove-bookmark-tag` | Remove a tag from a bookmark |
| `get-bookmark-notes` | Get notes for a bookmark |
| `add-bookmark-note` | Add a note to a bookmark |
| `update-bookmark-note` | Update a bookmark note |
| `delete-bookmark-note` | Delete a bookmark note |

## Lists (9 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-all-lists` | Retrieve all lists |
| `create-list` | Create a new list |
| `get-list-by-id` | Get a specific list by its ID |
| `update-list` | Update an existing list |
| `delete-list` | Delete a list |
| `get-list-bookmarks` | Get bookmarks in a specific list |
| `add-bookmarks-to-list` | Add bookmarks to a list |
| `remove-bookmarks-from-list` | Remove bookmarks from a list |
| `get-list-stats` | Get statistics for a list |

## Tags (6 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-all-tags` | Retrieve all tags |
| `create-tag` | Create a new tag |
| `get-tag-by-id` | Get a specific tag by its ID |
| `update-tag` | Update an existing tag |
| `delete-tag` | Delete a tag |
| `get-bookmarks-with-tag` | Get all bookmarks associated with a specific tag |

## Highlights (6 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-all-highlights` | Retrieve all highlights |
| `create-highlight` | Create a new highlight |
| `get-highlight-by-id` | Get a specific highlight by its ID |
| `update-highlight` | Update an existing highlight |
| `delete-highlight` | Delete a highlight |
| `get-bookmarks-with-highlights` | Get all bookmarks that have highlights |

## Users (3 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-current-user` | Get the currently authenticated user's information |
| `get-user` | Get a specific user's information by ID |
| `update-current-user` | Update the current user's profile information |

## Admin (2 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-admin-stats` | Get administrative statistics about the Karakeep instance |
| `get-admin-info` | Get system information and configuration |

## Backups (5 tools)

| Tool Name | Description |
|-----------|-------------|
| `get-all-backups` | Retrieve all backups |
| `create-backup` | Create a new backup |
| `get-backup-by-id` | Get a specific backup by its ID |
| `delete-backup` | Delete a backup |
| `restore-backup` | Restore from a backup |

## Common Parameters

Several tools accept common parameters:

- `limit`: Number of items to return (default: 10, max: 100)
- `cursor`: Pagination cursor for retrieving next/previous pages
- `sortBy`: Field to sort results by (e.g., `createdAt`, `updatedAt`, `title`)
- `sortOrder`: Sort order (`asc` or `desc`, default: `desc`)
- `filters`: Object containing filter criteria specific to each tool type

## Error Responses

All tools return standardized error responses:
- `ValidationError`: Invalid input parameters
- `AuthenticationError`: Missing or invalid API key
- `ResourceNotFoundError`: Requested resource doesn't exist
- `RateLimitError`: API rate limit exceeded
- `ServerError`: Internal server error

## Authentication

All tools require authentication via the `KARAKEEP_API_KEY` environment variable containing your Karakeep personal access token.

## Transport Options

This server supports two transport mechanisms:
- **STDIO**: For local MCP clients (default)
- **HTTP Stream**: For remote MCP clients (use `stream` argument)

Examples:
```bash
# STDIO (local agents)
node dist/index.js stdio

# HTTP Stream (remote agents)
node dist/index.js stream
# Available at http://localhost:3001/mcp
```
