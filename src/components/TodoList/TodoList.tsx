import React, { FC } from 'react';
import { ITodo, useTodoStore } from 'store';
import { toast } from 'react-toastify';
import { toasterConfigOption } from 'utils';
import 'react-toastify/dist/ReactToastify.css';

interface IFilters {
  filteredTodos: ITodo[];
}

export const TodoList: FC<IFilters> = ({ filteredTodos }) => {
  const { removeTodo, checkedCompletedTodo, setInputValue } = useTodoStore();
  const { inputValue } = useTodoStore();

  const handleRemoveTodo = (id: number, title: string) => {
    removeTodo(id);
    toast.warning(`Deleted todo: ${title}`, toasterConfigOption);
  };
if(!filteredTodos.length) return <div> 🤷‍♂️Your to-do list is empty, you can add new tasks</div>;
  return (
    <ul>
      {filteredTodos?.map((todo: ITodo) => (
        <div className='todoList' key={todo.id}>
          <li onClick={() => checkedCompletedTodo(todo.id)}>
            <div>
              <input
                type='checkbox'
                checked={todo.completed}
                placeholder='type your new todo'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </span>
            </div>
          </li>
          <button className='delete' onClick={() => handleRemoveTodo(todo.id, todo.title)}>Delete</button>
        </div>

      ))}
    </ul>
  );
};