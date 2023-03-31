import React, { useEffect } from 'react';
import { useFilter, useTodoStore } from 'store';
import { TodoList } from 'components/TodoList';
import { BeatLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { toasterConfigOption } from 'utils';

export const Todo = () => {
  const { addTodo, setInputValue, getTodos } = useTodoStore();
  const { inputValue, inputError } = useTodoStore();
  const { filter, setFilter } = useFilter();
  const loading = useTodoStore(state => state.loading);

  useEffect(() => {
    console.log('useEffect');
    getTodos();
  }, [getTodos]);

  const filteredTodos = useTodoStore((state) => {
    switch (filter) {
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      case 'uncompleted':
        return state.todos.filter(todo => !todo.completed);
      default:
        return state.todos;
    }
  });

  const handleAddTodo = (title: string) => {
    addTodo(title);
    toast.success(` Added new todo: ${title}`, toasterConfigOption);
  };

  return (
    <div className='App'>
      <div className='sortBtnContainer'>
        <button
          className='sortBtn'
          disabled={filter === 'all'}
          onClick={() => setFilter('all')}
        >All
        </button>
        <button className='sortBtn' disabled={filter === 'uncompleted'} onClick={() => setFilter('uncompleted')}>Not
          completed
        </button>
        <button
          className='sortBtn'
          disabled={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >Completed
        </button>
      </div>
      <h1>My To-do List</h1>
      <div className='addTodoBox'>
        <input
          className={inputError ? 'error' : ''}
          type='text'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className='add' onClick={() => handleAddTodo(inputValue)}>Add Todo</button>
      </div>
      <span className='required'>{!inputValue ? inputError : null}</span>
      {loading ? <BeatLoader color='#36d7b7' /> : <TodoList filteredTodos={filteredTodos} />}
      <ToastContainer />
    </div>
  );
};