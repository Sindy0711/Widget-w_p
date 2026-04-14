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
      <div className="mt-6 flex max-w-md gap-x-4">
        <input
          className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write your next task..."
        />
        <button className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500  " type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddToDoForm;
