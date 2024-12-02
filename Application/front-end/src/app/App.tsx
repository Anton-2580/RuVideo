import { AppRouter } from "./routers"
import { QueryProvider } from "./providers"


export default function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}
