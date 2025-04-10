import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetch("http://laravel-app:8000/api/tasks")
            .then((res) => res.json())
            .then((data) => {
                const merged = [...data.pending, ...data.completed].map(
                    (task) => ({
                        ...task,
                        createdAt: task.created_at,
                        updateAt: task.updated_at,
                        completed: task.is_done,
                    })
                );
                setTasks(merged);
            });
    }, []);

    const addTask = (task) => {
        const method = editTask ? "PUT" : "POST";
        const url = editTask
            ? `http://laravel-app:8000/api/tasks/${editTask.id}`
            : "http://laravel-app:8000/api/tasks";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                if (editTask) {
                    setTasks(tasks.map((t) => (t.id === data.id ? data : t)));
                } else {
                    setTasks([data, ...tasks]);
                }
                setEditTask(null);
            });
    };

    const deleteTask = (id) => {
        fetch(`http://laravel-app:8000/api/tasks/${id}`, {
            method: "DELETE",
        }).then(() => setTasks(tasks.filter((t) => t.id !== id)));
    };

    const toggleComplete = (id) => {
        const updatedTask = tasks.find((task) => task.id === id);
        const newCompletedStatus = !updatedTask.completed;

        fetch(`http://laravel-app:8000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...updatedTask,
                is_done: newCompletedStatus,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id
                            ? { ...task, completed: data.is_done }
                            : task
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    const startEdit = (task) => setEditTask(task);
    const cancelEdit = () => setEditTask(null);

    return (
        <>
            <h1 className="header-title">Task Management</h1>
            <div className="container">
                <TaskForm
                    onSubmit={addTask}
                    editTask={editTask}
                    cancelEdit={cancelEdit}
                />
                <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggleComplete={toggleComplete}
                    onEdit={startEdit}
                />
            </div>
        </>
    );
}

export default App;
