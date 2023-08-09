import { GiWallet, GiReceiveMoney } from 'react-icons/gi'
import { GrTransaction } from 'react-icons/gr'

export default [
  {
    id: "wallet",
    title: "Wallet",
    icon: <GiWallet />,
    children: [
      {
        id: "transaction",
        title: "Transaction",
        icon: <GrTransaction />,
        navLink: "/business/wallet/transactions"
      },
      {
        id: "top-up",
        title: "Top-Up",
        icon: <GiReceiveMoney />,
        navLink: "/business/wallet/top-up"
      }
    ]
  }
]