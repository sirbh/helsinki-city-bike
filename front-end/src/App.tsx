import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/layout';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
