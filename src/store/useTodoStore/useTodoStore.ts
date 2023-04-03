import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { $api } from 'services';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoStore {
  todos: ITodo[];
  inputValue: string;
  inputError: string;
  loading: boolean;
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  checkedCompletedTodo: (id: number) => void;
  setInputValue: (value: string) => void;
  getTodos: () => Promise<void>;
}

export const useTodoStore = create<ITodoStore>()(
  devtools(
    (set) => ({
      todos: [],
      inputValue: '',
      inputError: '',
      loading: false,
      setInputValue: (value: string) =>
        set((state) => ({
          ...state,
          inputValue: value,
        })),
      addTodo: async (title: string) => {
        if (!title) {
          set((state) => ({
            ...state,
            inputError: 'Todo name cannot be empty',
          }));
          return;
        }
        set((state) => ({...state, loading: true}));
        const response = await $api.post('todos', { title, completed: false });
        const todo = response.data;
        set((state) => ({
          ...state,
          todos: [...state.todos, todo],
          inputValue: '',
          inputError: '',
        }));
        set((state) => ({...state, loading: false}));
      },
      removeTodo: async (id: number) => {
        set((state) => ({...state, loading: true}));
        set((state) => ({
          ...state,
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
        await $api.delete(`todos/${id}`);

        set((state) => ({...state, loading: false}));
      },
      checkedCompletedTodo: async (id: number) => {
        set((state) => ({
          ...state,
          loading: true,
          todos: state.todos.map((todo) => {
            if (todo?.id === id) {
              const updatedTodo = { ...todo, completed: !todo.completed };
              $api.put(`todos/${id}`, updatedTodo);
              return updatedTodo;
            }
            return todo || {};
          }),
        }));
        set((state) => ({ ...state, loading: false }));
      },
      getTodos: async () => {
        try {
          set((state) => ({...state, loading: true}));
          const response = await $api.get('todos');
          const todos = response.data;
          set((state) => ({
            ...state,
            todos,
          }));
          set((state) => ({...state, loading: false}));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ),
);
