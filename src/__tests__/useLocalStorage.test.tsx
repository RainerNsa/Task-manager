import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          store[key] = value.toString();
        }),
        clear: vi.fn(() => {
          store = {};
        }),
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  test('should use initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('should use value from localStorage if it exists', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('storedValue');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  test('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(result.current[0]).toBe('newValue');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
  });

  test('should handle function updates', () => {
    window.localStorage.setItem('testKey', JSON.stringify('oldValue'));
    
    const { result } = renderHook(() => useLocalStorage<string>('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]((prev) => prev + 'Updated');
    });
    
    expect(result.current[0]).toBe('oldValueUpdated');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('oldValueUpdated'));
  });

  test('should handle complex objects', () => {
    const complexObject = { name: 'Test', items: [1, 2, 3], nested: { value: true } };
    
    const { result } = renderHook(() => useLocalStorage('testKey', complexObject));
    
    expect(result.current[0]).toEqual(complexObject);
    
    const updatedObject = { ...complexObject, name: 'Updated' };
    
    act(() => {
      result.current[1](updatedObject);
    });
    
    expect(result.current[0]).toEqual(updatedObject);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(updatedObject));
  });
});