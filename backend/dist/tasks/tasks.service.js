"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTaskDto) {
        return this.taskModel.create({
            ...createTaskDto,
            tags: createTaskDto.tags || [],
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
        });
    }
    async findAll(query) {
        const where = {};
        if (query.completed !== undefined) {
            where.completed = query.completed;
        }
        if (query.tags && query.tags.length > 0) {
            where.tags = {
                [sequelize_2.Op.overlap]: query.tags,
            };
        }
        if (query.search) {
            where[sequelize_2.Op.or] = [
                { title: { [sequelize_2.Op.iLike]: `%${query.search}%` } },
                { description: { [sequelize_2.Op.iLike]: `%${query.search}%` } },
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
    async findOne(id) {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.findOne(id);
        const updateData = {
            ...updateTaskDto,
            dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
        };
        await task.update(updateData);
        return task;
    }
    async remove(id) {
        const task = await this.findOne(id);
        await task.destroy();
    }
    async getAllTags() {
        const tasks = await this.taskModel.findAll({
            attributes: ['tags'],
        });
        const allTags = new Set();
        tasks.forEach((task) => {
            task.tags.forEach((tag) => allTags.add(tag));
        });
        return Array.from(allTags).sort();
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_entity_1.Task)),
    __metadata("design:paramtypes", [Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map