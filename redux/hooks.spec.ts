import { useAppDispatch, useAppSelector } from './hooks';
import { renderHook } from '@testing-library/react-hooks';

const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockUseDispatch,
  useSelector: () => mockUseSelector,
}));

describe('hooks', () => {
  it('should call redux useDispatch', () => {
    const { result } = renderHook(() => useAppDispatch());
    result.current?.(null);
    expect(mockUseDispatch).toHaveBeenCalled();
  });

  it('should call redux useSelector', () => {
    const { result } = renderHook(() => useAppSelector(t => t));
    (result.current as any)?.();
    expect(mockUseSelector).toHaveBeenCalled();
  });
});
