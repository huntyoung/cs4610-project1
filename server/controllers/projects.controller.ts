import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';

class ProjectPostBody {
  name: string;
}

class UserProjectPutBody {
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

  // create project and add project creator to project through user_project table
  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ProjectPostBody) {
    let project = new Project();
    project.name = body.name;
    project.creatorId = jwtBody.userId;
    project = await this.projectsService.createProject(project);

    const userProject = new UserProject();
    userProject.userId = jwtBody.userId;
    userProject.projectId = project.id;
    this.projectsService.addUserToProject(userProject);

    return { project };
  }

  // add user to project
  @Put('/projects')
  public async add(@Body() body: UserProjectPutBody) {
    // use UserProject table
    const userProject = new UserProject();
    userProject.userId = body.userId;
    userProject.projectId = body.projectId;
    if ((await this.projectsService.getUserProject(userProject)) !== undefined) {
      return false;
    } else {
      await this.projectsService.addUserToProject(userProject);
      return true;
    }
  }

  @Delete('/projects/:id')
  public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.creatorId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }
    this.projectsService.removeProject(project);
    return { success: true };
  }
}
