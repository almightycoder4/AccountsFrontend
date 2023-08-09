import { Fragment, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { Row, Col, Input, CardBody, CardHeader, CardTitle, Card, Label, Table, Badge,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
 } from "reactstrap"
import { ChevronDown, MoreVertical, Eye, Download, Server, UploadCloud, XCircle  } from "react-feather"
import DataTable from "react-data-table-component"
import { policiesListColumns, renderPoliciesList } from "./MockPolicies"
import ReactPaginate from "react-paginate"
import { statesList } from "@aegisUtils"
import { Link } from "react-router-dom"

const inputFieldSize = "md"
const rtoList = [
  { label: "Light", value: "light" },
  { label: "Damon", value: "damon" },
  { label: "Gon", value: "gon" },
  { label: "Lubu", value: "lubu" },
  { label: "Hinata", value: "hinata" }
]

const statusList = [
  { label: "Processing", value: "Processing" },
  { label: "Success", value: "Success" },
  { label: "Failed", value: "Failed" }
]

// ! Status of Transactions
const statusObjZero = {
  2: "light-success", //Success
  1: "light-warning", //Processing
  3: "light-danger" //Failed
}

// ! Custom Header of Dealer Table
const CustomHeaderDealerTable = () => {
  // console.log('renderPoliciesList : ', renderPoliciesList)
  const [stateList, setStateList] = useState(renderPoliciesList.slice(0, 10))
  return (
    <Fragment>
      <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
        <Row>
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <Label for="rows-per-page">Show</Label>
              <Input
                type="select"
                name="select"
                id="select-basic"
                size={inputFieldSize}
                style={{
                  width: "60px",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <Label for="rows-per-page">Entries</Label>
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Search:
              </Label>
              <Input id="search-invoice" className="ml-50 w-100" type="text" value={"Search"} size={inputFieldSize} />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

// ! Custom Pagination of Policies Table

const CustomPaginationForDealerTable = () => {
  const count = 6

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={count || 1}
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
  )
}

// ! Status of D/S
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary"
}

export default function PolicyTable() {
  // console.log('renderPoliciesList : ', renderPoliciesList)
  const [stateList, setStateList] = useState(renderPoliciesList.slice(0, 10))
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Business" breadCrumbParent="Dashboard" breadCrumbActive="Policies" /> */}
      {/* <Fragment> */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance List</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4" sm="4">
              <Label>Choose RTO</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                {rtoList?.map((el) => {
                  return <option value={el?.value}>{el?.label}</option>
                })}
              </Input>
            </Col>
            <Col md="4" sm="4">
              <Label>Choose State</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                {statesList?.map((el) => {
                  return <option value={el?.value}>{el?.label}</option>
                })}
              </Input>
            </Col>
            <Col md="4" sm="4">
              <Label>Choose Status</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                {statusList?.map((el) => {
                  return <option value={el?.value}>{el?.label}</option>
                })}
              </Input>
            </Col>
          </Row>
          <br />
          <Table size="sm" hover responsive className="text-left">
            <thead>
              <tr>
                <th>S.No.</th>
                <th className="width-110">Customer</th>
                <th>Policy ID</th>
                <th>State</th>
                <th>City</th>
                <th>RTO</th>
                <th>Status</th>
                <th>Premium</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateList?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item?.cust_name}</td>
                    <td>{item?.policyId}</td>
                    <td>{item?.state}</td>
                    <td>{item?.city}</td>
                    <td>{item?.rtoId}</td>
                    <td>
                      <Badge className="text-capitalize" color={statusObjZero[item.status]} pill>
                        {item?.status === 1 && "Processing"}
                        {item?.status === 2 && "Success"}
                        {item?.status === 3 && "Failed"}
                      </Badge>
                    </td>
                    <td className="text-bold">&#8377; {item?.premium}</td>
                    <td>{item?.date}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag={Link}
                            to={`/business/insurance/${item.policyId}`}
                            className="w-100"
                          >
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Details</span>
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
                          >
                            <Download size={14} className="mr-50" />
                            <span className="align-middle">Download</span>
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
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
                pageCount={5}
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
      {/* </Fragment> */}
      {/* <Fragment>
        <Card>
          <DataTable
            noHeader
            pagination
            subHeader
            responsive
            paginationServer
            columns={policiesListColumns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPaginationForDealerTable}
            data={stateList}
            subHeaderComponent={<CustomHeaderDealerTable />}
          />
        </Card>
      </Fragment> */}
    </Fragment>
  )
}
