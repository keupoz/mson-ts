import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppLayout, ThemeProvider } from '@repo/ui'
import { Preview } from './preview/Preview'
import { Settings } from './Settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

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
  )
}
