import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model<Task> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  completed: boolean;

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  tags: string[];

  @Column({
    type: DataType.DATE,
  })
  dueDate: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}