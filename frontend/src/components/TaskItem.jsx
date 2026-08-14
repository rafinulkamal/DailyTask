export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <div>
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
          <span className={`priority ${task.priority}`}>{task.priority}</span>
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </div>
  );
}
