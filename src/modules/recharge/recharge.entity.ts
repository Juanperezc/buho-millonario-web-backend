import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@modules/user/user.entity';
import { RechargeTypeEnum } from './enums/recharge-type.enum';

@Entity()
export class Recharge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: RechargeTypeEnum.BANK_ACCOUNT })
  type: RechargeTypeEnum;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.recharges, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
