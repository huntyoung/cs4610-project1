import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Project, (project) => project.userProjects)
  project: Project;

  @ManyToOne(() => User, (user) => user.userProjects)
  user: User;
}
