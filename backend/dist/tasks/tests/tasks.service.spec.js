"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sequelize_1 = require("@nestjs/sequelize");
const tasks_service_1 = require("../tasks.service");
const task_entity_1 = require("../entities/task.entity");
const common_1 = require("@nestjs/common");
const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    tags: ['test'],
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};
const mockTaskModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
};
describe('TasksService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                tasks_service_1.TasksService,
                {
                    provide: (0, sequelize_1.getModelToken)(task_entity_1.Task),
                    useValue: mockTaskModel,
                },
            ],
        }).compile();
        service = module.get(tasks_service_1.TasksService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        it('should create a new task', async () => {
            const createTaskDto = {
                title: 'New Task',
                description: 'New Description',
                tags: ['new'],
            };
            mockTaskModel.create.mockResolvedValue({ ...mockTask, ...createTaskDto });
            const result = await service.create(createTaskDto);
            expect(mockTaskModel.create).toHaveBeenCalledWith({
                ...createTaskDto,
                tags: ['new'],
            });
            expect(result.title).toBe(createTaskDto.title);
        });
    });
    describe('findAll', () => {
        it('should return all tasks with filters', async () => {
            const query = {
                completed: false,
                tags: ['test'],
                search: 'Test',
                sortBy: 'createdAt',
                sortOrder: 'DESC',
                limit: 10,
                offset: 0,
            };
            mockTaskModel.findAndCountAll.mockResolvedValue({
                count: 1,
                rows: [mockTask],
            });
            const result = await service.findAll(query);
            expect(mockTaskModel.findAndCountAll).toHaveBeenCalled();
            expect(result.tasks).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });
    describe('findOne', () => {
        it('should return a task by id', async () => {
            mockTaskModel.findByPk.mockResolvedValue(mockTask);
            const result = await service.findOne(1);
            expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTask);
        });
        it('should throw NotFoundException if task not found', async () => {
            mockTaskModel.findByPk.mockResolvedValue(null);
            await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('update', () => {
        it('should update a task', async () => {
            const updateTaskDto = { title: 'Updated Task' };
            const mockTaskInstance = {
                ...mockTask,
                update: jest.fn().mockResolvedValue({ ...mockTask, ...updateTaskDto }),
            };
            mockTaskModel.findByPk.mockResolvedValue(mockTaskInstance);
            const result = await service.update(1, updateTaskDto);
            expect(mockTaskInstance.update).toHaveBeenCalledWith(updateTaskDto);
            expect(result.title).toBe('Updated Task');
        });
    });
    describe('remove', () => {
        it('should remove a task', async () => {
            const mockTaskInstance = {
                ...mockTask,
                destroy: jest.fn(),
            };
            mockTaskModel.findByPk.mockResolvedValue(mockTaskInstance);
            await service.remove(1);
            expect(mockTaskInstance.destroy).toHaveBeenCalled();
        });
    });
    describe('getAllTags', () => {
        it('should return all unique tags', async () => {
            mockTaskModel.findAll.mockResolvedValue([
                { tags: ['tag1', 'tag2'] },
                { tags: ['tag2', 'tag3'] },
                { tags: ['tag1'] },
            ]);
            const result = await service.getAllTags();
            expect(result).toEqual(['tag1', 'tag2', 'tag3']);
        });
    });
});
//# sourceMappingURL=tasks.service.spec.js.map