import 'reflect-metadata';
import {createExpressServer, useContainer} from 'routing-controllers';
import {Application} from 'express';
import * as serveStatic from 'serve-static';
import {Container} from 'typedi';
import {PUBLIC_DIRECTORY} from './shared/injectors';
import {existsSync, mkdirSync} from 'fs';

export const PUBLIC_DIRECTORY_PATH = __dirname + '/public';

if (!existsSync(PUBLIC_DIRECTORY_PATH)) {
  mkdirSync(PUBLIC_DIRECTORY_PATH);
}

Container.set(PUBLIC_DIRECTORY, PUBLIC_DIRECTORY_PATH);
useContainer(Container);

const app: Application = createExpressServer({
  controllers: [__dirname + '/controllers/*.js'],
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
});

app.use(serveStatic(PUBLIC_DIRECTORY_PATH));
app.listen(process.env.PORT || 3000);
