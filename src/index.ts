#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { config, validateConfig } from './config.ts';
import { registerTools } from './tools/index.ts';
import { log } from './utils.ts';
import { VERSION } from './version.ts';

type ServerTransportType = 'stdio' | 'stream';

function assertTransportType(transportType: string): transportType is ServerTransportType {
  return transportType === 'stdio' || transportType === 'stream';
}

try {
  validateConfig();

  // Grab the transport type from the command line
  const transportType = process.argv[2] ?? 'stdio';

  // Make sure the transport type is allowed
  if (!assertTransportType(transportType)) {
    throw Error(
      `Invalid transport type: "${transportType}". Allowed: 'stdio' (default) or 'stream'.`,
    );
  }

  const server = new FastMCP({
    name: config.server.name,
    version: VERSION,
  });

  registerTools(server);

  if (transportType === 'stdio') {
    server.start({ transportType });
  } else if (transportType === 'stream') {
    server.start({
      transportType: 'httpStream',
      httpStream: {
        port: config.server.port,
        host: config.server.host,
      },
    });
  }

  log.info(`${config.server.name} started with transport type: ${transportType}`);
} catch (error: unknown) {
  log.error(`Failed to run the ${config.server.name}: `, error);
  process.exit(1);
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  log.info('Shutting down server...');
  process.exit(0);
});
