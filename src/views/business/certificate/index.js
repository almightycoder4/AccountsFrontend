import { Fragment, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import {
  Row,
  Col,
  Input,
  CardBody,
  CardHeader,
  CardTitle,
  Card,
  Label,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { MoreVertical, Eye, Download, Server, UploadCloud, XCircle } from "react-feather"
import { renderCertificateList } from "./MockCertificate"
import ReactPaginate from "react-paginate"
import { statesList } from "@aegisUtils"
import { Link } from "react-router-dom"

const inputFieldSize = "sm"

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


export default function CertificateTable() {
  // console.log('renderCertificateList : ', renderCertificateList)
  const [stateList, setStateList] = useState(renderCertificateList.slice(0, 10))
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Certificates" breadCrumbParent="Dashboard" breadCrumbActive="Certficates" /> */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates List</CardTitle>
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
                <th className="width-100">Customer</th>
                <th>Certificate ID</th>
                <th>State</th>
                <th>City</th>
                <th>RTO</th>
                <th>Premium</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateList?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}.</td>
                    <td>{item?.cust_name}</td>
                    <td>{item?.certificateId}</td>
                    <td>{item?.state}</td>
                    <td>{item?.city}</td>
                    <td>{item?.rtoId}</td>
                    <td>&#8377; {item?.premium}</td>
                    <td>{item?.date}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag={Link} to={`/business/certificates/${item.id}`} className="w-100">
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Details</span>
                          </DropdownItem>
                          <DropdownItem className="w-100">
                            <Download size={14} className="mr-50" />
                            <span className="align-middle">Download</span>
                          </DropdownItem>
                          <DropdownItem className="w-100">
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
                pageCount={1}
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
