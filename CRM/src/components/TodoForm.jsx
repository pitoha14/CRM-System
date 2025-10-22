import React from "react";

export default function TodoForm({ inputValue, changeInputValue, addTask }) {
  return (
    <div className="todo-form">
      <input
        type="text"
        className="todo-input"
        value={inputValue}
        onChange={changeInputValue}
        placeholder="Введите задачу"
      />
      <button className="todo-add-btn" onClick={addTask}>
        Добавить
      </button>
    </div>
  );
}