import { Injectable } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class TagsService {
  constructor(private readonly tasksService: TasksService) {}

  async findAll(): Promise<string[]> {
    return this.tasksService.getAllTags();
  }
}