import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createTask, updateTask, fetchTasks } from '../../features/tasks/tasksSlice';
import { Task } from '../../types';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(255, 'Title is too long'),
  description: Yup.string(),
  tags: Yup.array().of(Yup.string()),
  dueDate: Yup.date().nullable(),
});

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const { tags: availableTags } = useAppSelector((state) => state.tasks);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      tags: task?.tags || [],
      dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (task) {
          await dispatch(updateTask({ id: task.id, data: values })).unwrap();
        } else {
          await dispatch(createTask(values)).unwrap();
        }
        
        dispatch(fetchTasks());
        onClose();
      } catch (error) {
        console.error('Failed to save task:', error);
        setIsSubmitting(false);
      }
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !formik.values.tags.includes(tagInput.trim())) {
      formik.setFieldValue('tags', [...formik.values.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    formik.setFieldValue(
      'tags',
      formik.values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="label">
          Title *
        </label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps('title')}
          className={clsx('input', formik.touched.title && formik.errors.title && 'border-red-500')}
          placeholder="Ingrese el título de la tarea"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="label">
          Descripción
        </label>
        <textarea
          id="description"
          {...formik.getFieldProps('description')}
          className="input"
          rows={3}
          placeholder="Ingrese la descripción de la tarea"
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="label">
          Fecha de Vencimiento
        </label>
        <input
          id="dueDate"
          type="date"
          {...formik.getFieldProps('dueDate')}
          className="input"
        />
      </div>

      <div>
        <label className="label">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="input flex-1"
            placeholder="Agregar una etiqueta"
            list="available-tags"
          />
          <datalist id="available-tags">
            {availableTags.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddTag}
            className="btn btn-secondary"
          >
            Añadir
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formik.values.tags.map((tag) => (
            <span key={tag} className="chip chip-primary">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : task ? 'Actualizar tarea' : 'Crear tarea'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;