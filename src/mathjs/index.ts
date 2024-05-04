import { createConnection, useContainer } from 'typeorm'
import { Container as typeormContainer } from "typeorm-typedi-extensions";
import { Container } from "typedi";
import { User } from './user'
import { AppMain } from "./main";
import { Validator } from 'class-validator';
import { createDatabase } from './database';

useContainer(typeormContainer)

async function bootstrap() {
  
  const validator = new Validator()
  Container.set(Validator, validator)

  await createDatabase()

  await AppMain()
  console.log('------------then-----------:', 'then')

}



bootstrap()