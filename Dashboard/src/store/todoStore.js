import {create} from 'zustand';

export const useTodoStore = create((set) =>({
    todos: [],
    addTodo: (text) => set((state) =>({todos:[...state.todos , {text , id: Date.now() , completed: false }] }) ),
    removeTodo:(id) => set((state) => ({todos: state.todos.filter((todo) => todo.id) !== id })),
    toggleTodo: (id) => set((state) => ({todos: state.todos.map((todo) => todo.id ===id ? {...todo , completed : !todo.completed} :todo)})),
    editTodo: (id , newTodo) => set((state) => ({todos: state.todos.map((todo) => todo.id === id ? {...todo , todo: newTodo} : todo)}))
}));

