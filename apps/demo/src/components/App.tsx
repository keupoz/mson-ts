import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppLayout, ThemeProvider } from '@repo/ui';
import { Settings } from './Settings';
import { Preview } from './preview/Preview';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppLayout
          appName="Mson Viewer"
          settingsSlot={<Settings />}
          previewSlot={<Preview />}
        />

        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
