import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lottery } from '@modules/lottery/lottery.entity';
import { Ticket } from '@modules/ticket/ticket.entity';

@Entity()
export class LittleAnimal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Lottery, (lottery) => lottery.resultLittleAnimal)
  resultLotteries: Lottery[];

  @OneToMany(() => Ticket, (ticket) => ticket.littleAnimal)
  tickets: Ticket[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
