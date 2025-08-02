/**
 * ErrorBoundary - Barrel export
 */

// Base ErrorBoundary
export { 
  ErrorBoundary,
  ErrorBoundaryWrapper,
  useErrorHandler,
  withErrorBoundary,
} from './ErrorBoundary';

export type { 
  ErrorBoundaryProps, 
  ErrorBoundaryState, 
  ErrorInfo 
} from './ErrorBoundary';

// Specialized ErrorBoundaries
export { AppErrorBoundary } from './AppErrorBoundary';
export { RouteErrorBoundary } from './RouteErrorBoundary';
export { AsyncErrorBoundary } from './AsyncErrorBoundary';

// Default export
export { ErrorBoundary as default } from './ErrorBoundary';