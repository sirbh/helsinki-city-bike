import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/layout';
import { AuthContextProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
