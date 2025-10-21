import React, { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed.length < 2 || trimmed.length > 64) {
      setError("Название задачи должно быть от 2 до 64 символов");
      return;
    }
    setError("");
    onEdit(todo.id, trimmed);
    setEditing(false);
  };

  const handleCancel = () => {
    setText(todo.title);
    setError("");
    setEditing(false);
  };

  return (
    <li className="todo-item" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => onToggle(todo)}
      />

      {editing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={handleCancel}>❌</button>
          {error && <div className="error">{error}</div>}
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
            {todo.title}
          </span>
          <button onClick={() => { setEditing(true); setText(todo.title); }}>✏️</button>
          <button onClick={() => onDelete(todo.id)}>🗑️</button>
        </>
      )}
    </li>
  );
}
