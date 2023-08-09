import { lazy } from 'react'

const MyFormRoutes = [
  {
    path: '/myForms/new-dealership',
    component: lazy(() => import('../../views/myForms/NewDealership'))
  },
  {
    path: '/myForms/configuration',
    component: lazy(() => import('../../views/myForms/Configuration'))
  },
  {
    path: '/myForms/new-dealership-user',
    component: lazy(() => import('../../views/myForms/NewDealershipUser'))
  }
]

export default MyFormRoutes