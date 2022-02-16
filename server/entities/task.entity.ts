

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Project, (project) => project.id)
  projectId: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  completed: boolean;

  @Column({ nullable: false })
  time_estimation: number;

  @ManyToOne(() => Project, (project => project.tasks))
  project: Project;

  @Column()
  userId: number;

}