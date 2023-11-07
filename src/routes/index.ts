import { lazy } from 'react'

const HRDashoard = lazy(() => import('../pages/Dashboard/HR'))
const VendorDashboard = lazy(() => import('../pages/Dashboard/Vendor'))

const coreRoutes = [
  {
    path: '/hr',
    title: 'Admin Dashboard',
    component: HRDashoard
  },
  {
    path: '/vendor',
    title: 'Employee Dashboard',
    component: VendorDashboard
  }
]

const routes = [...coreRoutes]
export default routes
