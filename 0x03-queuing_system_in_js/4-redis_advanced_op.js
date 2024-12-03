import { createClient, print } from 'redis';

// Create Redis client
const client = createClient();

// Event: Connection successful
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event: Connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Store the hash values using hset
client.hset('HolbertonSchools', 'Portland', 50, print);
client.hset('HolbertonSchools', 'Seattle', 80, print);
client.hset('HolbertonSchools', 'New York', 20, print);
client.hset('HolbertonSchools', 'Bogota', 20, print);
client.hset('HolbertonSchools', 'Cali', 40, print);
client.hset('HolbertonSchools', 'Paris', 2, print);

// Display the hash values using hgetall
client.hgetall('HolbertonSchools', (err, result) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(result); // Logs the entire hash as an object
  }
});

