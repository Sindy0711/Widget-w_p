import TodoItem from "./todoItem.js";
import useTodoStore from "../../../store/todoStore.js";
import { AnimatePresence } from "framer-motion";

const TodoList = () => {
  const { todos } = useTodoStore();

  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <p>No tasks yet.</p>
        <span>Add your first item to start the day with a clear plan.</span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default TodoList;
