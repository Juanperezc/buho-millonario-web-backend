import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from '@/modules/state/state.entity';
import { Parish } from '@modules/parish/parish.entity';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.municipalities, {
    onDelete: 'CASCADE',
    eager: true,
  })
  state: State;

  @OneToMany(() => Parish, (parish) => parish.municipality, {
    cascade: ['insert', 'update'],
  })
  parishes: Parish[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
