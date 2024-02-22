import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Gracefully shutting down from SIGINT (Ctrl+C)');
  server.close(() => {
    process.exit();
  });
});
