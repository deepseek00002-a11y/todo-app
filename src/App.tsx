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
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const remaining = todos.filter((todo) => !todo.completed).length;
  const total = todos.length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
            {total > 0 && (
              <span className="text-sm font-medium text-slate-500">
                {remaining} of {total} left
              </span>
            )}
          </div>
        </header>

        <div className="space-y-4 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTodo();
              }}
              placeholder="Add a new task"
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={addTodo}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                No tasks yet.
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(todo.id)}
                    className={`h-5 w-5 rounded-full border-2 transition ${
                      todo.completed
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-slate-400 bg-white"
                    }`}
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {todo.completed ? "✓" : ""}
                  </button>

                  <span
                    className={`flex-1 text-sm ${
                      todo.completed ? "text-slate-400 line-through" : "text-slate-700"
                    }`}
                  >
                    {todo.text}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;