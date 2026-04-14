import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import useTodoStore from "../../../stores/todoStore";
import type { Todo } from "../../../stores/todoStore";

type TodoItemProps = {
  todo: Todo;
};

const variants = {
  initial: { opacity: 0, y: 50 },
  animation: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo, editTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim() !== "") {
      editTodo(todo.id, newText);
    }

    setIsEditing(!isEditing);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

  return (
    <motion.li
      variants={variants}
      initial="initial"
      animate="animation"
      exit="exit"
      layout
      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 bg-[var(--surface)] border-b border-[var(--border)] group transition-all hover:bg-[var(--accent-soft)]">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 cursor-pointer accent-[var(--accent)]"
      />
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={handleChange}
            autoFocus
            className="w-full bg-transparent border-b border-[var(--accent)] outline-none text-[var(--text-heading)] focus:ring-0"
          />
        ) : (
          <span
            className={`text-lg transition-all duration-300 ${
              todo.completed
                ? "text-[var(--text-muted)] line-through opacity-60"
                : "text-[var(--text-heading)]"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm font-medium rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-heading)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => removeTodo(todo.id)}
          className="px-3 py-1 text-sm font-medium rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
}
