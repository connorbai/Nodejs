import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { HcoService } from "./hco-service";
  import { Inject, Service } from "typedi";
import { Container } from 'typeorm-typedi-extensions';
import { globalArgsStorage } from './global-args-storage';
import { SOURCE_TYPE } from './enum';
  
  @ValidatorConstraint({ async: false })
  @Service()
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  
    @Inject()
    private hcoService: HcoService
  
    validate(userName: any, args: ValidationArguments) {
      if(!userName) return true
      return this.hcoService.userExist(userName)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'IsUserAlreadyExistConstraint defaultMessage'
  
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    globalArgsStorage.addSource(SOURCE_TYPE.hco)
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }