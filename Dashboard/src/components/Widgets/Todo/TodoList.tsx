import { AnimatePresence } from "framer-motion";
import useTodoStore from "../../../stores/todoStore";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodoStore();

  if (todos.length === 0) {
    return (
      <div>
        <p>No tasks yet.</p>
        <span>Add your first item to start the day with a clear plan.</span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default TodoList;
