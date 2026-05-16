import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type toDoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
};

const createTodoId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const normalizeTodoText = (text: string) => text.trim().replace(/\s+/g, " ").slice(0, 160);

const useTodoStore = create<toDoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => {
          const normalizedText = normalizeTodoText(text);
          if (!normalizedText) return state;

          return {
            todos: [
              ...state.todos,
              { id: createTodoId(), text: normalizedText, completed: false },
            ],
          };
        }),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: normalizeTodoText(text) } : todo,
          ),
        })),
    }),
    {
      name: "todo-store",
    },
  ),
);

export default useTodoStore;
