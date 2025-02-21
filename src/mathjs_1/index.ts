import 'reflect-metadata';
import { Validator,  } from 'class-validator';
import { Container } from "typedi";
import { useContainer as typeormUseContainer } from 'typeorm';
import { Container as typeormContainer } from "typeorm-typedi-extensions";
import { useContainer as validatorUseContainer } from "class-validator";
import { createDatabase } from './core/database';
import { AppMain } from "./core/main";
import { factoryCreate } from './core/csv-container';
import { Test1 } from './model/td-model';
import { HcpService } from './services/hcp-service';

// do this somewhere in the global application level:
validatorUseContainer(Container, { fallbackOnErrors: true });
typeormUseContainer(typeormContainer)
Container.set(Validator, new Validator());


async function bootstrap() {
  await createDatabase()

  const app = factoryCreate(AppMain)

  // app.setFile

  app.setModel(Test1)

  app.addDataSource(HcpService)

  await app.execute()

}



bootstrap()