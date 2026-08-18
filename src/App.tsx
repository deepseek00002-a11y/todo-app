import { useState } from "react";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const remaining = todos.filter((t) => !t.completed).length;
  const total = todos.length;
  const progress =
    total === 0 ? 0 : Math.round(((total - remaining) / total) * 100);
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-4 border border-gray-200 overflow-hidden">
      {/*Header*/}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold textgray-900">Tasks</h1>
          {total > 0 && (
            <span className="text-sm font-medium text-gray-500">
              {remaining} of {total} left
            </span>
          )}
        </div>
        
      </div>
      {/*Input Task */}
      <div>
        <div>
          <input
            className="border-2"
            type="text"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
      {/*Task List*/}
      <div>
        {todos.length === 0 ? (
          <div>
            <p>No Tasks</p>
          </div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <button onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                {todo.text}
                {todo.completed ? " (Completed)" : "(Not Completed)"}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;