import { FaUserTie, FaUserCog, FaUsersCog, FaUserFriends } from 'react-icons/fa'
import { FaUsersGear } from 'react-icons/fa6'
import { BsCardList} from 'react-icons/bs'
import {BiSolidUserPlus} from 'react-icons/bi'

export default [
  {
    id: "dealership",
    title: "Dealership",
    icon: <FaUserTie />,
    children: [
      {
        id: "dealership",
        title: "Dealership Table",
        icon: <FaUserCog />,
        navLink: "/dashboard/dealership/main"
      },
      {
        id: "subDealership",
        title: "Sub-Dealership Table",
        icon: <FaUsersCog />,
        navLink: "/dashboard/dealership/sub"
      },
      {
        id: "usersList",
        title: "Users Table",
        icon: <FaUsersGear />,
        navLink: "/dashboard/dealership/users"
      },
      {
        id: "insuranceConfigTable",
        title: "Insurance Configuration Table",
        icon: <BsCardList />,
        navLink: "/dashboard/dealership/insuranceConfigTable"
      },
      {
        id: "certificateConfigTable",
        title: "Certificate Configuration Table",
        icon: <BiSolidUserPlus />,
        navLink: "/dashboard/dealership/create-dealership"
      }
    ]
  }
]
