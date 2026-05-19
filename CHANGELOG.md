# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.6] - 2026-05-19
### Added
- Initial release of Karakeep MCP Server
- MCP server for Karakeep API providing bookmark, list, tag, highlight, user, admin, and backup management
- Built with FastMCP and TypeScript
- Supports both STDIO and HTTP Stream transports
- Includes Docker support
- Comprehensive test suite

### Changed
- Forked and adapted from discogs-mcp-server
- Updated all API endpoints to Karakeep
- Changed environment variable from DISCOGS_PERSONAL_ACCESS_TOKEN to KARAKEEP_API_KEY
- Updated documentation and tool descriptions

## [0.0.0] - 2026-05-18
### Added
- Project initialized
