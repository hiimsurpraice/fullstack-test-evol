import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskList from '../TaskList';
import tasksReducer from '../../../features/tasks/tasksSlice';
import { Task } from '../../../types';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Test Task 1',
    description: 'Description 1',
    completed: false,
    tags: ['test'],
    dueDate: '2024-12-31T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Test Task 2',
    description: 'Description 2',
    completed: true,
    tags: ['test', 'completed'],
    dueDate: '2024-12-31T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const renderWithStore = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('TaskList', () => {
  it('renders all tasks', () => {
    renderWithStore(<TaskList tasks={mockTasks} />);
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('renders empty list when no tasks', () => {
    const { container } = renderWithStore(<TaskList tasks={[]} />);
    
    expect(container.firstChild).toHaveClass('space-y-4');
    expect(container.firstChild?.childNodes).toHaveLength(0);
  });
});