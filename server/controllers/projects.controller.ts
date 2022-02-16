import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { ProjectsService } from 'server/providers/services/projects.service';

class ProjectPostBody {
    title: string;
}

class UserProjectPostBody {
    userId: number;
    projectId: number;
}

@Controller()
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Get('/projects')
    public async index(@JwtBody() jwtBody: JwtBodyDto) {
        const projects = await this.projectsService.findAllProjectsForUser(jwtBody.userId);
        return { projects };
    }

    @Get('/projects/:id')
    public async getNote(@JwtBody() jwtBody: JwtBodyDto, @Param('id') id: string) {
        const project = await this.projectsService.findProjectById(parseInt(id));
        return { project };
    }

    @Post('/projects')
    public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ProjectPostBody) {
        let project = new Project();
        project.title = body.title;
        project.userId = jwtBody.userId;
        project = await this.projectsService.createProject(project);
        return { project };
    }

    // add user to project
    @Post('/projects/:userId')
    public async add(@JwtBody() jwtBody: JwtBodyDto, @Body() body: UserProjectPostBody) {
        // use UserProject table
        let userProject = new UserProject();
        userProject.userId = body.userId;
        userProject.projectId = body.projectId;
        userProject = await this.projectsService.createProject(userProject);
        return { userProject };
    }
}