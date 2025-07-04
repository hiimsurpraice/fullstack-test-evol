import { api } from '../../services/api';
import { Task, CreateTaskDto, UpdateTaskDto, TasksQuery, TasksResponse } from '../../types';

export const tasksAPI = {
  async getTasks(query: TasksQuery = {}): Promise<TasksResponse> {
    const params = new URLSearchParams();
    
    if (query.completed !== undefined) {
      params.append('completed', query.completed.toString());
    }
    if (query.tags && query.tags.length > 0) {
      params.append('tags', query.tags.join(','));
    }
    if (query.search) {
      params.append('search', query.search);
    }
    if (query.sortBy) {
      params.append('sortBy', query.sortBy);
    }
    if (query.sortOrder) {
      params.append('sortOrder', query.sortOrder);
    }
    if (query.limit !== undefined) {
      params.append('limit', String(query.limit));
    }
    if (query.offset !== undefined) {
      params.append('offset', String(query.offset));
    }

    const response = await api.get<TasksResponse>(`/tasks?${params.toString()}`);
    return response.data;
  },

  async getTask(id: number): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getTags(): Promise<string[]> {
    const response = await api.get<string[]>('/tags');
    return response.data;
  },
};