import { UserPlus, User, List } from "react-feather"

export default [
  {
    header: "Create"
  },
  {
    id: "newDealership",
    title: "New Dealership",
    icon: <UserPlus />,
    navLink: "/myForms/new-dealership"
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: <List />,
    navLink: "/myForms/configuration"
  },
  {
    id: "newDealershipUser",
    title: "New User",
    icon: <User />,
    navLink: "/myForms/new-dealership-user"
  }
]
