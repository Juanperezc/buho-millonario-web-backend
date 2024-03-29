import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@modules/user/user.entity';
import { BankAccountEnum } from './enums/bank-account.enum';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: number;

  //bank account type
  @Column({ default: BankAccountEnum.CHECKING })
  account_type: BankAccountEnum;

  @Column()
  bank_name: string;

  @Column()
  dni: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.bank_accounts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
