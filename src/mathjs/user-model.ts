import { IsEmail, IsString } from "class-validator";

export class UserModel {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}