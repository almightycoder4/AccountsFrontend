import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, FileText, Trash2, Archive, Menu } from "react-feather"
import Avatar from "@components/avatar"
import { Link } from 'react-router-dom'


const dealerList = {
  dealerships: [
    {
      dealership: {
        id: 26,
        oem_id: 59,
        acpl_team_id: null,
        name: "TEZ HEROMOTO",
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
        name: "Sparsh TVS",
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
        name: "Arya Royal",
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
        name: "Nav Suzuki",
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
        name: "Ban Yamaha",
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
        name: "Prt Honda",
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
        name: "Tan HERO",
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
  return {...item.dealership}
})

// ! Status of D/S
const statusObj = {
  0: "light-success",
  1: "light-warning"
}


// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"],
    color = states[stateNum]

    return <Avatar color={color || "primary"} className="mr-1" content={row.name || "John Doe"} initials />
}

export const dealerListColumns = [
  {
    name: "Dealership",
    minWidth: "300px",
    selector: "name",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* <Avatar color={colorBasedOnStates[row.state]} className="mr-1" content={row.name || "John Doe"} initials /> */}
        {renderClient(row)}
        <div className="d-flex flex-column">
          <span className="font-weight-bold text-primary">{row.name}</span>
          <small className="text-truncate text-muted mb-0 font-weight-bold text-black font-weight-bold">{row.dealer_type === "DEALER" ? "Dealership" : "Sub-D/S"}</small>
        </div>
      </div>
    )
  },
  // {
  //     name: 'Dealer Type',
  //     minWidth: '320px',
  //     selector: 'dealer_type',
  //     sortable: true,
  //     cell: row => row.dealer_type
  // },
  {
    name: "Info",
    minWidth: "200px",
    selector: "dealer_type",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.email}</span>
          <small className="text-danger" color="light-info">{row?.mobile}</small>
        </div>
      </div>
    )
  },
  {
    name: "Location",
    minWidth: "180px",
    selector: "city",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.state}</span>
          <small className="text-truncate text-muted mb-0">{row?.city}</small>
        </div>
      </div>
    )
  },
  {
    name: "Status",
    minWidth: "100px",
    selector: "is_deleted",
    sortable: true,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.is_deleted]} pill>
        {row.is_deleted === 0 ? "Active" : "Inactive"}
      </Badge>
    )
  },
  {
    name: "Policy Counts",
    minWidth: "100px",
    selector: "is_deleted",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{Math.floor(Math.random() * 1000)}</span>
          {/* <small className="text-truncate text-muted mb-0">{row?.city}</small> */}
        </div>
      </div>
    )
  },
  {
    name: "Sales Person",
    minWidth: "180px",
    selector: "is_deleted",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{
            ((Math.floor(Math.random() * 10)) < 5) ? "Gaurav Arora" : "Madhav Pratap Singh" 
          }</span>
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
            to={`/dashboard/dealership/main/${row.id}`}
            className="w-100"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
          <DropdownItem
            // tag={Link}
            // to={`/apps/user/edit/${row.id}`}
            className="w-100"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            //   onClick={() => store.dispatch(deleteUser(row.id))}
          >
            <Trash2 size={14} className="mr-50" />
            <span className="align-middle">Mark as Inactive</span>
          </DropdownItem>
          <DropdownItem className="w-100">
            <Menu size={14} className="mr-50" />
            <span className="align-middle">More</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
