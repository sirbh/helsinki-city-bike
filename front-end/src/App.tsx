import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/layout';
import { AuthContextProvider } from './contexts/AuthContext';
import { StationContextProvider } from './contexts/StationContext';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <StationContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </AuthContextProvider>
    </StationContextProvider>
  );
}

export default App;
