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

  @Column({ default: RechargeTypeEnum.PROVINCIAL })
  type: RechargeTypeEnum;

  @Column()
  amount: number;

  @Column({ nullable: true })
  reference_text: string;

  @ManyToOne(() => User, (user) => user.recharges, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
