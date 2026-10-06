import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTaskSchema } from '../schemas/task.schema';
import tasksService from '../services/tasks.service';

export function EditTaskModal({ task, onTaskUpdated, onClose }) {
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
    mode: 'onChange',
    defaultValues: {
        title: task.title,
        description: task.description ?? '',
        completed: task.completed,
    },
  });

  const onSubmit = async (data) => {
    setServerError('');

    try {
      const updatedTask = await tasksService.update(task.id, data);

      onTaskUpdated(updatedTask);
      onClose();
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
        err.message ||
        'No se pudieron guardar los cambios'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-heading"
        className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl"
      >
        <h2
          id="edit-task-heading"
          className="mb-5 text-xl font-bold text-indigo-400"
        >
          Editar tarea
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
                htmlFor="edit-title"
                className="mb-1 block text-sm text-slate-300"
            >
                Título
            </label>

            <input
                id="edit-title"
                type="text"
                autoFocus
                {...register('title')}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'edit-title-error' : undefined}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 p-2 text-white"
            />

            {errors.title && (
            <p
                id="edit-title-error"
                role="alert"
                className="mt-1 text-sm text-rose-400"
            >
                {errors.title.message}
            </p>
            )}
        </div>

        <div className="mb-4">
            <label
            htmlFor="edit-description"
            className="mb-1 block text-sm text-slate-300"
            >
              Descripción
            </label>

            <textarea
              id="edit-description"
              rows={3}
              {...register('description')}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'edit-description-error' : undefined
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-900 p-2 text-white"
            />

            {errors.description && (
              <p
                id="edit-description-error"
                role="alert"
                className="mt-1 text-sm text-rose-400"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="mb-4 flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" {...register('completed')} />
            Tarea completada
          </label>

          {serverError && (
            <p role="alert" className="mb-4 text-sm text-rose-400">
              {serverError}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}