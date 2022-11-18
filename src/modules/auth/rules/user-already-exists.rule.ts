import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '@/modules/user/user.service';

@ValidatorConstraint({ name: 'IsUserAlreadyExistsRule', async: false })
@Injectable()
export class IsUserAlreadyExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) return false;
    return true;
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Email $value already exists. Choose another name.';
  }
}
