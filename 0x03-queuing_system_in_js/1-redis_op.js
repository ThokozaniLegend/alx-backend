import { createClient, print } from 'redis';

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

// Function to display the value of a given key
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(reply); // Logs the value of the key
    }
  });
}

// Function to set a new key-value pair in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // redis.print logs the result
}

// Call the functions
displaySchoolValue('Holberton'); // Should log "School" if already set
setNewSchool('HolbertonSanFrancisco', '100'); // Sets key "HolbertonSanFrancisco" to "100"
displaySchoolValue('HolbertonSanFrancisco'); // Should log "100"

