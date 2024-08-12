const net = require('net');

// Define the server address and port
const SERVER_IP = 'your-server-ip'; // Replace with your server's IP address
const PORT = 12345;

// Create a TCP client
const client = new net.Socket();

client.connect(PORT, SERVER_IP, () => {
    console.log('Connected to server');
    client.write('Hello from the remote machine!');
});

// Handle incoming data from the server
client.on('data', (data) => {
    console.log('Received from server:', data.toString());
    // Optional: close the connection after receiving data
    // client.destroy();
});

// Handle connection closure
client.on('close', () => {
    console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
    console.error('Error:', err.message);
});
