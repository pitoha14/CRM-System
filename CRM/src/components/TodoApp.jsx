import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import * as api from "../api/todos";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await api.fetchTodos(filter);
      setTodos(data);
    } catch {
      setError("Не удалось загрузить задачи с сервера");
    }
    setLoading(false);
  };

  useEffect(() => { loadTodos(); }, [filter]);

  const handleAdd = async (title) => {
    try {
      const newTodo = await api.addTodo(title);
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      setError("Не удалось добавить задачу");
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = await api.updateTodo(todo.id, { title: todo.title, isDone: !todo.isDone });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch {
      setError("Не удалось обновить задачу");
    }
  };

  const handleEdit = async (id, title) => {
    try {
      const updated = await api.updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("Не удалось редактировать задачу");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Не удалось удалить задачу");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="todo-app">
      {error && <div className="error">{error}</div>}
      <TodoInput onAdd={handleAdd} />
      <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}