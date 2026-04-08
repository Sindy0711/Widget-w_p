import { useState } from "react";
import type { FormEvent } from "react";
import useTodoStore from "../../../stores/todoStore";

const AddToDoForm = () => {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write your next task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDoForm;
