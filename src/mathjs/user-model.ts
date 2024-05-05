import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { IsUserAlreadyExist } from "./hco-validator";






export class UserModel {

  constructor(obj) {
    Object.assign(this, obj)
  }

  @IsUserAlreadyExist({ message: 'user is not exist'})
  @IsNotEmpty({ message: 'name should not be empty'})
  name: string

  // @IsString()
  username: string;

  // @IsEmail()
  email: string;

  password: string;
}