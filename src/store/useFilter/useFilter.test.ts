import { renderHook, act } from '@testing-library/react-hooks';
import { useFilter } from './useFilter';

describe('useFilter', () => {
  it('should set the filter when setFilter is called', () => {
    const { result } = renderHook(() => useFilter());
    expect(result.current.filter).toEqual('all');

    act(() => {
      result.current.setFilter('completed');
    });

    expect(result.current.filter).toEqual('completed');
    act(() => {
      result.current.setFilter('uncompleted');
    });

    expect(result.current.filter).toEqual('uncompleted');
    act(() => {
      result.current.setFilter('all');
    });

    expect(result.current.filter).toEqual('all');
  });
});
