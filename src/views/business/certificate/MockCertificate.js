import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Eye, Download, UploadCloud, XCircle, Server } from "react-feather"
import Avatar from "@components/avatar"
import { Link } from 'react-router-dom'
import { mockCertficate } from '@aegisUtils'   

export const renderCertificateList = [...mockCertficate]
const dealerList = {
  dealerships: [
    {
      dealership: {
        id: 26,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "SUB-DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 61,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-06T08:28:32.000Z",
        updated_at: "2023-06-06T08:28:32.000Z"
      }
    },
    {
      dealership: {
        id: 25,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "SUB-DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "ABC",
        state: "Kerala",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 60,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 1,
        created_at: "2023-06-06T08:07:32.000Z",
        updated_at: "2023-06-06T08:07:32.000Z"
      }
    },
    {
      dealership: {
        id: 24,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "SUB-DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Katihar",
        state: "Bihar",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 59,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-06T05:56:37.000Z",
        updated_at: "2023-06-06T05:56:37.000Z"
      }
    },
    {
      dealership: {
        id: 23,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "SUB-DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Bhopal",
        state: "Madhya Pradesh",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 56,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 1,
        created_at: "2023-06-05T09:12:53.000Z",
        updated_at: "2023-06-05T09:12:53.000Z"
      }
    },
    {
      dealership: {
        id: 22,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Patna",
        state: "Uttar Pradesh",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 55,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:12:09.000Z",
        updated_at: "2023-06-05T09:12:09.000Z"
      }
    },
    {
      dealership: {
        id: 21,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "JKL",
        state: "Jharkhand",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 54,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:11:53.000Z",
        updated_at: "2023-06-05T09:11:53.000Z"
      }
    },
    {
      dealership: {
        id: 20,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Bebashore",
        state: "Odisha",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 52,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:07:07.000Z",
        updated_at: "2023-06-05T09:07:07.000Z"
      }
    },
    {
      dealership: {
        id: 19,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Delhi",
        state: "Delhi",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 51,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:06:03.000Z",
        updated_at: "2023-06-05T09:06:03.000Z"
      }
    },
    {
      dealership: {
        id: 18,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Gudgaon",
        state: "Haryana",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 50,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:05:29.000Z",
        updated_at: "2023-06-05T09:05:29.000Z"
      }
    },
    {
      dealership: {
        id: 17,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "XYZ",
        state: "Rajasthan",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 48,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-06-05T09:02:48.000Z",
        updated_at: "2023-06-05T09:02:48.000Z"
      }
    },
    {
      dealership: {
        id: 16,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsaklkl@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 33,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-24T07:17:25.000Z",
        updated_at: "2023-05-24T07:17:25.000Z"
      }
    },
    {
      dealership: {
        id: 15,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "asfafxss@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 31,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-24T07:07:23.000Z",
        updated_at: "2023-05-24T07:07:23.000Z"
      }
    },
    {
      dealership: {
        id: 14,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "asfafs@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 30,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-24T07:00:58.000Z",
        updated_at: "2023-05-24T07:00:58.000Z"
      }
    },
    {
      dealership: {
        id: 13,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afshjva@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-24T06:09:07.000Z",
        updated_at: "2023-05-24T06:09:07.000Z"
      }
    },
    {
      dealership: {
        id: 12,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afshva@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-24T06:07:11.000Z",
        updated_at: "2023-05-24T06:07:11.000Z"
      }
    },
    {
      dealership: {
        id: 11,
        oem_id: 59,
        acpl_team_id: null,
        name: "fasf",
        dealer_type: "SUB-DEALER",
        email: "sadasd@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-19T07:00:01.000Z",
        updated_at: "2023-05-19T07:00:01.000Z"
      }
    },
    {
      dealership: {
        id: 10,
        oem_id: 59,
        acpl_team_id: null,
        name: "oluf",
        dealer_type: "SUB-DEALER",
        email: "oluf@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-16T12:20:53.000Z",
        updated_at: "2023-05-16T12:20:53.000Z"
      }
    },
    {
      dealership: {
        id: 9,
        oem_id: 59,
        acpl_team_id: null,
        name: "Bang",
        dealer_type: "DEALER",
        email: "bang@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-16T12:20:22.000Z",
        updated_at: "2023-05-16T12:20:22.000Z"
      }
    },
    {
      dealership: {
        id: 8,
        oem_id: 59,
        acpl_team_id: null,
        name: "fasf",
        dealer_type: "SUB-DEALER",
        email: "hasf@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-16T12:13:39.000Z",
        updated_at: "2023-05-16T12:13:39.000Z"
      }
    },
    {
      dealership: {
        id: 6,
        oem_id: 59,
        acpl_team_id: null,
        name: "agas",
        dealer_type: "DEALER",
        email: "afsa@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: 1,
        is_deleted: 0,
        created_at: "2023-05-16T12:12:38.000Z",
        updated_at: "2023-05-16T12:12:38.000Z"
      }
    },
    {
      dealership: {
        id: 4,
        oem_id: 59,
        acpl_team_id: null,
        name: "hyhy",
        dealer_type: "SUB-DEALER",
        email: "gkkss@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: 1,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: null,
        is_deleted: 0,
        created_at: "2023-05-16T12:09:38.000Z",
        updated_at: "2023-05-16T12:09:38.000Z"
      }
    },
    {
      dealership: {
        id: 1,
        oem_id: 59,
        acpl_team_id: 2,
        name: "xwz",
        dealer_type: "DEALER",
        email: "gkks@aegis.com",
        mobile: "9778342490",
        city: "Bangalore",
        state: "Karnataka",
        address: "Place some",
        pincode: "112212",
        master_dealership_id: null,
        dealership_wallet_id: 0,
        payout_type: "FULL PAY",
        distributor_id: 3,
        rto_id: null,
        is_deleted: 0,
        created_at: "2023-05-16T12:05:34.000Z",
        updated_at: "2023-05-16T12:05:34.000Z"
      }
    }
  ]
}

export const renderDealerList = dealerList.dealerships.map((item) => {
  return { ...item.dealership }
})

// ! Status of D/S
const statusObj = {
  3: "light-success",
  1: "light-warning",
  0: "light-danger"
}


// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"],
    color = states[stateNum]

    return <Avatar color={color || "primary"} className="mr-1" content={row.cust_name || "John Doe"} initials />
}

export const certificateListColumns = [
  {
    name: "Customer",
    minWidth: "160px",
    selector: "cust_name",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* <Avatar color={colorBasedOnStates[row.state]} className="mr-1" content={row.name || "John Doe"} initials /> */}
        {renderClient(row)}
        <div className="d-flex flex-column">
          <span className="font-weight-bold text-primary">{row.cust_name}</span>
          {/* <small className="text-truncate text-muted mb-0">{row.name === "DEALER" ? "D/S" : "Sub-D/S"}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "Certificate ID",
    minWidth: "140px",
    selector: "certificateId",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.certificateId}</span>
          {/* <small className="text-danger" color="light-info">{row?.mobile}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "State",
    minWidth: "180px",
    selector: "state",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.state}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "City",
    minWidth: "120px",
    selector: "city",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.city}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "RTO",
    minWidth: "100px",
    selector: "rtoId",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.rtoId}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
//   {
//     name: "Status",
//     minWidth: "120px",
//     selector: "status",
//     sortable: true,
//     cell: (row) => (
//       <Badge className="text-capitalize" color={statusObj[row.status || 0]} pill>
//         {row.status === 0 && 'Failed'}
//         {row.status === 1 && 'Processing'}
//         {row.status === 3 && 'Success'}
//       </Badge>
//     )
//   },
  {
    name: "Premium",
    minWidth: "120px",
    selector: "premium",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold text-danger">&#8377;{" "}{row?.premium}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "Date",
    minWidth: "120px",
    selector: "date",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.date}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "Actions",
    minWidth: "60px",
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/business/certificates/${row.id}`}
            className="w-100"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <Eye size={14} className="mr-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
          <DropdownItem
            // tag={Link}
            // to={`/business/certificates/${row.id}`}
            className="w-100"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <Download size={14} className="mr-50" />
            <span className="align-middle">Download</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            //   onClick={() => store.dispatch(deleteUser(row.id))}
          >
            <Server size={14} className="mr-50" />
            <span className="align-middle">Export to Excel</span>
          </DropdownItem>
          <DropdownItem className="w-100">
            <UploadCloud size={14} className="mr-50" />
            <span className="align-middle">Endorsement</span>
          </DropdownItem>
          <DropdownItem className="w-100">
            <XCircle size={14} className="mr-50" />
            <span className="align-middle">Cancellation</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
