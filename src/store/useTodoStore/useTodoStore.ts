import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface ITodoStore {
  todos: Todo[];
  inputValue: string;
  inputError: string;
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  checkedCompletedTodo: (id: number) => void;
  setInputValue: (value: string) => void;
}

export const useTodoStore = create<ITodoStore>()(
  devtools(
      (set) => ({
        todos: [
          { id: 1, title: 'Learn React', completed: false },
          { id: 2, title: 'Learn TypeScript', completed: false },
          { id: 3, title: 'Build a todo list app', completed: false },
        ],
        inputValue: '',
        inputError: '',
        setInputValue: (value: string) => set((state) => ({
          ...state,
          inputValue: value,
        })),
        addTodo: (title: string) => set((state) => {
          if (!title) {
            return {
              ...state,
              inputError: 'Please enter a title',
            };
          }
          return {
            todos: [
              ...state.todos,
              { id: Date.now(), title, completed: false },
            ],
            inputValue: '',
            inputError: '',
          };
        }),
        removeTodo: (id: number) => set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
        checkedCompletedTodo: (id: number) => set((state) => ({
          todos: state.todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo),
        })),
      }),
  )
);
