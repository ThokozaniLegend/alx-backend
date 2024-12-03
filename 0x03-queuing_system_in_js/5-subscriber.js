import { createClient } from 'redis';

// Create Redis client
const client = createClient();

// On successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the "holberton school channel"
client.subscribe('holberton school channel');

// Listen for messages
client.on('message', (channel, message) => {
  console.log(message);

  // If the message is "KILL_SERVER", unsubscribe and quit
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});

