import { Shield, XSquare, Circle } from "react-feather"
import { AiOutlineFileProtect } from 'react-icons/ai'
import { PiCertificateLight } from 'react-icons/pi'
import { GiUpgrade } from 'react-icons/gi'
import { BsPersonFillExclamation } from 'react-icons/bs'

export default [
  {
    id: "policies",
    title: "Policies",
    icon: <AiOutlineFileProtect />,
    children: [
      {
        id: "insurance",
        title: "Insurance",
        icon: <Shield />,
        navLink: "/business/insurance"
      },
      {
        id: "certificates",
        title: "Certificates",
        icon: <PiCertificateLight />,
        navLink: "/business/certificates"
      },
      {
        id: "cancellation",
        title: "Cancellation",
        icon: <XSquare />,
        children: [
          {
            id: "cancel",
            title: "Cancel Request",
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
        id: "endorsement",
        title: "Endorsement",
        icon: <GiUpgrade />,
        navLink: "/business/endorsement"
      },
      {
        id: "claims",
        title: "Claim",
        icon: <BsPersonFillExclamation />,
        navLink: "/business/claims"
      },
      {
        id: "guidelines",
        title: "Guidelines & FAQ",
        icon: <BsPersonFillExclamation />,
        navLink: "/business/guidelines"
      }
    ]
  }
]
