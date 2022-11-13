import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsUserAlreadyExistsRule', async: false })
@Injectable()
export class IsUserAlreadyExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(email: string, _args: ValidationArguments) {
    const user = await this.userService.findOneByEmail(email);
    if (user) return false;
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Email $value already exists. Choose another name.';
  }
}
