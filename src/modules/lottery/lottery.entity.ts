import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LittleAnimal } from '@modules/little-animal/little-animal.entity';
import { Ticket } from '@modules/ticket/ticket.entity';

@Entity()
export class Lottery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  ticketPrice: number;

  @Column({ nullable: true })
  resultDigits: number;

  @Column({ default: 10 })
  reward1Digits: number;

  @Column({ default: 20 })
  reward2Digits: number;

  @Column({ default: 30 })
  reward3Digits: number;

  @Column({ default: 40 })
  reward4Digits: number;

  @Column({ default: 50 })
  reward5Digits: number;

  @ManyToOne(
    () => LittleAnimal,
    (littleAnimal) => littleAnimal.resultLotteries,
    {
      onDelete: 'CASCADE',
    },
  )
  resultLittleAnimal: LittleAnimal;

  @OneToMany(() => Ticket, (ticket) => ticket.lottery)
  tickets: Ticket[];

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ name: 'finish_date', nullable: true })
  finishDate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
