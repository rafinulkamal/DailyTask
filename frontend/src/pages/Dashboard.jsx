import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header>
        <h1>DailyTask</h1>
        <div>
          <span>Hi, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}