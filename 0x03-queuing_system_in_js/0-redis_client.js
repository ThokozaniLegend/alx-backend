import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Event: Connection successful
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event: Connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

