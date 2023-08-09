import { Fragment, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Input, Label, Table, Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap"
import BreadCrumbs from "@components/breadcrumbs"
import ReactPaginate from "react-paginate"
import { states } from "@aegisUtils"
import { Eye, EyeOff, MoreVertical, Check} from "react-feather"

const insurerList = [
  {
    id: 1,
    insurerName: "Bajaj",
    email: "bajajAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 20000,
    region: "Karnataka"
  },
  {
    id: 2,
    insurerName: "Magma",
    email: "magmaAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 2,
    balance: 200000,
    region: "Kerala"
  },
  {
    id: 3,
    insurerName: "United",
    email: "unitedAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 340000,
    region: "Gujrat"
  },
  {
    id: 4,
    insurerName: "Bajaj",
    email: "bajaj2Aegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 2,
    balance: 450000,
    region: "Delhi"
  },
  {
    id: 5,
    insurerName: "Shri ram",
    email: "shriRamAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 2,
    balance: 680000,
    region: "Haryana"
  },
  {
    id: 6,
    insurerName: "Liberty",
    email: "libertyAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 370000,
    region: "Punjab"
  },
  {
    id: 7,
    insurerName: "United",
    email: "unitedAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 580000,
    region: "Bihar"
  },
  {
    id: 8,
    insurerName: "United",
    email: "unitedAegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 290000,
    region: "UK"
  },
  {
    id: 9,
    insurerName: "Bajaj",
    email: "bajaj3Aegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 580000,
    region: "UP"
  },
  {
    id: 10,
    insurerName: "Shri Ram",
    email: "shirRam2Aegis@gmail.com",
    loginId: "12345678",
    password: "aegis@123",
    status: 1,
    balance: 290000,
    region: "Hyderabad"  
  }
]
const inputFieldSize = "sm"
const statusObj = {
  1: "light-success", //Success
  2: "light-warning" //Warning
}

export default function ManageInsurers() {
  const [myState, setMyState] = useState("Haryana")
  const [viewPass, setViewPass] = useState(false)
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Insurers" breadCrumbParent="Insurers" breadCrumbActive="View / Manage" /> */}
      <Card>
        <CardHeader>
          <CardTitle>View / Manage Insurers</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label>Choose Region</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize} value={myState}>
                {states?.map((el) => {
                  return <option value={el?.value}>{el?.label}</option>
                })}
              </Input>
            </Col>
            <Col sm="3"></Col>
            <Col sm="3"></Col>
            <Col sm="3">
              <Label className="mr-1" for="search-input-1">
                Search
              </Label>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="md"
                // id='search-input-1'
                placeholder="search"
                size={inputFieldSize}
              />
            </Col>
          </Row>
          <Table size="sm" hover responsive className="text-left mt-2">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Insurer</th>
                <th>Email</th>
                <th>Login Id</th>
                <th>Password</th>
                <th>Status</th>
                <th>View</th>
                <th>Regions</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {insurerList?.map((item, idx) => {
                const [viewPass, setViewPass] = useState(true)
                const handlePassView = () => {
                    setViewPass(!viewPass)
                }
                return (
                  <tr>
                    <td>{idx + 1}.</td>
                    <td>{item?.insurerName}</td>
                    <td>{item?.email}</td>
                    <td>{item?.loginId}</td>
                    <td>
                        {viewPass ? '*********' : item?.password}
                    </td>
                    <td>
                      <Badge className="text-capitalize" color={statusObj[item.status]} pill>
                        {item?.status === 1 && "Active"}
                        {item?.status === 2 && "Inactive"}
                      </Badge>
                    </td>
                    <td>{viewPass ? <EyeOff size={15} onClick={handlePassView}/> :  <Eye size={15} onClick={handlePassView}/>}</td>
                    <td>{item?.region}</td>
                    <td>₹ {item?.balance}</td>
                    <td>
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          {/* <DropdownItem className="w-100" onClick={() => {
                            handleModal()
                            setModalData(item)
                          }}>
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Inspect</span>
                          </DropdownItem> */}
                          <DropdownItem className="w-100">
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Details</span>
                          </DropdownItem>
                          {/* <DropdownItem className="w-100 text-danger">
                            <XCircle size={14} className="mr-50" />
                            <span className="align-middle">Decline</span>
                          </DropdownItem> */}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Row>
            <Col>
              <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                pageCount={3}
                activeClassName="active"
                forcePage={0}
                // onPageChange={}
                pageClassName={"page-item"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item next"}
                previousClassName={"page-item prev"}
                previousLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                containerClassName={"pagination react-paginate justify-content-end my-2 pr-1"}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}
