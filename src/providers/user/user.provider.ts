import { DATA_SOURCE, USER_REPOSITORY } from '@/common/constants/providers';
import { User } from '@modules/user/user.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
