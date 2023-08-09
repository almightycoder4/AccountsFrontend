import { FaBuildingUser } from 'react-icons/fa6'
import { PiUserCircleGearDuotone } from 'react-icons/pi'
import { MdAccountBalanceWallet } from 'react-icons/md'

export default [
  {
    id: "insurers",
    title: "Insurers",
    icon: <FaBuildingUser />,
    children: [
      {
        id: "manageInsurers",
        title: "View / Manage",
        icon: <PiUserCircleGearDuotone />,
        navLink: "/insurers/insurers-manage"
      }
      // {
      //   id: "manageBalance",
      //   title: "Manage Balance",
      //   icon: <MdAccountBalanceWallet />,
      //   navLink: "/insurers/insurers-balance"
      // }
    ]
  }
]
