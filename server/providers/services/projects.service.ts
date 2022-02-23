import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(UserProject)
    private userProjectRepository: Repository<UserProject>,
  ) {}

  async findAllProjectsForUser(userId: number): Promise<Project[]> {
    const userProjects = this.userProjectRepository.find({
      where: { userId },
    });

    const projectIds = [];
    (await userProjects).forEach((project) => projectIds.push(project.projectId));

    return this.projectRepository.findByIds(projectIds);
  }

  findProjectById(id: number) {
    return this.projectRepository.findOne(id);
  }

  createProject(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  addUserToProject(userProject: UserProject) {
    this.userProjectRepository.save(userProject);
  }

  getUserProject(userProject: UserProject) {
    return this.userProjectRepository.findOne({ userId: userProject.userId, projectId: userProject.projectId });
  }

  removeProject(project: Project) {
    this.projectRepository.delete(project);
  }
}
