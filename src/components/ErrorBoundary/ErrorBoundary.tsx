'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/UI/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined; // Explicitly define `error` as `Error | undefined`
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: undefined }; // Explicitly type the state

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }; // Return the correct state type
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 rounded-lg text-red-700">
            <h2 className="font-bold mb-2">Something went wrong</h2>
            <p className="mb-4">{this.state.error?.message}</p>
            <Button onClick={this.handleRetry}>Try Again</Button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;