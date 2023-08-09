import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, FileText, Trash2, Archive, Menu } from "react-feather"
import { Link } from 'react-router-dom'
import Avatar from "@components/avatar"




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