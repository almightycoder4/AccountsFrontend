import { Fragment, useEffect, useRef, useState } from "react"
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  CustomInput,
  FormGroup
} from "reactstrap"
import { MoreVertical, FileText, Trash2, Archive, Menu, ChevronDown } from "react-feather"
import Avatar from "@components/avatar"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { GET_SUB_DEALERSHIP } from "../../myForms/DealershipForms/DealershipStore/actions"
import { statesListDB } from "../../../aegisUtils"
import { getCityViaState, getRtoViaCity } from "../../../aegisUtils/sharedFunc.js"
import { getDealershipData } from "./api"

// ! Status of D/S
const statusObj = {
  0: "light-success",
  1: "light-warning"
}

const inputFieldSize = "sm"

// ** Renders Client Columns
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
          <small className="text-truncate text-muted mb-0 font-weight-bold text-black font-weight-bold">
            {row.dealer_type === "DEALER" ? "Dealership" : "Sub-Dealership"}
          </small>
        </div>
      </div>
    )
  },
  {
    name: "Info",
    minWidth: "200px",
    selector: "dealer_type",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">{row?.email}</span>
          <small className="text-danger" color="light-info">
            {row?.mobile}
          </small>
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
    name: "Policy Count",
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
          <span className="font-weight-bold">{Math.floor(Math.random() * 10) < 5 ? "Gaurav Arora" : "Madhav Pratap Singh"}</span>
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

export default function SubDealership() {
  const { subDealership } = useSelector((store) => store.dealershipReducer)
  // console.log('renderDealerList : ', renderDealerList)

  const [loader, setLoader] = useState(true)
  //! limit and offset for api call
  const [limit, setLimit] = useState(9)
  const [offset, setOffset] = useState(0)
  const ref = useRef()
  const [searchDS, setSearchDS] = useState("")

  //! state city and rto states
  const [indianState, setIndianState] = useState("")
  const [indianCity, setIndianCity] = useState([])
  const [indianRto, setIndianRto] = useState([])

  //!redux imports
  const dispatch = useDispatch()

  //! pagination states
  const [renderSubDealership, setRenderSubDealership] = useState([])
  const [currentPageRange, setCurrentPageRange] = useState([0, 1, 2, 3, 4])
  const [currentPage, setCurrentPage] = useState(0)

  const handleSearch = (e) => {
    let { value } = e?.target
    setSearchDS(value)
    // console.log("handleSearch : name : value ", name, value)
    if (ref?.current) {
      clearTimeout(ref?.current)
    }
    ref.current = setTimeout(async () => {
      let dealerData
      if (value == "") {
        dealerData = await getDealershipData("SUB-DEALER", 0)
      } else {
        dealerData = await getDealershipData("SUB-DEALER", 0, value)
      }

      let payloadData
      if (dealerData?.status == 200) {
        // console.log("get dealership via search : ", dealerData?.data)
        payloadData = dealerData?.data
      } else {
        payloadData = []
      }
      dispatch({ type: GET_SUB_DEALERSHIP, payload: payloadData })
      setRenderSubDealership(payloadData.slice(0, 9))
      setCurrentPage(0)
    }, 1000)
  }
  const checkPageNumData = (pageNum) => {
    let listOne = [0, 1, 2, 3, 4]
    if (currentPageRange.includes(pageNum)) {
      return false
    }
    let divident = Math.floor(pageNum / 5)
    let add = Math.floor(divident * 5)
    listOne = listOne.map((num) => {
      return num + add
    })
    // console.log('listOne on Sub : ', listOne)
    setCurrentPageRange(listOne)
    return true
  }

  const handlePagination = async (pageLimit, pageNum) => {
    // let totalPage = Math.ceil(dealership?.length / (+pageLimit))
    //change current page
    //change total page numbers
    //change limit
    let subDealershipList
    let checkForGetCall = checkPageNumData(+pageNum)
    if (checkForGetCall) {
      setLoader(true)
      let dealerData = await getDealershipData("SUB-DEALER", pageNum * 9)
      if (dealerData?.status == 200) {
        subDealershipList = dealerData?.data
        dispatch({ type: GET_SUB_DEALERSHIP, payload: dealerData?.data })
        setLoader(false)
      }
    } else {
      subDealershipList = subDealership
    }
    let pageNumUI = pageNum
    pageNum = pageNum % 5

    // console.log('pageLimit pageNum at SUB : ', pageLimit, pageNum)
    let least = +pageNum * pageLimit
    let max = +pageNum * pageLimit + pageLimit

    setRenderSubDealership(subDealershipList?.slice(least, max))
    // setTotalPage(+totalPage * 2)//! set total pages
    setCurrentPage(+pageNumUI) //! set current pages
    // setLimit(+pageLimit)//! set page limit
  }
  // const getSubDealershipData = async () => {
  //   try {
  //     let data = JSON.stringify({
  //       dealerType: "SUB-DEALER",
  //       limit: +limit,
  //       offset: +offset
  //     })
  //     // (Number(offset) * Number(limit)) - Number(limit)
  //     setLoader(true)
  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/filter",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJraWQiOiJIS09XK2dJaGJSNFVjQTNzZUk4RmJHdnByUzVQekJ5bERvQlZxMUl6TGRNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YWYwYmEyMi1jMGRmLTRhZTMtYWUwZS1kNGI2YWM4NTQxZDEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0F3UWd0bnlrOSIsImNsaWVudF9pZCI6IjdhcGVtZGJuMTUyMzcxZGxoaGIyazJpcjFzIiwib3JpZ2luX2p0aSI6IjUxNzQzMjFiLTM4NWEtNDFiZi1iYWE2LWNjNTA2YzljYzUwMCIsImV2ZW50X2lkIjoiOGFlYjg4MmQtMDdlMy00MDAwLWFhMDQtNDljYzFjZTM5NTQ1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MDM3MTg0OCwiZXhwIjoxNjkwNDU4MjQ4LCJpYXQiOjE2OTAzNzE4NDgsImp0aSI6ImI1OTMwM2ZlLWQ2NWUtNDVhZS05ZTcxLTY4Y2I0ZTk0ZjE3ZiIsInVzZXJuYW1lIjoiOWFmMGJhMjItYzBkZi00YWUzLWFlMGUtZDRiNmFjODU0MWQxIn0.aaOBRndGF6ERfAxosksPV7mehMoCMfRm-ERWKR6Utx6b6E3BR4Vh_7TgmgB3e6PamW-TadJ3h9WmRDOfp4-mNO6IKkcdEd5KbfUR3D603ZBpbuZl-9e9mUZxpjgboKOflQzK06FUZJkJsD0bduNRC_ZCfc4RbKlREg0CF-fxow9_vlzVbUcGYhWX2GTHVCxXOnZaRsvbtZVzmAzo0PBIrLZztuiBHtgsmAZntgMx_mVZomk21FvjhLlRllUFbOsWX3uIHBV7SBvR7qRXjuLRJ8Aqbg1EDyqqEFtM-B2jkrJIRbTxpMXjO10nBAHYvIllX2Z7dJnVoNpzYKn31zfEug"
  //       },
  //       data: data
  //     }
  //     const getDealerships = await axios.request(config)
  //     let { data: dealerData } = getDealerships
  //     dealerData = dealerData.dealerships.map((item) => {
  //       return { ...item?.dealership }
  //     })
  //     dispatch({ type: GET_SUB_DEALERSHIP, payload: dealerData })
  //     // console.log('SubdealerData : ', dealerData)
  //     setLoader(false)
  //   } catch (e) {
  //     console.log("error while fetching dealerships : ", e)
  //     setLoader(false)
  //   }
  // }
  // ! Custom Pagination of Dealer Table
  const CustomPaginationForDealerTable = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={15}
        activeClassName="active"
        forcePage={currentPage}
        onPageChange={(page) => {
          // console.log('pageCount : ', pageCount)
          // setOffset(page?.selected)
          handlePagination(limit, page?.selected)
        }}
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

  // ! Custom Header of Dealer Table
  const CustomHeaderDealerTable = () => {
    return (
      <Fragment>
        <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
          <Row>
            <Col xl="6" className="d-flex align-items-center p-0">
              {/* <div className="d-flex align-items-center w-100">
                <Label for="rows-per-page">Show</Label>
                <CustomInput
                  className="form-control mx-50"
                  type="select"
                  id="rows-per-page"
                  value={limit}
                  style={{
                    width: "5rem",
                    padding: "0 0.8rem",
                    backgroundPosition: "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0"
                  }}
                  onChange={(e) => {
                    setLimit(e?.target?.value)
                  }}
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                </CustomInput>
                <Label for="rows-per-page">Entries</Label>
              </div> */}
            </Col>
            <Col
              xl="6"
              className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
            >
              <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
                <Label className="mb-0" for="search-invoice">
                  Search:
                </Label>
                <Input id="search-invoice" className="ml-50 w-100" type="text" value={"Search"} disabled={loader} />
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }
  useEffect(async () => {
    // getSubDealershipData()
    const dealerData = await getDealershipData("SUB-DEALER", 0)
    if (dealerData?.status == 200) {
      setLoader(false)
      dispatch({ type: GET_SUB_DEALERSHIP, payload: dealerData?.data })
      setRenderSubDealership(dealerData?.data.slice(0, 9))
      setCurrentPage(0)
    }
  }, [])
  return (
    <Fragment>
      {/* <Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Search Filter</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="4" sm="4">
                <Label>Choose State</Label>
                <Input
                  type="select"
                  name="select"
                  id="select-basic"
                  size={inputFieldSize}
                  onChange={async (e) => {
                    if (e?.target?.value == "") return
                    setIndianState(e?.target?.value)
                    setIndianCity([])
                    setIndianRto([])
                    const data = await getCityViaState(e?.target?.value)
                    if (data?.status == 200) {
                      setIndianCity(data?.data)
                    }
                  }}
                >
                  {statesListDB?.map((el) => {
                    return <option value={el?.value}>{el?.label}</option>
                  })}
                  <option selected value={""}>
                    Choose State
                  </option>
                </Input>
              </Col>
              {indianCity?.length !== 0 && (
                <Col md="4" sm="4">
                  <Label>Choose City</Label>
                  <Input
                    type="select"
                    name="select"
                    id="select-basic"
                    size={inputFieldSize}
                    onChange={async (e) => {
                      setIndianRto([])
                      const data = await getRtoViaCity(e?.target?.value)
                      console.log("rto Data : ", data?.data)
                      if (data?.status == 200) {
                        setIndianRto(data?.data)
                      }
                    }}
                  >
                    {indianCity?.map((el) => {
                      return <option value={el?.rto_city}>{el?.rto_city}</option>
                    })}
                    <option selected value={""}>
                      Choose City
                    </option>
                  </Input>
                </Col>
              )}
              {indianRto?.length !== 0 && (
                <Col md="4" sm="4">
                  <Label>Choose RTO</Label>
                  <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                    {indianRto?.map((el) => {
                      return <option value={el?.rto_code}>{el?.rto_code}</option>
                    })}
                    <option selected value={""}>
                      Choose Rto
                    </option>
                  </Input>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Fragment> */}
      <Fragment>
        <Card>
          <div className="font-dark pl-1 pt-1 font-weight-bold" style={{ fontSize: "1.5rem" }}>
            Sub-Dealership Table
          </div>
          <Row>
            <Col sm="4"></Col>
            <Col sm="4"></Col>
            <Col sm="4">
              <FormGroup>
                <div className="d-flex align-items-center">
                  <div>Search : </div>
                  <div style={{ width: "75%" }}>
                    <Input value={searchDS} placeholder="search..." onChange={handleSearch} className="ml-1" />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <DataTable
            noHeader
            // pagination
            // subHeader
            responsive
            paginationServer
            columns={dealerListColumns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={CustomPaginationForDealerTable}
            data={renderSubDealership}
            // subHeaderComponent={<CustomHeaderDealerTable />}
          />
          <CustomPaginationForDealerTable />
        </Card>
      </Fragment>
    </Fragment>
  )
}
