import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/shadcn/components/theme-provider';

import { Layout } from './Layout';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout />

        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
