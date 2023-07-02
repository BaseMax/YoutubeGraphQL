import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(
    password: string,
    args: ValidationArguments
  ): boolean | Promise<boolean> {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "password and confirm password doesn't match";
  }
}
