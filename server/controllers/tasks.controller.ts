import { Body, Controller, Param, Post } from "@nestjs/common";
import { toNumber } from "lodash";
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { JwtBodyDto } from "server/dto/jwt_body.dto";
import { Task } from "server/entities/task.entity";
import { TasksService } from "server/providers/services/tasks.service";

class TaskPostBody {
    name: string;
    description: string;
    time_estimation: number;
}

@Controller()
export class TasksController{
  constructor(private tasksService: TasksService) {}

  @Post('/projects/:project_id/tasks')
  public async create(@Param('project_id') projectId: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
      let task = new Task();
      task.projectId = <number><unknown>projectId;
      task.description = body.description;
      task.completed = false;
      task.time_estimation = body.time_estimation;
      task.userId = jwtBody.userId;
      task = await this.tasksService.createTask(task);
      return { task };
  }

}