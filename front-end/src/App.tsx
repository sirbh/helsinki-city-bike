import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/layout';
import { AuthContextProvider } from './contexts/AuthContext';
import { StationContextProvider } from './contexts/StationContext';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StationContextProvider>
        <AuthContextProvider>
          <Layout />
        </AuthContextProvider>
      </StationContextProvider>
    </QueryClientProvider>
  );
}

export default App;
