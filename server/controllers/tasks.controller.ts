import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Console } from "console";
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { JwtBodyDto } from "server/dto/jwt_body.dto";
import { Task } from "server/entities/task.entity";
import { TasksService } from "server/providers/services/tasks.service";

class TaskPostBody {
    name: string;
    description: string;
    time_estimation: string;
}

@Controller()
export class TasksController{
  constructor(private tasksService: TasksService) {}

  @Post('/projects/:project_id/tasks')
  public async create(@Param('project_id') projectId: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
      let task = new Task();
      task.title = body.name;
      task.projectId = parseInt(projectId);
      task.description = body.description;
      task.completed = false;
      task.timeEstimation = parseInt(body.time_estimation);
      task.userId = jwtBody.userId;
      task = await this.tasksService.createTask(task);
      return { task };
  }

  @Get('/projects/:project_id/tasks')
  public async getTasks(@Param('project_id') projectId: string, @JwtBody() JwtBody: JwtBodyDto) {
      const tasks = await this.tasksService.findAllTasks(<number><unknown>projectId);
      return { tasks };
  }

  @Get('/projects/:project_id/tasks/:task_id')
  public async getTask(@Param('project_id') projectId: string, @Param('task_id') taskId: string, @JwtBody() JwtBody: JwtBodyDto) {
      const task = await this.tasksService.findTaskByID(<number><unknown>taskId);
      return { task }
  }

  @Patch('/projects/:project_id/tasks/:task_id')
  public async markComplete(@Param('task_id') taskId: string, @JwtBody() JwtBody: JwtBodyDto) {
      this.tasksService.updateCompleted(<number><unknown>taskId);
  }

  @Patch('/projects/:project_id/tasks/:task_id/:id/')
  public async assignToUser(@Param('task_id') taskId: string, @JwtBody() JwtBody: JwtBodyDto) {
      this.tasksService.assignUser(<number><unknown>taskId, JwtBody.userId);
  }

}