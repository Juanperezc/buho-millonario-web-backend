import { User } from '@/modules/user/user.entity';

export interface AuthUserInterface {
  access_token: string;
  info: User;
}
