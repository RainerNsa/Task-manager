import toast from 'react-hot-toast';

interface ApiError {
  message: string;
  status?: number;
  data?: unknown; // Replace `any` with `unknown`
}

export const handleApiError = (error: unknown) => {
  const apiError = error as ApiError;
  const message = apiError.message || 'An unexpected error occurred';

  toast.error(message, {
    duration: 5000,
    position: 'bottom-right',
  });

  // Log error for debugging
  console.error('API Error:', {
    message: apiError.message,
    status: apiError.status,
    data: apiError.data,
  });

  throw error; // Re-throw for further handling if needed
};