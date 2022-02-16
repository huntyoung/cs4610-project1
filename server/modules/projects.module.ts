import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from "server/controllers/projects.controller";
import { ProjectsService } from "server/providers/services/projects.service";

@Module({
    imports: [[TypeOrmModule.forFeature([Project])]],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [],
})

export class ProjectsModule {}