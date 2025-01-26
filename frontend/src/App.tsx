import { ErrorBoundary } from 'react-error-boundary';
import './App.scss';
import AuthProvider from './utils/context/AuthContext';
import { Suspense } from 'react';
import { LoadingScreen } from './components/default-components/loaders/loading-screen/loading-screen';
import React from 'react';
const Routes = React.lazy(() => import('./data/routes'));
function MyFallbackComponent() {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>Failure</pre>
      <button>Try again</button>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={MyFallbackComponent}>
        <Suspense fallback={<LoadingScreen text='Denki Mini Projekt 2' />}>
          <Routes />
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
