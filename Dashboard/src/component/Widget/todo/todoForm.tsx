import useTodoStore from "../../../store/todoStore.js";
import { useState } from "react";

const AddToDoForm = () => {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your next task..."
      />
      <button type="submit" className="todo-button todo-button-primary">
        Add
      </button>
    </form>
  );
};

export default AddToDoForm;
