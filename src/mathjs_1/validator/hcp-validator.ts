import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Inject, Service } from "typedi";
import { HcpService } from '../services/hcp-service';
  
  @ValidatorConstraint({ async: false })
  @Service()
  export class IsHcpExistConstraint implements ValidatorConstraintInterface {
  
    @Inject()
    private hcpService: HcpService
  
    validate(hcpId: any, args: ValidationArguments) {
      if(!hcpId) return true
      return this.hcpService.hcpIdExist(hcpId)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'IsUserAlreadyExistConstraint defaultMessage'
    }
  }
  
  export function IsHcpExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsHcpExistConstraint,
      });
    };
  }