import express from 'express';
import apiRouter from './api/router.js';

const server = express();
const port = 3000;

server.use(express.json());
server.use(apiRouter);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
