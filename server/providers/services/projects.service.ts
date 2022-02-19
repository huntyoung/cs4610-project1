import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService{
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(UserProject)
        private userProjectRepository: Repository<UserProject>,
        ) {}
        
     findAllProjectsForUser(id: number): Promise<Project[]> {
         return this.projectRepository.find({
             where: { id },
         })
     }

     findProjectById(id: number) {
         return this.projectRepository.findOne(id);
     }

     createProject(project: Project): Promise<Project> {
         return this.projectRepository.save(project);
     }

     addUserToProject(userProject: UserProject) {
         return this.userProjectRepository.save(userProject);
     }

}