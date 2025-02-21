import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { HcoService } from "../services/hco-service";
  import { Inject, Service } from "typedi";
  
  @ValidatorConstraint({ async: false })
  @Service()
  export class IsHcoExistConstraint implements ValidatorConstraintInterface {
  
    @Inject()
    private hcoService: HcoService
  
    validate(hcoId: any, args: ValidationArguments) {
      if(!hcoId) return true
      return this.hcoService.hcoIdExist(hcoId)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'IsUserAlreadyExistConstraint defaultMessage'
    }
  }
  
  export function IsHcoExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsHcoExistConstraint,
      });
    };
  }