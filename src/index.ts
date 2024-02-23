import express from 'express';
import MemoryDebugger from './debug/MemoryDebugger';
import FileReadStreamFactory from './ImageReadStreamFactory/FileReadStreamFactory';
import ImageProcessRequestValidator from './RequestValidator/ImageProcessRequestValidator';
import ImageConfigProcessor from './ConfigProcessor/ImageConfigProcessor';
import SharpStreamProcessor from './ImageStreamProcessor/SharpStreamProcessor';
import ImageResizeController from './Controllers/ImageResizeController';
import EtagProcessor from './ImageStreamProcessor/EtagProcessor';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * get endpoint with
 * src = path to image
 * width = width of image
 * height = height of image
 * format = format of image
 * quality = quality of image
 */
const imageProcessorController = new ImageResizeController(
  new ImageProcessRequestValidator(),
  new ImageConfigProcessor(),
  new FileReadStreamFactory(),
  new SharpStreamProcessor(),
  new EtagProcessor(),
);
app.get('/image', (req, res) => {
  imageProcessorController.processRequest(req, res);
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
void server;
// process.on('SIGINT', () => {
//   console.log('Gracefully shutting down from SIGINT (Ctrl+C)');
//   server.close(() => {
//     process.exit();
//   });
// });

// debug
const memDebugger = new MemoryDebugger();
memDebugger.start(1000);
