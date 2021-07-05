import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as notesRouter} from './notes'
import {oktaAuth} from './auth'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(notesRouter);

app.listen(4201, () => {
  return console.log('My Node App listening on port 4201');
});
