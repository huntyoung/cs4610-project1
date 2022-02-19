import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'lodash';
import { Project } from 'server/entities/project.entity';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

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
}