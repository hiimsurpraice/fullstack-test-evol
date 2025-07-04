import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    filters,
    loadTasks,
    loadTags,
    updateFilters,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTasks();
    loadTags();
  }, []);

  const handleRetry = () => {
    loadTasks();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Mis Tareas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancelar' : 'Añadir Tarea'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <TaskForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <TaskFilters filters={filters} onFiltersChange={updateFilters} />

      {loading ? (
        <Loading message="Loading tasks..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron tareas. ¡Crea tu primera tarea!</p>
        </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default TasksPage;