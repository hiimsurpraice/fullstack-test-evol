import { Model } from 'sequelize-typescript';
export declare class Task extends Model<Task> {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    tags: string[];
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
