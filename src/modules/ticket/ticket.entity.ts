import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LittleAnimal } from '@modules/little-animal/little-animal.entity';
import { Lottery } from '@modules/lottery/lottery.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => LittleAnimal, (littleAnimal) => littleAnimal.tickets)
  littleAnimal: LittleAnimal;

  @ManyToOne(() => Lottery, (lottery) => lottery.tickets)
  lottery: Lottery;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
