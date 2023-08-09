import { Fragment, useEffect, useState } from "react"
import { Card, CardBody, Table, Badge, Row, Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
    Input} from "reactstrap"
import ReactPaginate from "react-paginate"
import SelectDealerComp from "../../myForms/Common/SelectDealerComp"
import { testingDealerList, testingSubDealerList } from "../../myForms/CofigForms/ConfigurationCommon"
import { Shuffle, Eye, Edit2, MoreVertical } from "react-feather"
import UserModal from './UserModal'
import { useDispatch, useSelector } from "react-redux"
import { getDealershipGlobal, getThisDealershipUsers } from "../../../aegisUtils/sharedFunc"
import { GET_DEALERSHIP, GET_SUB_DEALERSHIP } from "../../myForms/DealershipForms/DealershipStore/actions"

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
const randomUserList = [
  { name: "Tanmoy Tanmoy", email: "tanmoy@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 2 },
  { name: "Naveen Naveen", email: "naveen@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 3 },
  { name: "Sparsh Sparsh", email: "sparsh@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Aryan Aryan", email: "aryan@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Samit Samit", email: "samit@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Arpita Arpita", email: "arpita@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 4 },
  { name: "Tezus Tezus", email: "tezus@aegiscovenant.com", mobile: "9090787856", dealerName: "Tezzz Hero", status: 1, role: 1 }
]
export default function Users() {
  //! redux imports
  const {dealership, subDealership} = useSelector((store) => store.dealershipReducer)
  const dispatch = useDispatch()

  //! dealership and subDealership State
  const [dealershipState, setDealershipState] = useState(dealership?.slice(0, 10))
  const [subDealershipState, setSubDealershipState] = useState(subDealership?.slice(0, 10))
  const [thisDealerUsers, setThisDealerUsers] = useState([])

  const [dealerType, setDealerType] = useState("D/S")
  const [dealerID, setDealerID] = useState(null)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const changeDealerType = (e) => {
    const { value } = e.target
    setDealerID(null)
    setDealerType(value)
  }
  const handleModal = () => {
    setOpenUserModal(!openUserModal)
  }
  const handleDealerId = async (e) => {
    let { value } = e?.target
    setDealerID(value)
    const getD = await getThisDealershipUsers(Number(value))
    // console.log("get D : ", getD)
    if (getD?.status == 200) {
      setThisDealerUsers(getD?.data)
    } else {
      setThisDealerUsers([])
    }
  }

  useEffect(async () => {
    console.log('fetching DEALER & SUB-DEALER')
    if (dealership?.length == 0) {
      console.log('fetching DEALER')
      let fetchDealer = await getDealershipGlobal("DEALER")
      if (fetchDealer?.status == 200) {
        let {data} = fetchDealer
        setDealershipState(data?.slice(0, 10))
        dispatch({type: GET_DEALERSHIP, payload: data})
      }
    }
    if (subDealership?.length == 0) {
      console.log('fetching SUB-DEALER')
      let fetchSubDealer = await getDealershipGlobal("SUB-DEALER")
      if (fetchSubDealer?.status == 200) {
        let {data} = fetchSubDealer
        setSubDealershipState(data?.slice(0, 10))
        dispatch({type: GET_SUB_DEALERSHIP, payload: data})
      }
    }
  }, [])

  // console.log('thisDealerUsers : ', thisDealerUsers)
  // console.log('Dealer ID : ', dealerID)
  // console.log('dealership N subDealership : ', dealershipState, subDealershipState)
  return (
    <Fragment>
      <Card>
        <Fragment>
          <SelectDealerComp
            dealerID={dealerID}
            changeDealerType={changeDealerType}
            dealerType={dealerType}
            testingDealerList={dealershipState}
            testingSubDealerList={subDealershipState}
            handleDealerId={handleDealerId}
          />
        </Fragment>
      </Card>
      {dealerID == null ? <></> : <Card>
        <div className="pt-2 pl-2 pr-2 fs-2" 
        style={{fontWeight:'bold'}}>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                   <div>Users List</div>
                   <div></div>
                </div>
                {thisDealerUsers?.length !== 0 && 
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        Sort By Name : 
                    </div>
                    <div>
                        <Input
                        type='select'
                        className='ml-1'
                        >
                            <option>Ascending</option>
                            <option>Descending</option>
                        </Input>
                    </div>
                </div>
                  }
            </div>
          </div>
        <CardBody>
          {thisDealerUsers?.length === 0 && <div>No User Exists So Far</div>}
          {thisDealerUsers?.length !== 0 && 
            <Table size="sm" hover className="text-left">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Dealership ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {thisDealerUsers.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}.</td>
                    <td>{item?.user?.user_name}</td>
                    <td>{item?.user?.user_email}</td>
                    <td>{item?.user?.user_mobile}</td>
                    <td>{item?.user?.dealership_id}</td>
                    {/* <td>{item?.status}</td> */}
                    <td>
                      <Badge className="text-capitalize" color={statusObj[item?.user?.user_role]} pill>
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
                          <DropdownItem className="w-100" onClick={() => {
                            handleModal()
                            setModalData(item)
                          }}>
                            <Eye size={14} className="mr-50" />
                            <span className="align-middle">View</span>
                          </DropdownItem>
                          {/* <DropdownItem className="w-100 text-success">
                            <Edit2 size={14} className="mr-50" />
                            <span className="align-middle">Edit</span>
                          </DropdownItem> */}
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
            {openUserModal && <UserModal isOpen={openUserModal} onClose={handleModal} data={modalData}/>}
          </Table>
          }
          {thisDealerUsers?.length !== 0 && <Row>
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
          </Row>}
        </CardBody>
      </Card>}
    </Fragment>
  )
}
