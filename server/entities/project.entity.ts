import { Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';
import { UserProject } from './user_project.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creatorId: number;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
