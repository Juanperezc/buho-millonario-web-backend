import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';

export enum WinnerTicketType {
  TYPE_1 = 1,
  TYPE_2 = 2,
  TYPE_3 = 3,
  TYPE_4 = 4,
  TYPE_5 = 5,
}

@Entity()
export class WinnerTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: WinnerTicketType;

  @Column()
  amount: number;

  @Column({ default: false })
  isClaim: boolean;

  @ManyToOne(() => Ticket, (ticket) => ticket.winnerTicket, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
