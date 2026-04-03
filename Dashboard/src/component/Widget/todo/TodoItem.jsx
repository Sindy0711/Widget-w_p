import React from "react";
import { useTodoStore } from "../../../store/TodoStore";
import { motion } from "framer-motion";

export default function TodoItem({ todo }) {
  const { editTodo, toggleTodo, removeTodo } = useTodoStore();

  const variants = {
    initial: { opacity: 0, y: 50 },
    animation: { opacity: 1, y: 0 },
  };
  return (

      <motion.li
        variants={variants}
        initial="initial"
        animate="animation"
        className="todo-item"
        Layout
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="form-checkbox h-5 w-5 text-blue-600 "
        />
        <span
          className={`flex-1  ml-2 ${todo.completed ? "line-through" : ""} `}
        >
          {todo.text}
        </span>
        <button
          onClick={() => removeTodo(todo.id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </motion.li>
  );
}
