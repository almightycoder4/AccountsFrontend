import { Fragment, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { Row, Col, Input, CardBody, CardHeader, CardTitle, Card, Label, Table, Badge, UncontrolledDropdown, DropdownToggle } from "reactstrap"
import { states, cities, globalTestingDealerList, globalTestingSubDealerList, soloTxList } from "@aegisUtils"
import ReactPaginate from "react-paginate"
import Flatpickr from "react-flatpickr"
import { Eye, Mail } from 'react-feather'
import "@styles/react/libs/flatpickr/flatpickr.scss"

const inputFieldSize = "md"
const statusObj = {
  2: "light-success", //Success
  1: "light-warning", //Processing
  3: "light-danger" //Failed
}
const txTypeObj = {
  2: "light-info", //Success
  1: "light-primary", //Processing
  3: "light-dark" //Failed
}
export default function Transaction() {
  const [myState, setMyState] = useState("Haryana")
  const [myCityList, setMyCityList] = useState([...cities["Haryana"]])
  const [dealerType, setDealerType] = useState("D/S")
  const handleDealerType = (e) => {
    let { value } = e.target
    setDealerType(value)
  }
  const handleChange = (e) => {
    let { value } = e.target
    setMyCityList([...cities[value]])
    setMyState(value)
  }

  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Business" breadCrumbParent="Wallet" breadCrumbActive="Transactions" /> */}
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm={dealerType === 'D/S' ? '3' : '2'}>
                <Label>Choose State</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize} onChange={handleChange} value={myState}>
                  {states?.map((el) => {
                    return <option value={el?.value}>{el?.label}</option>
                  })}
                </Input>
              </Col>
              <Col sm={dealerType === 'D/S' ? '3' : '2'}>
                <Label>Choose City</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                  {myCityList?.map((el) => {
                    return <option value={el?.value}>{el?.label}</option>
                  })}
                </Input>
              </Col>
              <Col sm={dealerType === 'D/S' ? '3' : '2'}>
                <Label>Choose Dealer Type</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize} onChange={handleDealerType}>
                  <option value="D/S">Dealership</option>
                  <option value="Sub-D/S">Sub-Dealership</option>
                </Input>
              </Col>
              <Col sm={dealerType === 'D/S' ? '3' : '3'}>
                <Label>Choose Dealership</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                  {globalTestingDealerList?.map((el) => {
                    return <option value={el?.id}>{el?.name}</option>
                  })}
                </Input>
              </Col>
              {dealerType === "Sub-D/S" ? (
                <Col sm="3">
                  <Label>Choose Sub-Dealership</Label>
                  <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                    {globalTestingSubDealerList?.map((el) => {
                      return <option value={el?.id}>{el?.name}</option>
                    })}
                  </Input>
                </Col>
              ) : (
                <Col sm="6"></Col>
              )}
            </Row>
            <Row className='mt-1'>
              <Col sm="4">
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
                />
              </Col>
              <Col sm="4"></Col>
              <Col sm="4">
                <Label className="mr-1" for="search-input-1">
                  Search
                </Label>
                <Input
                  className="dataTable-filter"
                  type="text"
                  bsSize="md"
                  // id='search-input-1'
                  placeholder="search"
                />
              </Col>
            </Row>
            <Table size="sm" hover responsive className='text-left mt-2'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th className="width-200">Date</th>
                <th>Transaction Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {soloTxList?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item?.sender}</td>
                    <td>{item?.receiver}</td>
                    <td>
                      <Badge className="text-capitalize" color={statusObj[item.status]} pill>
                        {item?.status === 1 && "Processing"}
                        {item?.status === 2 && "Success"}
                        {item?.status === 3 && "Failed"}
                      </Badge>
                    </td>
                    <td>{item?.date}<span className="ml-1"></span>{(Math.random() * 10).toFixed(2)}{' '}{((Math.random() * 10) < 5) ? 'AM' : 'PM'}</td>
                    <td>
                      <Badge className="text-capitalize" color={txTypeObj[item.txType]} pill>
                        {item?.txType === 1 && "Sharing"}
                        {item?.txType === 2 && "Top-Up"}
                        {item?.txType === 3 && "Transfer"}
                      </Badge>
                    </td>
                    <td>
                    <Eye size={14} className="cursor-pointer"
                    />  
                    <Mail size={14} className="cursor-pointer ml-1"/>

                      {/* <UncontrolledDropdown>
                        <DropdownToggle>
                          
                        </DropdownToggle>
                      </UncontrolledDropdown> */}
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
    </Fragment>
  )
}
