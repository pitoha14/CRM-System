import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("https://easydev.club/api/v1/todos");
        const data = await response.json();
        setTodos(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getTasks();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "inWork") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
  });

  async function addTask() {
    if (!inputValue.trim()) return;

    try {
      const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: inputValue, isDone: false }),
      });
      if (!response.ok) throw new Error("Ошибка сервера");
      const newTask = await response.json();
      setTodos([...todos, newTask]);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleDone(id) {
    const todo = todos[id];
    try {
      await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !todo.isDone }),
      });
      setTodos(
        todos.map((t, index) =>
          index === id ? { ...t, isDone: !t.isDone } : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(id) {
    const todo = todos[id];
    try {
      await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((_, index) => index !== id));
    } catch (error) {
      console.error(error);
    }
  }

  function startEditing(id) {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, isEditing: true, editValue: todo.title } : todo
      )
    );
  }

  function changeEditValue(id, value) {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, editValue: value } : todo
      )
    );
  }

  async function saveTask(id) {
    const todo = todos[id];
    try {
      await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo.editValue }),
      });
      setTodos(
        todos.map((t, index) =>
          index === id ? { ...t, title: todo.editValue, isEditing: false } : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  function cancelEditing(id) {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, isEditing: false } : todo
      )
    );
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>

      <TodoForm
        inputValue={inputValue}
        changeInputValue={(e) => setInputValue(e.target.value)}
        addTask={addTask}
      />

      <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />

      <ul className="todo-list">
        {filteredTodos.map((todo, id) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            id={id}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            startEditing={startEditing}
            changeEditValue={changeEditValue}
            saveTask={saveTask}
            cancelEditing={cancelEditing}
          />
        ))}
      </ul>
    </div>
  );
}