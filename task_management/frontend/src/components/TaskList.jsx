import { Pencil, X, Check } from "lucide-react";

function TaskList({ tasks, onEdit, onToggleComplete, onDelete }) {
    const ongoing = tasks
        .filter((t) => !t.completed)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const completed = tasks
        .filter((t) => t.completed)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const renderTask = (task) => (
        <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
        >
            <div className="task-header">
                <div className="task-title-left">
                    <span>{task.title}</span>
                    <Pencil
                        className="edit-icon"
                        onClick={() => onEdit(task)}
                    />
                </div>
                <div className="task-title-right">
                    <Check
                        className="check-icon"
                        onClick={() => onToggleComplete(task.id)}
                    />
                    <X className="x-icon" onClick={() => onDelete(task.id)} />
                </div>
            </div>
            <div className="task-date">
                <p>Created: {new Date(task.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(task.updated_at).toLocaleString()}</p>
            </div>
        </div>
    );
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Ongoing Task</h2>
            {ongoing.length ? (
                ongoing.map(renderTask)
            ) : (
                <p className="text-sm mb-4">No ongoing task</p>
            )}

            <h2 className="text-lg font-semibold mt-6 mb-2">Completed Task</h2>
            {completed.length ? (
                completed.map(renderTask)
            ) : (
                <p className="text-sm">No completed task</p>
            )}
        </div>
    );
}

export default TaskList;
