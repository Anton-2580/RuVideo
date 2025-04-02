import { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import { Paths } from "@/shared"
import { ContentHeader, Menu } from "@/widgets"
import { Base, HomePage, LoginPage, RegistrationPage, ShortsPage, SubscribesPage, TranslationsPage } from "@/pages"




const router = createBrowserRouter([
	{
		element: <Base Header={() => <ContentHeader />} Wrapper={() => <Suspense><Menu /></Suspense>} />,

		children: [
			{
				path: Paths.HOME,
				element: <Suspense><HomePage /></Suspense>
			},
			{
				path: Paths.SHORTS,
				element: <Suspense><ShortsPage /></Suspense>
			},
			{
				path: Paths.SUBSCRIBES,
				element: <Suspense><SubscribesPage /></Suspense>
			},
			{
				path: Paths.TRANSLATIONS,
				element: <Suspense><TranslationsPage /></Suspense>
			},
		],
	},
	{
		path: Paths.LOGIN,
		element: <Suspense><LoginPage /></Suspense>
	},
	{
		path: Paths.REGISTRATION,
		element: <Suspense><RegistrationPage /></Suspense>
	},
])


export const AppRouter = () => <RouterProvider router={router} />
