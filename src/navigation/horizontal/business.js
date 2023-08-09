import { Shield, CheckSquare, Briefcase, LifeBuoy, XSquare, ThumbsUp, List, Circle } from "react-feather"

export default [
  {
    header: "Business"
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: <Shield />,
    navLink: "/business/insurance"
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: <CheckSquare />,
    navLink: "/business/certificates"
  },
  {
    id: "wallet",
    title: "Wallet",
    icon: <Briefcase />,
    children: [
      {
        id: "transaction",
        title: "Transaction",
        icon: <Circle />,
        navLink: "/business/wallet/transactions"
      },
      {
        id: "top-up",
        title: "Top-Up",
        icon: <Circle />,
        navLink: "/business/wallet/top-up"
      }
    ]
  },
  {
    id: "insurer",
    title: "Insurers",
    icon: <LifeBuoy />,
    navLink: "/business/insurers"
  },
  {
    id: "endorse",
    title: "Endorsement",
    icon: <ThumbsUp />,
    navLink: "/business/endorsement"
  },
  {
    id: "cancellation",
    title: "Cancellation",
    icon: <XSquare />,
    children: [
      {
        id: "cancel",
        title: "Cancel",
        icon: <Circle />,
        navLink: "/business/cancellation/cancel"
      },
      {
        id: "refund",
        title: "Refund",
        icon: <Circle />,
        navLink: "/business/cancellation/refund"
      }
    ]
  },
  {
    id: "guidlines",
    title: "Guideline/ FAQ",
    icon: <List />,
    navLink: "/business/guidelines"
  }
]
