export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
  tags?: string[];
  dueDate?: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export interface TasksQuery {
  completed?: boolean;
  tags?: string[];
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'title';
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
}