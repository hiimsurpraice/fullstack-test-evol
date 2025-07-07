import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: typeof Task);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(query: QueryTaskDto): Promise<{
        tasks: Task[];
        total: number;
    }>;
    findOne(id: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
    getAllTags(): Promise<string[]>;
}
