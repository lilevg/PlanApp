import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Importance } from '../dto/importance.enum';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'user_id' })
  userId: string;

  @Column({ length: 100, unique: true, name: 'plan_title' })
  plan_title: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ length: 256 })
  description: string;

  @Column({ type: 'enum', enum: Importance })
  importance: Importance;

  @Column({ default: false })
  completed: boolean;
}
