import { ThemeProvider } from 'styled-components'
import Router from './routes/Router'
import GlobalStyles from './styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from './styles/Theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

// if (process.env.NODE_ENV === 'development') {
//   worker.start()
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
