import 'reflect-metadata';
import { Validator,  } from 'class-validator';
import { Container } from "typedi";
import { useContainer as typeormUseContainer } from 'typeorm';
import { Container as typeormContainer } from "typeorm-typedi-extensions";
import { useContainer as validatorUseContainer } from "class-validator";
import { createDatabase } from './database';
import { AppMain } from "./main";
import { create } from './csv-container';
import { UserModel } from './user-model';
import { HcoService } from './hco-service';

// do this somewhere in the global application level:
validatorUseContainer(Container, { fallbackOnErrors: true });
typeormUseContainer(typeormContainer)
Container.set(Validator, new Validator());


async function bootstrap() {
  await createDatabase()

  const app = create(AppMain)

  app.setModel(UserModel)

  app.addDataSource(HcoService)

  await app.execute()

}



bootstrap()