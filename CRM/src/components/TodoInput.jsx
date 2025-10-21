import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 64) {
      setError("Название задачи должно быть от 2 до 64 символов");
      return;
    }
    setError("");
    onAdd(trimmed);
    setValue("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Название задачи..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}