import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';
import { useAppDispatch } from '../../app/hooks';
import { updateTask, deleteTask, fetchTasks } from '../../features/tasks/tasksSlice';
import { Task } from '../../types';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    try {
      await dispatch(updateTask({ id: task.id, data: { completed: !task.completed } })).unwrap();
      
      dispatch(fetchTasks());
    } catch (error) {
      console.error('No se pudo actualizar el estado de la tarea:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteTask(task.id)).unwrap();
      } catch (error) {
        console.error('No se pudo eliminar la tarea:', error);
        setIsDeleting(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="card">
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'card transition-all duration-200 relative overflow-hidden',
        task.completed && 'bg-gray-50 border-gray-200',
        isDeleting && 'opacity-50 pointer-events-none'
      )}
    >
      {task.completed && (
        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className={clsx(
                'text-lg font-medium',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </h3>
            
            {task.description && (
              <p className={clsx(
                'mt-1 text-gray-600',
                task.completed && 'text-gray-500'
              )}>
                {task.description}
              </p>
            )}
          </div>
          
          <div className="flex items-start space-x-2">
            <button
              onClick={handleToggleComplete}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2',
                task.completed
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              )}
            >
              {task.completed ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Completada
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Marcar completada
                </>
              )}
            </button>
            
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Edit task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:text-red-700 transition-colors"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {task.tags.map((tag) => (
            <span key={tag} className="chip chip-primary">
              {tag}
            </span>
          ))}
          
          {task.dueDate && (
            <span className={clsx(
              'text-sm',
              task.completed ? 'text-gray-400' : 'text-gray-500'
            )}>
              <svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {format(parseISO(task.dueDate), 'MMM dd, yyyy')}
            </span>
          )}
          
          {task.completed && (
            <span className="text-sm text-green-600 font-medium">
              <svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completada
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;