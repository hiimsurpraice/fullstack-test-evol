import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    findAll(query: QueryTaskDto): Promise<{
        tasks: import("./entities/task.entity").Task[];
        total: number;
    }>;
    findOne(id: number): Promise<import("./entities/task.entity").Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("./entities/task.entity").Task>;
    remove(id: number): Promise<void>;
}
