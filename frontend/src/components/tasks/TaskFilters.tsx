import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '../../app/hooks';
import { TasksQuery } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

interface TaskFiltersProps {
  filters: TasksQuery;
  onFiltersChange: (filters: TasksQuery) => void;
}

const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const { tags: availableTags } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const trimmedSearch = debouncedSearchTerm.trim();
    const currentSearch = filters.search || '';
    
    if (trimmedSearch !== currentSearch) {
      onFiltersChange({ 
        search: trimmedSearch || undefined 
      });
    }
  }, [debouncedSearchTerm]); 

  const handleStatusChange = (value: string) => {

    const filterUpdate: Partial<TasksQuery> = {};
    
    
    if (value === 'all') {
      
      filterUpdate.completed = undefined;
    } else if (value === 'pending') {
      filterUpdate.completed = false;
    } else if (value === 'completed') {
      filterUpdate.completed = true;
    }
    
    onFiltersChange(filterUpdate);
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-') as [any, any];
    onFiltersChange({ sortBy, sortOrder });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({ tags: newTags.length > 0 ? newTags : undefined });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    
    onFiltersChange({
      completed: undefined,
      tags: undefined,
      search: undefined,
    });
  };

  const currentStatus = filters.completed === undefined ? 'all' : filters.completed ? 'completed' : 'pending';
  const currentSort = `${filters.sortBy}-${filters.sortOrder}`;
  const hasActiveFilters = filters.search || filters.tags?.length || filters.completed !== undefined;

  return (
    <div className="card space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Buscar</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="..."
            className="input"
          />
        </div>

        <div>
          <label className="label">Estado</label>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="input"
          >
            <option value="all">Todas las Tareas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <div>
          <label className="label">Ordenar Por</label>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="input"
          >
            <option value="createdAt-DESC">Más Reciente Primero</option>
            <option value="createdAt-ASC">Más Antiguo Primero</option>
            <option value="dueDate-ASC">Fecha de Vencimiento (Más Cercana)</option>
            <option value="dueDate-DESC">Fecha de Vencimiento (Más Lejana)</option>
            <option value="title-ASC">Título (A-Z)</option>
            <option value="title-DESC">Título (Z-A)</option>
          </select>
        </div>
      </div>

      {availableTags.length > 0 && (
        <div>
          <label className="label mb-2">Filtrar por Etiquetas</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={clsx(
                  'chip cursor-pointer transition-colors',
                  filters.tags?.includes(tag)
                    ? 'chip-primary'
                    : 'chip-secondary hover:bg-gray-200'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;