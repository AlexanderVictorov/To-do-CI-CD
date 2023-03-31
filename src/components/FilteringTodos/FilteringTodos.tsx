import React, { FC } from 'react';

interface FilteringTodosProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilteringTodos: FC<FilteringTodosProps> = ({ filter, setFilter }) => {
  return (
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
  );
};

export default FilteringTodos;
