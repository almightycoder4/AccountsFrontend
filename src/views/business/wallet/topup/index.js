import { Fragment, useEffect, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import {
  Row,
  Col,
  Input,
  CardHeader,
  CardTitle,
  Card,
  Label,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import { XCircle, Eye, Check, MoreVertical } from "react-feather"
import { mockTransaction } from "@aegisUtils"
import ReactPaginate from "react-paginate"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import TopUpDetails from "./TopUpDetails"
import axios from "axios"
import { updateTopUpReqStatus } from "./commonTopUpFunc"
import { notifyError, notifyInfo, notifySuccess } from "../../../myForms/Common/MyToasts"

const inputFieldSize = "md"

const statusObj = {
  APPROVED: "light-success",
  PENDING: "light-warning",
  REJECT: "light-danger"
}

export default function TopUp() {
  // const [stateList, setStateList] = useState(mockTransaction.slice(0, 10))
  const [picker, setPicker] = useState(new Date())
  const [openTopUpModal, setOpenTopUpModal] = useState(false)
  const handleModal = () => {
    setOpenTopUpModal(!openTopUpModal)
  }
  const [modalData, setModalData] = useState({})
  const [topUpRequest, setTopUpRequest] = useState([])
  const [pageRequest, setPageRequest] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [topupStatus, setTopUpStatus] = useState('')

  const handlePageChange = (num) => {
    setCurrentPage(num)
    setPageRequest([...topUpRequest].slice(num * 10, num * 10 + 10))
  }
  const getLatestTopUpRequest = async (topupStatus) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/wallet/topup/details",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          topupStatus: topupStatus || ""
        })
      }

      const topupData = await axios.request(config)
      const { data: topups } = topupData
      console.log("topupData : ", topups)
      let temp = Math.ceil(topups?.data?.length / 10)
      if (topups?.data?.length <= 10) {
        setPageCount(temp)
        setTopUpRequest(topups?.data)
        setPageRequest([...topups?.data]?.slice(0, 10))
      } else {
        setPageCount(temp)
        setTopUpRequest(topups?.data)
        setPageRequest([...topups?.data]?.slice(currentPage * 10, currentPage * 10 + 10))
      }
      
    } catch (e) {
      setPageCount(1)
      setTopUpRequest([])
      setPageRequest([])
      console.log("error while topup request : ", e)
    }
  }

  useEffect(() => {
    getLatestTopUpRequest("")
  }, [])
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Business" breadCrumbParent="Wallet" breadCrumbActive="Top-Up" /> */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Top Up Requests</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4" sm="3">
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
            <Col md="4" sm="3">
              <Label>Choose Transaction Type</Label>
              <Input
                type="select"
                name="select"
                id="select-basic"
                size={inputFieldSize}
                onChange={async (e) => {
                  await getLatestTopUpRequest(e?.target?.value)
                  setTopUpStatus(e?.target?.value)
                }}
              >
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECT">Reject</option>
                <option value="" selected>
                  All
                </option>
              </Input>
            </Col>
            <Col sm="4">
              <Label>Search (based on request ID)</Label>
              <Input type="text" name="select" id="select-basic" size={inputFieldSize} placeholder={"not functioning..."} disabled />
            </Col>
          </Row>
          <br />
          {pageRequest?.length !== 0 && (
            <Table size="sm" hover responsive className="text-left">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th className="width-110">Top-Up Id</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="width-210">Requested Date</th>
                  <th>ACPL Team Id</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRequest?.map((item, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}.</td>
                      <td>{item?.topup_id}</td>
                      <td>₹ {item?.amount}</td>
                      <td>
                        <Badge className="text-capitalize" color={statusObj[item?.topup_status]} pill>
                          {item?.topup_status === "APPROVED" && "Approved"}
                          {item?.topup_status === "PENDING" && "Pending"}
                          {item?.topup_status === "REJECT" && "Rejected"}
                        </Badge>
                      </td>
                      <td>
                        <span>{item?.created_at?.split("T")?.[0]}</span>
                        <span className="ml-1"></span>
                        <Badge color="light-primary">{item?.created_at?.split("T")?.[1]?.split(".")?.[0]}</Badge>
                      </td>
                      <td>{item?.acpl_team_id ? item?.acpl_team_id : "None"}</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              className="w-100"
                              onClick={() => {
                                handleModal()
                                setModalData(item)
                              }}
                            >
                              <Eye size={14} className="mr-50" />
                              <span className="align-middle">Inspect</span>
                            </DropdownItem>
                            {item?.topup_status === "APPROVED" ? null : (
                              <DropdownItem
                                className="w-100 text-success"
                                onClick={async () => {
                                  const status = await updateTopUpReqStatus(item?.topup_id, "APPROVED")
                                  if (status == 200) {
                                    await getLatestTopUpRequest(topupStatus)
                                    notifySuccess({message:'Top-Up Approved'})
                                  } else {
                                    notifyInfo({message:'Top-Up declined failed'})
                                  }
                                }}
                              >
                                <Check size={14} className="mr-50" />
                                <span className="align-middle">Approve</span>
                              </DropdownItem>
                            )}
                            {item?.topup_status === "APPROVED" ? null : (
                              <DropdownItem
                                className="w-100 text-danger"
                                onClick={async () => {
                                  const status = await updateTopUpReqStatus(item?.topup_id, "REJECT")
                                  if (status == 200) {
                                    await getLatestTopUpRequest(topupStatus)
                                    notifyInfo({message:'Top-Up request Declined'})
                                  } else {
                                    notifyError({message:'Top-Up request decline failed'})
                                  }
                                }}
                              >
                                <XCircle size={14} className="mr-50" />
                                <span className="align-middle">Decline</span>
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {openTopUpModal && (
                <TopUpDetails isOpen={openTopUpModal} onClose={handleModal} data={modalData} getLatestTopUpRequest={getLatestTopUpRequest} topupStatus={topupStatus}/>
              )}
            </Table>
          )}

          {pageRequest?.length !== 0 && (
            <Row>
              <Col>
                <ReactPaginate
                  previousLabel={""}
                  nextLabel={""}
                  pageCount={pageCount}
                  activeClassName="active"
                  forcePage={currentPage}
                  onPageChange={(page) => {
                    handlePageChange(page?.selected)
                  }}
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
          )}
          <Row>
            <Col>{pageRequest?.length == 0 && <div className="font-weight-bold text-center">No Records</div>}</Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}
