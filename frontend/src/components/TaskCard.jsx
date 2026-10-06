export function TaskCard({
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition hover:border-slate-500">
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* Tachar el título cuando la tarea está completada. */}
          <h3
            className={`text-lg font-semibold ${
              completed ? 'line-through text-slate-500' : 'text-white'
            }`}
          >
            {title}
          </h3>

          {/* Mostrar el estado de la tarea. */}
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              completed
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>

        {description && (
          <p className="text-slate-400 text-sm">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-700/60">
        <button
          type="button"
          onClick={onToggle}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            completed
              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {completed ? 'Marcar pendiente' : 'Marcar completada'}
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-slate-700 text-white hover:bg-slate-600 transition cursor-pointer"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}