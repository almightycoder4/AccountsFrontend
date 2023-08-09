import { Fragment, useEffect, useRef, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { Row, Col, Input, CardBody, CardHeader, CardTitle, Card, Label, CustomInput, FormGroup } from "reactstrap"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { dealerListColumns, renderDealerList } from "./MockDealerList.js"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { GET_DEALERSHIP } from "../../myForms/DealershipForms/DealershipStore/actions/index.js"
import { statesListDB } from "../../../aegisUtils/index.js"
import { getCityViaState, getRtoViaCity } from "../../../aegisUtils/sharedFunc.js"
import { getDealershipData } from "./api.js"

const inputFieldSize = "sm"

// ! Status of D/S
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary"
}

export default function Dealership() {
  const { dealership } = useSelector((store) => store.dealershipReducer)
  // console.log('renderDealerList : ', renderDealerList)

  const [loader, setLoader] = useState(true)
  //! limit and offset for api call
  const [limit, setLimit] = useState(9)
  const [offset, setOffset] = useState(0)
  // const [searchD, setSearchD] = useState('')
  const ref = useRef()
  const [searchD, setSearchD] = useState("")

  //! state city and rto states
  const [indianState, setIndianState] = useState("")
  const [indianCity, setIndianCity] = useState([])
  const [indianRto, setIndianRto] = useState([])

  //!redux imports
  const dispatch = useDispatch()

  //! pagination states
  const [renderDealership, setRenderDealership] = useState([])
  // const [totalPage, setTotalPage] = useState(0)
  const [currentPageRange, setCurrentPageRange] = useState([0, 1, 2, 3, 4])
  const [currentPage, setCurrentPage] = useState(0)

  const handleSearch = (e) => {
    let { value } = e?.target
    setSearchD(value)
    // console.log("handleSearch : name : value ", name, value)
    if (ref?.current) {
      clearTimeout(ref?.current)
    }
    ref.current = setTimeout(async () => {
      let dealerData
      if (value == "") {
        dealerData = await getDealershipData("DEALER", 0)
      } else {
        dealerData = await getDealershipData("DEALER", 0, value)
      }

      let payloadData
      if (dealerData?.status == 200) {
        // console.log("get dealership via search : ", dealerData?.data)
        payloadData = dealerData?.data
      } else {
        payloadData = []
      }
      dispatch({ type: GET_DEALERSHIP, payload: payloadData })
      setRenderDealership(payloadData.slice(0, 9))
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
    console.log("listOne : ", listOne)
    setCurrentPageRange(listOne)
    return true
  }

  const handlePagination = async (pageLimit, pageNum) => {
    // let totalPage = Math.ceil(dealership?.length / (+pageLimit))
    //change current page
    //change total page numbers
    //change limit
    let dealershipList
    let checkForGetCall = checkPageNumData(+pageNum)
    if (checkForGetCall) {
      setLoader(true)
      let dealerData = await getDealershipData("DEALER", pageNum * 9)
      if (dealerData?.status == 200) {
        dealershipList = dealerData?.data
        dispatch({ type: GET_DEALERSHIP, payload: dealerData?.data })
        setLoader(false)
      }
    } else {
      dealershipList = dealership
    }
    let pageNumUI = pageNum
    pageNum = pageNum % 5

    console.log("pageLimit pageNum : ", pageLimit, pageNum)
    let least = +pageNum * pageLimit
    let max = +pageNum * pageLimit + pageLimit

    setRenderDealership(dealershipList?.slice(least, max))
    // setTotalPage(+totalPage * 2)//! set total pages
    setCurrentPage(+pageNumUI) //! set current pages
    // setLimit(+pageLimit)//! set page limit
  }

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
          // console.log('page selected : ', page)
          // setOffset(page?.selected)
          // handlePageChange(limit, page?.selected)
          handlePagination(limit, page?.selected)
        }}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={"pagination react-paginate justify-content-end my-2 pr-1"}
        disabled={loader}
      />
    )
  }

  useEffect(async () => {
    const dealerData = await getDealershipData("DEALER", 0)
    if (dealerData?.status == 200) {
      setLoader(false)
      // let totalPage = Math.ceil(dealerData?.data?.length / limit)

      dispatch({ type: GET_DEALERSHIP, payload: dealerData?.data })
      setRenderDealership(dealerData?.data.slice(0, 9))
      // setTotalPage(totalPage * 2)
      setCurrentPage(0)
    }
    // console.log('dealer data : ', dealerData?.data)
  }, [])
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Dealership" breadCrumbParent="Dashboard" breadCrumbActive="Dealership" /> */}
      <Fragment>
        {/* <Card>
          <CardHeader>
            <CardTitle>Search Filter</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="4" sm="4">
                <Label>Choose State</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize}
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
                  <option selected value={""}>Choose State</option>
                </Input>
              </Col>
              {indianCity?.length !== 0 && <Col md="4" sm="4">
                <Label>Choose City</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize} 
                onChange={async (e) => {
                  setIndianRto([])
                  const data = await getRtoViaCity(e?.target?.value)
                  console.log('rto Data : ', data?.data)
                  if (data?.status == 200) {
                    setIndianRto(data?.data)
                  }
                }}
                >
                  {indianCity?.map((el) => {
                    return <option value={el?.rto_city}>{el?.rto_city}</option>
                  })}
                  <option selected value={""}>Choose City</option>
                </Input>
              </Col>}
              {indianRto?.length !== 0 && <Col md="4" sm="4">
                <Label>Choose RTO</Label>
                <Input type="select" name="select" id="select-basic" size={inputFieldSize}>
                  {indianRto?.map((el) => {
                    return <option value={el?.rto_code}>{el?.rto_code}</option>
                  })}
                  <option selected value={""}>Choose Rto</option>
                </Input>
              </Col>}
            </Row>
          </CardBody>
        </Card> */}
      </Fragment>
      <Fragment>
        <Card>
          <div className="font-dark pl-1 pt-1 font-weight-bold" style={{ fontSize: "1.5rem" }}>
            Dealership Table
          </div>
          <Row>
            <Col sm="4"></Col>
            <Col sm="4"></Col>
            <Col sm="4">
              <FormGroup>
                <div className="d-flex align-items-center">
                  <div>Search : </div>
                  <div style={{ width: "75%" }}>
                    <Input value={searchD} placeholder="search..." onChange={handleSearch} className="ml-1" />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <DataTable
            noHeader
            responsive
            paginationServer
            columns={dealerListColumns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={renderDealership}
          />
          <CustomPaginationForDealerTable />
        </Card>
      </Fragment>
    </Fragment>
  )
}
