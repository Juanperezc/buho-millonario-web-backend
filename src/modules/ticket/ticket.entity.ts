import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LittleAnimal } from '@modules/little-animal/little-animal.entity';
import { Lottery } from '@modules/lottery/lottery.entity';
import { User } from '@modules/user/user.entity';
import { WinnerTicket } from '@modules/winner-ticket/winner-ticket.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => LittleAnimal, (littleAnimal) => littleAnimal.tickets, {
    onDelete: 'CASCADE',
  })
  littleAnimal: LittleAnimal;

  @ManyToOne(() => Lottery, (lottery) => lottery.tickets, {
    onDelete: 'CASCADE',
    eager: true,
  })
  lottery: Lottery;

  @OneToMany(() => WinnerTicket, (winnerTicket) => winnerTicket.ticket)
  winnerTickets: WinnerTicket[];

  @Column({ default: true })
  visibility: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
