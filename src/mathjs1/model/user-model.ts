import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ColumnName } from "../core/decorator";
import { IsHcpExist } from "../validator/hcp-validator";
import { column } from "mathjs";






export class UserModel {

  constructor(obj) {
    Object.assign(this, obj)
  }

  // @IsUserAlreadyExist({ message: 'user is not exist'})
  @IsNotEmpty({ message: 'name should not be empty'})
  @ColumnName({ name: '*YearMonth', column: 0 })
  name: string

  @ColumnName({ name: '*GK', column: 1 })
  username: string;

  @ColumnName({ name: '*GK', column: 1 })
  email: string;
}


