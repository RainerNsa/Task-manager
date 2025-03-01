import { render, screen, fireEvent } from '@testing-library/react'
import FilterSortBar from './FilterSortBar'
import { useTaskStore } from '@/store/taskStore'

test('updates search term on input change', () => {
  const mockSetSearch = jest.fn()
  useTaskStore.mockImplementation(() => ({ setSearchTerm: mockSetSearch }))
  
  render(<FilterSortBar />)
  
  fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } })
  expect(mockSetSearch).toHaveBeenCalledWith('test')
})