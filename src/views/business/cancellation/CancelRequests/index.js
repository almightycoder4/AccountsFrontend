import { Fragment, useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Label,
  Input,
  Table,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Badge
} from "reactstrap"
import { MoreVertical, Eye, Check, XCircle } from "react-feather"
import BreadCrumbs from "@components/breadcrumbs"
import Flatpickr from "react-flatpickr"
import ReactPaginate from "react-paginate"
import { mockTickets } from "@aegisUtils"

import "@styles/react/libs/flatpickr/flatpickr.scss"
const statusObj = {
  2: "light-success", //Success
  1: "light-warning", //Processing
  3: "light-danger" //Failed
}

const inputFieldSize = "md"
export default function CancelRequests() {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Business" breadCrumbParent="Cancellation" breadCrumbActive="Requests" /> */}
      <Card>
        <CardHeader>
          <CardTitle>Cancellation Request Page</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Fragment>
                <Label for="range-picker">Request Date Range</Label>
                <Flatpickr
                  value={picker}
                  id="range-picker"
                  className="form-control"
                  onChange={(date) => setPicker(date)}
                  options={{
                    mode: "range",
                    defaultDate: ["2020-02-01", "2020-02-15"]
                  }}
                  size={inputFieldSize}
                />
              </Fragment>
            </Col>
            <Col sm="3">
              <Label>Choose Reasons</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                <option>Technical Faults</option>
                <option>Alternate Policy</option>
                <option>Unable to Endorse</option>
                <option>Server issue </option>
              </Input>
            </Col>
            <Col sm="3">
              <Label>Choose Status</Label>
              <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </Input>
            </Col>
            <Col sm="3">
              <Label>Search</Label>
              <Input type="text" name="select" id="select-basic" size={inputFieldSize} placeholder={"search..."} />
            </Col>
          </Row>
          <br />
          <Table size="sm" hover className="text-left">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Policy ID</th>
                <th>Expiry Date</th>
                <th>Reason</th>
                <th>Cancel Req. Date</th>
                <th >Refund</th>
                <th>Status</th>
                <th>Premium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTickets?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item?.policy_id}</td>
                    <td>{item?.expiry_date}</td>
                    <td>
                      {item?.reason === 1 && "Technical Faults"}
                      {item?.reason === 2 && "Alternate Policy"}
                      {item?.reason === 3 && "Unable to Endorse"}
                      {item?.reason === 4 && "Server issue"}
                    </td>
                    <td>{item?.request_date}</td>
                    <td>
                      {item?.status === 1 ? (
                        <div className="d-flex align-items-center">
                          <div>₹</div><Input type='number' style={{marginLeft:'7px', width:'105px'}} size="sm" placeholder="enter refund" />
                        </div>
                      ) : (
                        <>₹ {item?.refund}</>
                      )}
                    </td>
                    <td>
                      <Badge className="text-capitalize" color={statusObj[item?.status]} pill>
                        {item?.status === 1 && "Processing"}
                        {item?.status === 2 && "Approved"}
                        {item?.status === 3 && "Rejected"}
                      </Badge>
                    </td>
                    <td>
                      <Badge className="text-capitalize" color={"light-primary"} pill>
                        ₹{item?.premium}
                      </Badge>
                    </td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            className="w-100"
                            onClick={() => {
                              // handleModal()
                              // setModalData(item)
                            }}
                          >
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Inspect</span>
                          </DropdownItem>
                          <DropdownItem className="w-100 text-success">
                            <Check size={14} className="mr-50" />
                            <span className="align-middle">Proceed</span>
                          </DropdownItem>
                          <DropdownItem className="w-100 text-danger">
                            <XCircle size={14} className="mr-50" />
                            <span className="align-middle">Reject</span>
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
    </Fragment>
  )
}
