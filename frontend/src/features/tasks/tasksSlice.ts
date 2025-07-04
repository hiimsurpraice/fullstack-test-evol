import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tasksAPI } from './tasksAPI';
import { Task, CreateTaskDto, UpdateTaskDto, TasksQuery } from '../../types';

interface TasksState {
  tasks: Task[];
  total: number;
  tags: string[];
  loading: boolean;
  error: string | null;
  filters: TasksQuery;
}


const initialState: TasksState = {
  tasks: [],
  total: 0,
  tags: [],
  loading: false,
  error: null,
  filters: {
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    limit: 50,
    offset: 0,
  },
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState }) => {
    const state = getState() as { tasks: TasksState };
    const response = await tasksAPI.getTasks(state.tasks.filters);
    return response;
  }
);

export const fetchTags = createAsyncThunk(
  'tasks/fetchTags',
  async () => {
    const tags = await tasksAPI.getTags();
    return tags;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: CreateTaskDto) => {
    const task = await tasksAPI.createTask(data);
    return task;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }: { id: number; data: UpdateTaskDto }) => {
    const task = await tasksAPI.updateTask(id, data);
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    await tasksAPI.deleteTask(id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TasksQuery>>) => {
      
      let newFilters = { ...state.filters };
      
      
      Object.keys(action.payload).forEach(key => {
        const value = action.payload[key as keyof TasksQuery];
        
        if (key === 'completed') {
          
          if (value === undefined) {
            
            delete newFilters.completed;
          } else {
            
            newFilters.completed = value as boolean;
          }
        } else if (key === 'search' || key === 'tags') {
          
          if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
            delete newFilters[key as keyof TasksQuery];
          } else {
            (newFilters as any)[key] = value;
          }
        } else {
          
          if (value !== undefined) {
            (newFilters as any)[key] = value;
          }
        }
      });
      
      state.filters = newFilters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.total = action.payload.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create task';
      })
      
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update task';
      })
      
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const { setFilters, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;