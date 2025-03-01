import { render } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

const ErrorComponent = () => {
  throw new Error('Test Error')
}

test('displays fallback UI when error occurs', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  )
  expect(getByText(/something went wrong/i)).toBeInTheDocument()
})