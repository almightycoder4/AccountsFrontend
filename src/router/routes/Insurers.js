import { lazy } from "react"

const InsurersRoute = [
  {
    path: "/insurers/insurers-manage",
    component: lazy(() => import("../../views/business/insurers/ManageInsurers"))
  },
  {
    path: "/insurers/insurers-balance",
    component: lazy(() => import("../../views/business/insurers/ManageBalance"))
  }
]

export default InsurersRoute