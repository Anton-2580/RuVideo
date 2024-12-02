import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "@/pages"
import { Paths } from "@/shared"


const router = createBrowserRouter([
	{
		path: Paths.HOME,
		element: <HomePage />,
	},
])


export const AppRouter = () => <RouterProvider router={router} />
