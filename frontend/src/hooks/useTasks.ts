import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks, fetchTags, setFilters } from '../features/tasks/tasksSlice';
import { TasksQuery } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, total, tags, loading, error, filters } = useAppSelector(
    (state) => state.tasks
  );

  const loadTasks = useCallback(() => {
    return dispatch(fetchTasks());
  }, [dispatch]);

  const loadTags = useCallback(() => {
    return dispatch(fetchTags());
  }, [dispatch]);

  const updateFilters = useCallback(
  (newFilters: TasksQuery) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchTasks());
  },
  [dispatch]
);

  const resetFilters = useCallback(() => {
    const defaultFilters: TasksQuery = {
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      limit: 50,
      offset: 0,
    };
    dispatch(setFilters(defaultFilters));
    dispatch(fetchTasks());
  }, [dispatch]);

  return {
    tasks,
    total,
    tags,
    loading,
    error,
    filters,
    loadTasks,
    loadTags,
    updateFilters,
    resetFilters,
  };
};