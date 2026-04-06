import { useState, type ChangeEvent } from "react";
import useTodoStore from "../../../store/todoStore.js";
import { motion } from "framer-motion";
import type { Todo } from "../../../store/todoStore.js";

type TodoItemProps = {
  todo: Todo;
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

  const variants = {
    initial: { opacity: 0, y: 50 },
    animation: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  return (
    <motion.li
      variants={variants}
      initial="initial"
      animate="animation"
      exit="exit"
      className={`todo-item ${todo.completed ? "is-completed" : ""}`}
      layout
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />

      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={handleChange}
            className="todo-edit-input"
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>

      <div className="todo-actions">
        <button onClick={handleEdit} className="todo-button todo-button-secondary">
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => removeTodo(todo.id)}
          className="todo-button todo-button-danger"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
}
