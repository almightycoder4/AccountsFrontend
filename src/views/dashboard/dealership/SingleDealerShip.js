import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { CardBody, Col, Row, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Card, Badge } from "reactstrap"
import AcplConfig from "../../myForms/CofigForms/ACPL"
import CommissionConfig from "../../myForms/CofigForms/Commission"
import { tempGetAllConfig } from "../../myForms/CofigForms/ConfigurationStore/actions"
import PayOutConfig from "../../myForms/CofigForms/PayOut"
import { renderDealerList } from "./MockDealerList"
import DealerInfoCard from "./SingleDealerComp/DealerInfoCard"
import ProgressCard from "./SingleDealerComp/ProgressCard"
import axios from "axios"
import ReactPaginate from "react-paginate"
import UserModal from "../users/UserModal"
import { Shuffle, Eye, Edit2, MoreVertical } from "react-feather"
import { PUSH_ACPL, PUSH_COMMISSION, PUSH_PAYOUT } from "../../myForms/CofigForms/ConfigurationStore/actions/actionType"
import { converFetchedAcplData } from "@aegisUtils"

const statusObj = {
  1: "light-success", //Success
  2: "light-success",
  3: "light-warning",
  4: "light-warning", //Processing
  5: "light-danger", //Failed
  6: "light-danger",
  7: "light-danger",
  8: "light-info",
  9: "light-info",
  10: "light-info",
  11: "light-info"
}
const randomUserListMock = [
  { name: "Tanmoy Tanmoy", email: "tanmoy@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 2 },
  { name: "Naveen Naveen", email: "naveen@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 3 },
  { name: "Sparsh Sparsh", email: "sparsh@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Aryan Aryan", email: "aryan@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Samit Samit", email: "samit@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Arpita Arpita", email: "arpita@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Tezus Tezus", email: "tezus@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 1 }
]

export default function SingleDealerShip() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [thisDealership, setThisDealership] = useState({})
  const [openUserModal, setOpenUserModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [randomUserList, setRandomUserList] = useState([])

  const handleModal = () => {
    setOpenUserModal(!openUserModal)
  }
  const getThisDealershipUsers = async (id) => {
    try {
      let data = JSON.stringify({
        dealershipID: id
      })

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/users/bulk",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      }

      const response = await axios.request(config)
      console.log("this dealer user : ", response?.data?.users)
      setRandomUserList([...response?.data?.users])
    } catch (e) {
      console.log("error while fetching this dealer user : ", e)
      setRandomUserList([])
    }
  }
  const getThisDealership = async () => {
    try {
      let data = ""

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/single/?id=${id}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      }
      const response = await axios.request(config)
      await getThisDealershipUsers(response?.data?.dealership?.id)

      setThisDealership(response?.data?.dealership)
      // console.log("single dealership : ", response)
    } catch (e) {
      console.log("error while fetching single dealership : ", e)
    }
  }
  const getDealerPreviousConfigs = async (id) => {
    dispatch({type: PUSH_ACPL, payload: []})
    dispatch({type: PUSH_PAYOUT, payload: []})
    dispatch({type: PUSH_COMMISSION, payload: []})
    try {
      let config = {
        method: "get",
        url: `https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/config/getDealerConfigs/?dealerID=${id}`
      }

      const getConfigDataOfDS = await axios.request(config)
      const {data : configurationList} = getConfigDataOfDS

      const oldAcplList = converFetchedAcplData(configurationList?.acplList)
      const oldPayoutList = converFetchedAcplData(configurationList?.payoutList)
      const oldCommissionList = converFetchedAcplData(configurationList?.distributionList)

      dispatch({type: PUSH_ACPL, payload: oldAcplList})
      dispatch({type: PUSH_PAYOUT, payload: oldPayoutList})
      dispatch({type: PUSH_COMMISSION, payload: oldCommissionList})

      // console.log('getConfigDataOfDS : ', getConfigDataOfDS?.data)
    } catch (e) {
      console.log("error while getDealerPreviousConfigs api call : ", e)
    }
  }
  useEffect(() => {
    dispatch(tempGetAllConfig())
    getThisDealership()
    getDealerPreviousConfigs(id)
  }, [id])
  return (
    <Fragment>
      <div className="app-user-view">
        <Row>
          <Col xl="9" lg="8" md="7">
            <DealerInfoCard data={thisDealership} />
          </Col>
          <Col xl="3" lg="4" md="5">
            <ProgressCard data={thisDealership} />
          </Col>
        </Row>
      </div>
      <Card>
        <div className="pt-2 pl-2 pr-2 fs-2" style={{ fontWeight: "bold" }}>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
              <div>Users List</div>
              <div></div>
            </div>
            {randomUserList.length !== 0 && (
              <div className="d-flex justify-content-between align-items-center">
                <div>Sort By Name :</div>
                <div>
                  <Input type="select" className="ml-1">
                    <option>Ascending</option>
                    <option>Descending</option>
                  </Input>
                </div>
              </div>
            )}
          </div>
        </div>
        <CardBody>
          {randomUserList.length === 0 && <div>No User Exists So Far</div>}
          {randomUserList.length !== 0 && (
            <Table size="sm" hover responsive className="text-left">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Dealership Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {randomUserList.map((item, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}.</td>
                      <td>{item?.user?.user_name}</td>
                      <td>{item?.user?.user_email}</td>
                      <td>{item?.user?.user_mobile}</td>
                      <td>{item?.user_role?.role_name}</td>
                      {/* <td>{item?.status}</td> */}
                      <td>
                        <Badge className="text-capitalize" color={statusObj[item?.user_role?.id]} pill>
                          {[3, 4].includes(item?.user_role?.id) && "Owner"}
                          {[8, 9, 11].includes(item?.user_role?.id) && "General Manager"}
                          {[1, 2].includes(item?.user_role?.id) && "Accountant"}
                          {[5, 6, 7].includes(item?.user_role?.id) && "Executive"}
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
                                handleModal()
                                setModalData(item)
                              }}
                            >
                              <Eye size={14} className="mr-50" />
                              <span className="align-middle">View</span>
                            </DropdownItem>
                            <DropdownItem className="w-100 text-success">
                              <Edit2 size={14} className="mr-50" />
                              <span className="align-middle">Edit</span>
                            </DropdownItem>
                            <DropdownItem className="w-100">
                              <Shuffle size={14} className="mr-50" />
                              <span className="align-middle">Change Status</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {openUserModal && <UserModal isOpen={openUserModal} onClose={handleModal} data={modalData} />}
            </Table>
          )}
          {randomUserList.length !== 0 && (
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
          )}
        </CardBody>
      </Card>
      <Fragment>
        <AcplConfig dealerID={Number(id)} />
      </Fragment>
      <Fragment>
        <PayOutConfig dealerID={Number(id)} />
      </Fragment>
      <Fragment>
        <CommissionConfig dealerID={Number(id)} />
      </Fragment>
    </Fragment>
  )
}
