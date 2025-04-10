import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, editTask, cancelEdit }) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (editTask) setTitle(editTask.title);
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({
            title,
            is_done: editTask?.is_done || false,
            created_at: editTask?.created_at || new Date().toISOString(),
        });
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="task-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                }}
            >
                {editTask ? (
                    <>
                        <button className="task-button update" type="submit">
                            Update Task
                        </button>
                        <button
                            className="task-button cancel"
                            type="button"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className="task-button add" type="submit">
                        Add Task
                    </button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;
