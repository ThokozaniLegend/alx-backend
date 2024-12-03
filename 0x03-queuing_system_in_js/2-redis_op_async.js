import { createClient, print } from 'redis';
import { promisify } from 'util';

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

// Promisify the get method
const getAsync = promisify(client.get).bind(client);

// Modified displaySchoolValue using async/await
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply); // Logs the value of the key
  } catch (err) {
    console.error(err);
  }
}

// Function to set a new key-value pair in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // redis.print logs the result
}

// Call the functions
displaySchoolValue('Holberton'); // Logs "School" if already set
setNewSchool('HolbertonSanFrancisco', '100'); // Sets "HolbertonSanFrancisco" to "100"
displaySchoolValue('HolbertonSanFrancisco'); // Logs "100"

