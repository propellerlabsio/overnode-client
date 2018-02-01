
const connection = new WebSocket('ws://localhost:4010/socket');

// When the connection is open, send some data to the server
connection.onopen = () => {
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = (error) => {
  // eslint-disable-next-line
  console.log('WebSocket Error ', error);
};

// Log messages from the server
connection.onmessage = (e) => {
  // eslint-disable-next-line
  console.log('Server: ', e.data);
};
