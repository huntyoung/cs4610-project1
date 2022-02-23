

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  completed: boolean;

  @Column({ nullable: false })
  timeEstimation: number;

  @Column()
  userId: number;
  
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}