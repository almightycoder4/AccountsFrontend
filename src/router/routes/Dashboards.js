import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/dashboard/dealership/main',
    component: lazy(() => import('../../views/dashboard/dealership/Dealership')),
    exact: true
  },
  {
    path: '/dashboard/dealership/sub',
    component: lazy(() => import('../../views/dashboard/dealership/SubDealership')),
    exact: true
  },
  {
    path: '/dashboard/dealership/create-dealership',
    component: lazy(() => import('../../views/myForms/NewDealership')),
    exact: true
  },
  
  {
    path: '/dashboard/dealership/users',
    component: lazy(() => import('../../views/dashboard/users')),
    exact: true
  },
  {
    path: '/dashboard/dealership/insuranceConfigTable',
    component: lazy(() => import('../../views/dashboard/insuranceConfigTable/insuranceConfigTable')),
    exact: true
  },
  {
    path: '/dashboard/dealership/add-user',
    component: lazy(() => import('../../views/myForms/NewDealershipUser')),
    exact: true
  },
  {
    path: '/dashboard/dealership/main/:id',
    component: lazy(() => import('../../views/dashboard/dealership/SingleDealerShip'))
  }
]

export default DashboardRoutes
