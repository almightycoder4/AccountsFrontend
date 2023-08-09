import { Fragment, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { Card, CardBody, CardHeader, CardTitle, Input, Col, Row, Label, Table,
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import ReactPaginate from "react-paginate"
import { XCircle, Eye, Check, MoreVertical } from "react-feather"
import EndorseDetails from "./EndorseDetails"

const inputFieldSize = 'md'
export default function Endorsement() {
    const [stateList, setStateList] = useState([
        {
            dealer_name:'MPS',
            dealer_id:'1101',
            request_user:'Jack Hanma',
            request_date:'5/19/2023',
            request_id:'64a26578fc1'
        },
        {
            dealer_name:'K P',
            dealer_id:'1246',
            request_user:'AB CDE',
            request_date:'8/19/2023',
            request_id:'64a26589gc2'
        }
    ])
    const [picker, setPicker] = useState(new Date())
    const [openEndorseModal, setOpenEndorseModal] = useState(false)
  const handleModal = () => {
    setOpenEndorseModal(!openEndorseModal)
  }
  const [modalData, setModalData] = useState({})
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Business" breadCrumbParent="Endorsement" breadCrumbActive="Requests" /> */}
      <Card>
        <CardHeader>
          <CardTitle>Endorsement Requests</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="2">
              <Fragment>
                <Label for="range-picker">Choose Date Range</Label>
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
            <Col sm='2'></Col>
            <Col sm='4'></Col>
            <Col sm="4">
            <Label>Search</Label>
              <Input type="text" name="select" id="select-basic" size={inputFieldSize} placeholder={"search..."} />
            </Col>
          </Row>
          <br/>
          <Table size="sm" hover className="text-left">
            <thead>
              <tr>
                <th>S.No.</th>
                <th className="width-120">Dealer</th>
                <th>Dealer ID</th>
                <th>Request User</th>
                <th>Request Date</th>
                <th>Request Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateList?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item?.dealer_name}</td>
                    <td>{item?.dealer_id}</td>
                    <td>
                      <Badge className="text-capitalize" color={"light-primary"} pill>
                        {item?.request_user}
                      </Badge>
                    </td>
                    <td>{item?.request_date}</td>
                    <td>{item?.request_id}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem className="w-100" onClick={() => {
                            handleModal()
                            setModalData(item)
                          }}>
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">Inspect</span>
                          </DropdownItem>
                          <DropdownItem className="w-100 text-success">
                            <Check size={14} className="mr-50" />
                            <span className="align-middle">Approve</span>
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
            {openEndorseModal && <EndorseDetails isOpen={openEndorseModal} onClose={handleModal} data={modalData}/>}
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
