import { TasksService } from '../tasks/tasks.service';
export declare class TagsService {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<string[]>;
}
