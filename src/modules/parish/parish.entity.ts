import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Municipality } from '@modules/municipality/municipality.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class Parish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Municipality, (municipality) => municipality.parishes, {
    onDelete: 'CASCADE',
    eager: true,
  })
  municipality: Municipality;

  @OneToMany(() => User, (user) => user.parish)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
