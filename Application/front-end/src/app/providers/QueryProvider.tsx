import type { PropsWithChildren } from "react"
import { QueryClientProvider } from "react-query"
import { queryClient } from "@/shared"


export function QueryProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
