import { useEffect, useState } from "react"
import { selectThemeColors } from "@utils"
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Label, CustomInput, FormGroup, Input, Button, Spinner, Form } from "reactstrap"
import Select from "react-select"
import { MyHandleInfo, MyHandleSuccess } from "../Common/MySweetAlerts"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputFeedback from "../Common/InputFeedback"
import { getConfigurations } from "../CofigForms/ConfigurationStore/actions"
import { configApiDataConvertor, accessToken } from "../../../aegisUtils"
import { useDispatch, useSelector } from "react-redux"
import { GET_OEM, GET_RTO } from "../CofigForms/ConfigurationStore/actions/actionType"
import axios from "axios"

const cities = {
  "Uttar Pradesh": [
    { label: "Lucknow", value: "Lucknow" },
    { label: "Prayagraj", value: "Prayagraj" },
    { label: "Kanpur", value: "Kanpur" },
    { label: "Agra", value: "Agra" },
    { label: "Bareli", value: "Bareli" }
  ],
  "Haryana": [
    { label: "Gurugram", value: "Gurugram" },
    { label: "Faridabad", value: "Faridabad" },
    { label: "Rohtak", value: "Rohtak" },
    { label: "Hisar", value: "Hisar" },
    { label: "Ambala", value: "Ambala" }
  ],
  "Punjab": [
    { label: "Amritsar", value: "Amritsar" },
    { label: "Ludhiana", value: "Ludhiana" },
    { label: "Jalandhar", value: "Jalandhar" },
    { label: "Kapurthala", value: "Kapurthala" },
    { label: "Bathinda", value: "Bathinda" }
  ],
  "Bihar": [
    { label: "Patna", value: "Patna" },
    { label: "Darbhanga", value: "Darbhanga" },
    { label: "Gaya", value: "Gaya" },
    { label: "Katihar", value: "Katihar" },
    { label: "Muzaffarpur", value: "Muzaffarpur" }
  ],
  "Madhya Pradesh": [
    { label: "Jabalpur", value: "Jabalpur" },
    { label: "Indore", value: "Indore" },
    { label: "Bhopal", value: "Bhopal" },
    { label: "Seoni", value: "Seoni" },
    { label: "Gwalior", value: "Gwalior" }
  ],
  "Telangana": [
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Warangal", value: "Warangal" },
    { label: "Karimnagar", value: "Karimnagar" },
    { label: "Nalgonda", value: "Nalgonda" },
    { label: "Nizamabad", value: "Nizamabad" }
  ],
  "Kerala": [
    { label: "Kochi", value: "Kochi" },
    { label: "Thrisar", value: "Thrisar" },
    { label: "Kollam", value: "Kollam" },
    { label: "Kannur", value: "Kannur" },
    { label: "Kottayam", value: "Kottayam" }
  ]
}

const states = [
  { label: "U.P.", value: "Uttar Pradesh" },
  { label: "Haryana", value: "Haryana" },
  { label: "Punjab", value: "Punjab" },
  { label: "Bihar", value: "Bihar" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Telangana", value: "Telangana" },
  { label: "Kerala", value: "Kerala" }
]

const required = (
  <div
    style={{
      content: " *",
      color: "red"
    }}
  ></div>
)

const adjustColMargin = (obj) => {
  console.log("error obj check : ", obj)
  // if (obj) {
  //   return 'mt-n1'
  // }
  return "mt-n0.5 mb-n0.5"
}
const size = true
// const marginTop = "mt-1"
// const marginLeft = 'ml-n2'

const marginTop = "mt-n2"
const acType = [
  { label: "Self", value: "SELF" },
  { label: "Firm", value: "FIRM" }
]
const bankName = [
  { label: "HDFC", value: "hdfc" },
  { label: "SBI", value: "sbi" },
  { label: "PNB", value: "pnb" },
  { label: "Kotak", value: "kotak" },
  { label: "Union", value: "union" },
  { label: "Hydra", value: "hydra" }
]
export default function DealershipDetails() {
  //! Sign-up Dealership Schema
  const SignupSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email")
      .required("Email required"),
    state: yup.string().required("State required"),
    city: yup.string().required("City required"),
    pincode: yup
      .string()
      .matches(/^[0-9,]+$/, "Only number allowed")
      .min(6, "Pincode length is atleast 6")
      .max(6, "Pincode length is atleast 6")
      .required("Pincode required"),
    address1: yup.string().min(6, "Address 1 is too short").required("Address required"),
    address2: yup.string(),
    mobile: yup
      .string()
      .matches(/^[0-9,]+$/, "Only number allowed")
      .max(10, "Maximum length is 10")
      .min(10, "Minimum length is 10"),
    paymentType: yup.string(),
    rtoId: yup.string(),
    oemId: yup.string(),
    distributorId: yup.string(),
    ownerName: yup.string().required("Owner name is required"),
    ownerEmail: yup
      .string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email")
      .required("Owner email is required"),
    ownerMobile: yup
      .string()
      .matches(/^[0-9,]+$/, "Only number allowed")
      .max(10, "Maximum length is 10")
      .min(10, "Minimum length is 10")
  })
  //! new dealership react-hook-form
  const { register, setValue, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      state: "Madhya Pradesh",
      city: "Bhopal",
      pincode: "",
      address1: "",
      address2: "",
      mobile: "",
      paymentType: "FULL PAY",
      rtoId: "",
      oemId: "",
      distributorId: "",
      userRoleId: 3,
      acplTeamId: 2,
      ownerName: "",
      ownerEmail: "",
      ownerMobile: ""
    }
  })
  const feildList = ["name", "email", "pincode", "address1", "ownerName", "ownerEmail", "ownerMobile"]

  const [myState, setMyState] = useState("Madhya Pradesh")
  const [myCityList, setMyCityList] = useState([...cities["Madhya Pradesh"]])
  const [distributorList, setDistributorList] = useState([])
  const { rto, oem } = useSelector((store) => store.configReducer)
  const dispatch = useDispatch()

  //! New D/S form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log("name of change field : ", { [name]: value })
    if (name === "state") {
      const tempList = [...cities[value]]
      setMyCityList([...tempList])
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }
  //! add Account flag
  const [addAccount, setAddAccount] = useState(false)
  const handleAddAccount = () => {
    setAddAccount(!addAccount)
  }
  // const handleInputBlur = async (e) => {
  //   console.log("name of fields : ", e.target)
  //   await trigger(e.target.name)
  // }
  const createOwner = async (dealerId, userName, userEmail, userMobile) => {
    console.log("createOwner : ", dealerId, userName, userEmail, userMobile)
    try {
      let ownerData = JSON.stringify({
        acplTeamId: 2,
        userRoleId: 3,
        userName: userName,
        userEmail: userEmail,
        userMobile: userMobile,
        dealershipId: dealerId
      })
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/users/create",
        headers: {
          "Content-Type": "application/json"
        },
        data: ownerData
      }
      const newOwner = await axios.request(config)
      console.log("new owner created : ", newOwner)
      return 200
    } catch (e) {
      console.log("error while creating new owner : ", e)
      return 404
    }
  }

  const onSubmit = async (data) => {
    console.log("getValues : ", data)
    try {
      if (Object.keys({ ...errors }).length === 0) {
        let payloadData = JSON.stringify({
          name: data?.name,
          mobile: data?.mobile,
          email: data?.email,
          city: data?.city,
          state: data?.state,
          address: data?.address1,
          pincode: data?.pincode,
          oemID: Number(data?.oemId),
          paymentType: data?.paymentType,
          distributorID: Number(data?.distributorId),
          rtoID: Number(data?.rtoId),
          isActive: 1,
          documents: [
            {
              documentType: "AADHAAR",
              documentUrl: "asdas.com",
              documentReference: "askdja"
            },
            {
              documentType: "PAN",
              documentUrl: "asdas.com",
              documentReference: "asdasdasd"
            },
            {
              documentType: "CANCELLED CHEQUE",
              documentUrl: "asdasasaas.com",
              documentReference: "asasdasd"
            }
          ]
        })
        const bearer = "Bearer " + accessToken
        console.log("payload Data : ", payloadData)
        let config = {
          method: "post",
          url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/create",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer
          },
          data: payloadData
        }

        const newDealerRes = await axios.request(config)
        console.log("new dealership creation res : ", newDealerRes?.data)
        const {
          data: { message }
        } = newDealerRes
        console.log("new newDealerRes message : ", message)

        if (message) {
          console.log("new newDealerRes message : ", message)
          const newOwner = await createOwner(message?.dealershipId, data?.ownerName, data?.ownerEmail, data?.ownerMobile)
          console.log("newOwner res : ", newOwner)
          if (newOwner == 200) {
            MyHandleSuccess({ message: "Dealership Created!" })
            for (let key of feildList) {
              reset(key)
            }
          }
        }
        // MyHandleSuccess({ message: "Dealership Created!" })
        // for (let key of feildList) {
        //   reset(key)
        // }
      }
    } catch (e) {
      console.log("error in newDealer : ", e)
      MyHandleInfo({message: "Unable to Create Dealership!"})
    }
  }
  //! New D/S form handlers end

  const [dealerType, setDealerType] = useState("D/S")
  const changeDealerType = (e) => {
    const { value } = e.target
    setDealerType(value)
  }
  const [loaderWhileSubmit, setLoaderWhileSubmit] = useState(false)
  const changeLoaderWhileSubmit = () => {
    setLoaderWhileSubmit(true)
    setTimeout(() => {
      setLoaderWhileSubmit(false)
      MyHandleSuccess({ message: "Dealership Created!" })
    }, 2000)
  }

  const getOemAndRto = async () => {
    try {
      let oem = await getConfigurations({
        type: "getAll",
        param: "oem"
      })

      let rto = await getConfigurations({
        type: "getAll",
        param: "rto"
      })

      const oemData = configApiDataConvertor({ list: oem?.data, key: "oem" })
      const rtoData = configApiDataConvertor({ list: rto?.data, key: "rto" })
      // console.log('new rto oem Id ', rtoData, oemData)

      dispatch({ type: GET_RTO, payload: rtoData })
      dispatch({ type: GET_OEM, payload: oemData })
    } catch (e) {
      console.log("error while getting oem and rto : ", e)
    }
  }

  const getDistributor = async () => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/distributor/bulk"
      }

      const distributorData = await axios.request(config)
      // console.log("distributorData : ", distributorData?.data?.distributors)
      const distData = configApiDataConvertor({ list: distributorData?.data?.distributors, key: "distributor" })
      // console.log("distributor converted data : ", distData)
      setDistributorList(distData)
    } catch (e) {
      console.log("error while fetching Distrubutor : ", e)
    }
  }
  // console.log('city name : ', cities?.[myState]?.[0]?.value)
  // console.log("getValues : ", getValues())
  // console.log("form errrrros : ", errors)
  // console.log('city : ', cities[getValues()?.state])
  useEffect(() => {
    getOemAndRto()
    getDistributor()
  }, [])
  return (
    <>
      {/* <Col sm="12"> */}
      <Row>
        <Col>
          <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle tag="h6">Dealership Details</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="d-flex g-2">
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadioDealer1"
                    name="customRadioDealer"
                    inline
                    label="Dealership"
                    onChange={changeDealerType}
                    value="D/S"
                    defaultChecked
                  />
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadioDealer2"
                    name="customRadioDealer"
                    inline
                    label="Sub - Dealership"
                    onChange={changeDealerType}
                    value="Sub-D/S"
                  />
                </div>
                <Row className="mt-1">
                  {/* Name of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label className="requiredClass">Name</Label>
                      <Input
                        placeholder="Enter Name"
                        id="name"
                        name="name"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        // onBlur={handleInputBlur}
                      />
                      {errors?.name && <InputFeedback size={size} message={errors?.name?.message} />}
                    </FormGroup>
                  </Col>
                  {/* Email of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        placeholder="Enter Email"
                        id="email"
                        name="email"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        // onBlur={handleInputBlur}
                      />
                      {errors?.email && <InputFeedback size={size} message={errors?.email?.message} />}
                    </FormGroup>
                  </Col>
                  {/* Mobile of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>Mobile</Label>
                      <Input
                        placeholder="Enter Mobile"
                        id="mobile"
                        name="mobile"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        // onBlur={handleInputBlur}
                      />
                      {errors?.mobile && <InputFeedback size={size} message={errors?.mobile?.message} />}
                    </FormGroup>
                  </Col>
                  {/* OEM of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>OEM</Label>
                      <Input type="select" id="select-basic" name="oemId" innerRef={register({ required: true })} onChange={handleInputChange}>
                        {oem?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                      </Input>
                      {errors?.oemId && <InputFeedback size={size} message={errors?.oemId?.message} />}
                    </FormGroup>
                  </Col>
                  {/* Distributor of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>Distributor</Label>
                      <Input
                        type="select"
                        id="select-basic"
                        name="distributorId"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        defaultValue={"Haryana"}
                      >
                        {distributorList?.map((el) => {
                          return <option value={el?.id}>{el?.distributor_name}</option>
                        })}
                      </Input>
                      {errors?.distributorId && <InputFeedback size={size} message={errors?.distributorId?.message} />}
                    </FormGroup>
                  </Col>
                  {/* Payment Type of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>Payment Type</Label>
                      <Input
                        type="select"
                        id="select-basic"
                        name="paymentType"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        defaultValue={"FULL PAY"}
                      >
                        <option value="FULL PAY">Full Pay</option>
                        <option value="CUT & PAY">Cut & Pay</option>
                      </Input>
                      {errors?.paymentType && <InputFeedback size={size} message={errors?.paymentType?.message} />}
                    </FormGroup>
                  </Col>
                  {/* State of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>State</Label>
                      <Input
                        type="select"
                        id="select-basic"
                        name="state"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        defaultValue={"Haryana"}
                      >
                        {states?.map((el) => {
                          return <option value={el?.value}>{el?.label}</option>
                        })}
                      </Input>
                      {errors?.state && <InputFeedback size={size} message={errors?.state?.message} />}
                    </FormGroup>
                  </Col>
                  {/* City of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="select"
                        id="select-basic"
                        name="city"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        // defaultValue={'Gurugram'}
                      >
                        {myCityList?.map((el, idx) => {
                          if (idx === 0) {
                            return (
                              <option selected value={el?.value}>
                                {el?.label}
                              </option>
                            )
                          }
                          return <option value={el?.value}>{el?.label}</option>
                        })}
                      </Input>
                      {errors?.city && <InputFeedback size={size} message={errors?.city?.message} />}
                    </FormGroup>
                  </Col>
                  {/* RTO Type of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>RTO</Label>
                      <Input type="select" id="select-basic" name="rtoId" innerRef={register({ required: true })} onChange={handleInputChange}>
                        {rto?.map((item) => {
                          return (
                            <option value={item?.id}>
                              {item?.rto_state} - {item?.rto_city}
                            </option>
                          )
                        })}
                      </Input>
                      {errors?.rtoId && <InputFeedback size={size} message={errors?.rtoId?.message} />}
                    </FormGroup>
                  </Col>
                  {/* Pincode of D/S or Sub-D/S */}
                  <Col xl="4" md="6" sm="12">
                    <FormGroup>
                      <Label>Pincode</Label>
                      <Input
                        placeholder="Enter Pincode"
                        id="pincode"
                        name="pincode"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                        // onBlur={handleInputBlur}
                      />
                      {errors?.pincode && <InputFeedback size={size} message={errors?.pincode?.message} />}
                    </FormGroup>
                  </Col>
                  {/* If Sub-D/S then choose D/S*/}
                  {dealerType === "Sub-D/S" && (
                    <Col xl="4" md="6" sm="12" className={adjustColMargin(errors)}>
                      <FormGroup>
                        <Label>Sub D/S</Label>
                        <Select theme={selectThemeColors} defaultValue={cities[myState][0].value} options={cities[myState]} isClearable={false} />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
                <Row>
                  {/* Address 1 of D/S or Sub-D/S */}
                  <Col sm="12">
                    <FormGroup>
                      <Label>Address 1</Label>
                      <Input
                        placeholder="Address 1"
                        id="address1"
                        name="address1"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    {errors?.address1 && <InputFeedback size={size} message={errors?.address1?.message} />}
                  </Col>
                </Row>
                <Row>
                  {/* Address 2 of D/S or Sub-D/S */}
                  <Col sm="12">
                    <FormGroup>
                      <Label>Address 2 {"(optional)"}</Label>
                      <Input
                        placeholder="Address 2"
                        id="address2"
                        name="address2"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                      />
                      {errors?.address2 && <InputFeedback size={size} message={errors?.address2?.message} />}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardHeader className="mt-n3">
                <CardTitle tag="h6">{dealerType == "D/S" ? "Dealership Documents" : "Sub-Dealership Documents"}</CardTitle>
              </CardHeader>
              <CardBody className="mt-n1">
                <Row>
                  {/* Enter D/S IFSC */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>IFSC</Label>
                      <Input type="text" id="basicInput" placeholder="IFSC" />
                    </FormGroup>
                  </Col>
                  {/* Upload D/S Passbook */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>Passbook</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser1" name="customFile1" />
                    </FormGroup>
                  </Col>
                  {/* Enter PAN No. */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>PAN</Label>
                      <Input type="text" id="basicInput" placeholder="PAN" />
                    </FormGroup>
                  </Col>
                  {/* Upload PAN */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>Upload Pan</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser2" name="customFile2" />
                    </FormGroup>
                  </Col>
                  {/* Enter GSTIN No. */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>GSTIN No.</Label>
                      <Input type="text" id="basicInput" placeholder="GSTIN No." />
                    </FormGroup>
                  </Col>
                  {/* Upload D/S GSTIN */}
                  <Col sm="3">
                    <FormGroup>
                      <Label>Upload GSTIN</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser3" name="customFile3" />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardHeader className="mt-n3">
                <CardTitle>Dealership Owner</CardTitle>
              </CardHeader>
              <CardBody className="mt-n1">
                <Row>
                  <Col sm="4">
                    {/* D/S Owner Name */}
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        type="text"
                        id="ownerName"
                        placeholder="Enter Name"
                        name="ownerName"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                      />
                      {errors?.ownerName && <InputFeedback size={size} message={errors?.ownerName?.message} />}
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    {/* D/S Owner Email */}
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="text"
                        id="ownerEmail"
                        placeholder="Enter Email"
                        name="ownerEmail"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                      />
                      {errors?.ownerEmail && <InputFeedback size={size} message={errors?.ownerEmail?.message} />}
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    {/* D/S Owner Mobile */}
                    <FormGroup>
                      <Label>Mobile</Label>
                      <Input
                        type="text"
                        id="ownerMobile"
                        placeholder="Enter Mobile"
                        name="ownerMobile"
                        innerRef={register({ required: true })}
                        onChange={handleInputChange}
                      />
                      {errors?.ownerMobile && <InputFeedback size={size} message={errors?.ownerMobile?.message} />}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className={addAccount ? "mb-n1" : ""}>
                  <Col>
                    <CustomInput
                      type="checkbox"
                      className="custom-control-Primary"
                      id="addAccountFlag"
                      label="Add Account Details"
                      onClick={handleAddAccount}
                      defaultChecked={addAccount}
                    />
                  </Col>
                </Row>
              </CardBody>
              {addAccount && (
                <CardHeader className="mt-n2">
                  <CardTitle>Owner Accounts Details</CardTitle>
                </CardHeader>
              )}
              <CardBody className="mt-n2">
                {addAccount && (
                  <Row>
                    <Col sm="3">
                      {/* D/S Owner A/C no. */}
                      <FormGroup>
                        <Label>A/C no.</Label>
                        <Input type="text" id="basicInput" placeholder="Enter A/C no." />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>A/C type</Label>
                        <Input type="select" name="select" id="select-basic">
                          {acType?.map((el) => {
                            return <option value={el?.value}>{el?.label}</option>
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>IFSC</Label>
                        <Input type="text" id="basicInput" placeholder="Enter IFSC no." />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Bank Name</Label>
                        <Input type="select" name="select" id="select-basic">
                          {bankName?.map((el) => {
                            return <option value={el?.value}>{el?.label}</option>
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {addAccount && (
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Aadhar No.</Label>
                        <Input type="text" id="basicInput" placeholder="Aadhar no." />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Upload Aadhar</Label>
                        <CustomInput type="file" id="exampleCustomFileBrowser1" name="customFile1" />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Canceled Check</Label>
                        <Input type="text" id="basicInput" placeholder="Canceled check" />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Upload Check</Label>
                        <CustomInput type="file" id="exampleCustomFileBrowser2" name="customFile2" />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>GSTIN No.</Label>
                        <Input type="text" id="basicInput" placeholder="GSTIN No." />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label>Upload GSTIN</Label>
                        <CustomInput type="file" id="exampleCustomFileBrowser3" name="customFile3" />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <Button.Ripple
                      color="primary"
                      outline
                      disabled={loaderWhileSubmit}
                      // onClick={changeLoaderWhileSubmit}
                      type="submit"
                    >
                      {loaderWhileSubmit ? (
                        <>
                          <Spinner size="sm" type="grow" />
                          <span className="ml-50">Creating New {dealerType === "D/S" ? "Dealership" : "Sub-Dealership"}...</span>
                        </>
                      ) : (
                        <>Add New {dealerType === "D/S" ? "Dealership" : "Sub-Dealership"}</>
                      )}
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Form>
          </Card>
        </Col>
      </Row>
      {/* </Col> */}
    </>
  )
}

/* <Select
                        theme={selectThemeColors}
                        defaultValue={"Gurugram"}
                        options={cities?.[myState]}
                        id="city"
                        name="city"
                        innerRef={register({ required: true })}
                        // onChange={handleInputChange}
                        onChange={(e) => {
                          const newEvent = { target: { name: "city", value: e.value } }
                          handleInputChange(newEvent)
                        }}
                        // onBlur={handleInputBlur}
                      /> */
