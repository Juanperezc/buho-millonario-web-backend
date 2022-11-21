import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '@/modules/user/user.service';

@ValidatorConstraint({ name: 'IsDniAlreadyExists', async: false })
@Injectable()
export class IsDniAlreadyExists implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    const user = await this.userService.findOneByDni(email);
    if (user) return false;
    return true;
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'La cédula $value ya existe.';
  }
}
