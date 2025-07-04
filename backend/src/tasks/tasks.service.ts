import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create({
      ...createTaskDto,
      tags: createTaskDto.tags || [],
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    });
  }

  async findAll(query: QueryTaskDto): Promise<{ tasks: Task[]; total: number }> {
    const where: WhereOptions<Task> = {};

    
    if (query.completed !== undefined) {
      where.completed = query.completed;
    }

    
    if (query.tags && query.tags.length > 0) {
      where.tags = {
        [Op.overlap]: query.tags,
      };
    }

    
    if (query.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${query.search}%` } },
        { description: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    const { count, rows } = await this.taskModel.findAndCountAll({
      where,
      order: [[query.sortBy, query.sortOrder]],
      limit: query.limit,
      offset: query.offset,
    });

    return {
      tasks: rows,
      total: count,
    };
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    const updateData = {
      ...updateTaskDto,
      dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
    };
    await task.update(updateData);
    return task;
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }

  async getAllTags(): Promise<string[]> {
    const tasks = await this.taskModel.findAll({
      attributes: ['tags'],
    });

    const allTags = new Set<string>();
    tasks.forEach((task) => {
      task.tags.forEach((tag) => allTags.add(tag));
    });

    return Array.from(allTags).sort();
  }
}