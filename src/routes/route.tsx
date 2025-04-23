import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const CountryList = lazy(() => import('../pages/CountryList'))
const CountryDetails = lazy(() => import('../pages/CountryDetails'))

// Root route minimal
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  )
})

// Route definitions
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CountryList,
})

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'details/$id',
  component: CountryDetails,
})

// Router setup
const routeTree = rootRoute.addChildren([indexRoute, detailsRoute])
export const router = createRouter({ routeTree })

// Type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}