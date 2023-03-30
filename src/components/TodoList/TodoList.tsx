import React from 'react';
import { Todo, useFilter, useTodoStore } from 'store';

export const TodoList = () => {
  const { addTodo, removeTodo, checkedCompletedTodo, setInputValue } = useTodoStore();
  const { inputValue, inputError } = useTodoStore();
  const { filter, setFilter } = useFilter();

  const todos = useTodoStore((state) => {
    switch (filter) {
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      case 'uncompleted':
        return state.todos.filter(todo => !todo.completed);
      default:
        return state.todos;
    }
  });

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
        <button className='add' onClick={() => addTodo(inputValue)}>Add Todo</button>
      </div>
      <span className='required'>{!inputValue ? inputError : null}</span>
      <ul>
        {todos.map((todo: Todo) => (
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
            <button className='delete' onClick={() => removeTodo(todo.id)}>Delete</button>
          </div>

        ))}
      </ul>
    </div>

  );
};