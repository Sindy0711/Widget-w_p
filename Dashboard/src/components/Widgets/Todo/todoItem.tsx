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
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <div>
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={handleChange}
          />
        ) : todo.completed ? (
          <s>{todo.text}</s>
        ) : (
          <span>{todo.text}</span>
        )}
      </div>

      <div>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={() => removeTodo(todo.id)}>Delete</button>
      </div>
    </motion.li>
  );
}
