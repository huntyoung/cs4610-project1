import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    createTask(task: Task): Promise<Task> {
        return this.taskRepository.save(task);
    }

    findAllTasks(projectId: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { projectId },
        });
    }

    findTaskByID(id: number): Promise<Task> {
        return this.taskRepository.findOne(id);
    }

    async updateCompleted(id: number) {
        let taskToUpdate = await this.taskRepository.findOne(id);
        taskToUpdate.completed = true;
        await this.taskRepository.save(taskToUpdate);
    }

    async assignUser(id: number, userid: number) {
        let taskToupdate = await this.taskRepository.findOne(id);
        taskToupdate.userId = userid;
        await this.taskRepository.save(taskToupdate);
    }
}