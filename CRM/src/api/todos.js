const API_URL = "https://easydev.club/api/v1";

export const fetchTodos = async (filter = "all") => {
  const statusMap = { all: "all", inProgress: "inWork", done: "completed" };
  const res = await fetch(`${API_URL}/todos?filter=${statusMap[filter]}`);
  const data = await res.json();
  return data.data || [];
};

export const addTodo = async (title) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return await res.json();
};

export const updateTodo = async (id, updates) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
};