import React from "react";

export default function TodoFilter({ filter, setFilter, todos }) {
  return (
    <div className="todo-filter">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        Все ({todos.length})
      </button>
      <button
        className={filter === "inProgress" ? "active" : ""}
        onClick={() => setFilter("inProgress")}
      >
        В работе ({todos.filter((t) => !t.isDone).length})
      </button>
      <button
        className={filter === "done" ? "active" : ""}
        onClick={() => setFilter("done")}
      >
        Сделано ({todos.filter((t) => t.isDone).length})
      </button>
    </div>
  );
}
