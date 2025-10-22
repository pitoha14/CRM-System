import React from "react";

export default function TodoItem({
  todo,
  id,
  toggleDone,
  deleteTask,
  startEditing,
  changeEditValue,
  saveTask,
  cancelEditing,
}) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => toggleDone(id)}
      />
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={todo.editValue}
            onChange={(e) => changeEditValue(id, e.target.value)}
          />
          <button className="save-btn" onClick={() => saveTask(id)}>
            Сохранить
          </button>
          <button className="cancel-btn" onClick={() => cancelEditing(id)}>
            Отменить
          </button>
        </>
      ) : (
        <>
          <span className={todo.isDone ? "done" : ""}>{todo.title}</span>
          <button className="edit-btn" onClick={() => startEditing(id)}>
            Редактировать
          </button>
          <button className="delete-btn" onClick={() => deleteTask(id)}>
            Удалить
          </button>
        </>
      )}
    </li>
  );
}