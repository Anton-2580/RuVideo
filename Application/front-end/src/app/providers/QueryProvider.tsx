import { ReactNode } from "react"
import { QueryClientProvider } from "react-query"
import { queryClient } from "@/shared"


type Props = {
	children: ReactNode
}

export function QueryProvider({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
