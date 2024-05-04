import 'reflect-metadata';
import { Validator } from 'class-validator';
import { Container } from "typedi";
import { useContainer } from 'typeorm';
import { Container as typeormContainer } from "typeorm-typedi-extensions";
import { createDatabase } from './database';
import { AppMain } from "./main";

useContainer(typeormContainer)

async function bootstrap() {
  
  // do this somewhere in the global application level:
  // validatorUseContainer(Container);
  const validator = new Validator();
  Container.set(Validator, validator);

  await createDatabase()

  await AppMain()
  console.log('------------then-----------:', 'then')

}



bootstrap()