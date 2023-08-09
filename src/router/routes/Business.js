import { lazy } from "react"

const PoliciesRoute = [
  {
    path: "/business/insurance/:id",
    component: lazy(() => import("../../views/business/insurance/SinglePolicy"))
  },
  {
    path: "/business/certificates/:id",
    component: lazy(() => import("../../views/business/certificate/SingleCertificate"))
  },
  {
    path: "/business/wallet/transactions",
    component: lazy(() => import("../../views/business/wallet/transaction"))
  },
  {
    path: "/business/wallet/top-up",
    component: lazy(() => import("../../views/business/wallet/topup"))
  },
  {
    path: "/business/insurance",
    component: lazy(() => import("../../views/business/insurance"))
  },
  {
    path: "/business/certificates",
    component: lazy(() => import("../../views/business/certificate"))
  },
  {
    path: "/business/endorsement",
    component: lazy(() => import("../../views/business/endorsement"))
  },
  // {
  //   path: "/business/cancellation",
  //   component: lazy(() => import("../../views/business/cancellation"))
  // },
  {
    path: "/business/cancellation/cancel",
    component: lazy(() => import("../../views/business/cancellation/CancelRequests"))
  },
  {
    path: "/business/cancellation/refund",
    component: lazy(() => import("../../views/business/cancellation/refund"))
  },
  {
    path: "/business/insurers",
    component: lazy(() => import("../../views/business/insurers"))
  },
  {
    path: "/business/guidelines",
    component: lazy(() => import("../../views/business/guidelines"))
  },
  {
    path: "/business/claims",
    component: lazy(() => import("../../views/business/claim"))
  },
  {
    path: "/business/settings",
    component: lazy(() => import("../../views/business/settings"))
  },
  {
    path: "/dashboard/dealership/configuration",
    component: lazy(() => import('../../views/myForms/Configuration'))
  }
]

export default PoliciesRoute
