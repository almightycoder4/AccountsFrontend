import { Fragment, useEffect, useState } from "react"
import { Card, CardHeader, CardText, CardTitle, CardBody, Col, Label, CustomInput, FormGroup, Input, Row, Button, Spinner, Form } from "reactstrap"
import SelectDealerComp from "./Common/SelectDealerComp"
import BreadCrumbs from "@components/breadcrumbs"
import { MyHandleInfo, MyHandleSuccess } from "./Common/MySweetAlerts"
import { testingDealerList, testingSubDealerList } from "./CofigForms/ConfigurationCommon"
import { useDispatch, useSelector } from "react-redux"
import { GET_DEALERSHIP, GET_SUB_DEALERSHIP } from "./DealershipForms/DealershipStore/actions"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputFeedback from "./Common/InputFeedback"

const size = true
const acType = [
  { label: "Current", value: "current" },
  { label: "Saving", value: "saving" }
]
const bankName = [
  { label: "HDFC", value: "hdfc" },
  { label: "SBI", value: "sbi" },
  { label: "PNB", value: "pnb" },
  { label: "Kotak", value: "kotak" },
  { label: "Union", value: "union" },
  { label: "Hydra", value: "hydra" }
]
const userAccount = [
  { id: 1, role: "account_1", label: "Accountant 1" },
  { id: 2, role: "account_2", label: "Accountant 2" }
]
const userGM = [
  { id: 8, role: "gm_1", label: "General Manager 1" },
  { id: 9, role: "gm_2", label: "General Manager 2" },
  { id: 11, role: "gm_3", label: "General Manager 3" }
]
const userExecutive = [
  { id: 5, role: "executive_1", label: "Executive 1" },
  { id: 6, role: "executive_2", label: "Executive 2" },
  { id: 7, role: "executive_3", label: "Executive 3" }
]
const userOwner = [
  { id: 3, role: "owner_1", label: "Owner 1" },
  { id: 4, role: "owner_2", label: "Owner 2" }
]
export default function NewDealershipUser() {
  //! new D/S user schema
  const NewUserSchema = yup.object().shape({
    name: yup.string().required("Owner name is required"),
    email: yup.string().matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email").required("Owner email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9,]+$/, "Only number allowed")
      .max(10, "Maximum length is 10")
      .min(10, "Minimum length is 10"),
    userRole: yup.string().required('User role required')
  })
  const { register, setValue, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(NewUserSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      mobile:"",
      userRole: "1"
    }
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log("name of change field : ", { [name]: value })
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }
  //! redux imports 
  const {dealership, subDealership} = useSelector((store) => store.dealershipReducer)
  const dispatch = useDispatch()
  // console.log('dealership store : ', dealership, subDealership)
  //! state for D/S & Sub-D/S
  const [dealershipList, setDealership] = useState(dealership?.slice(0, 10))
  const [subDealershipList, setSubDealership] = useState(subDealership?.slice(0, 10))

  //! select dealer state 
  const [dealerId, setDealerId] = useState("")
  const handleDealerId = (e) => {
    const {value} = e?.target
    setDealerId(value)
  }
  //!Type of Dealer state
  const [dealerType, setDealerType] = useState("D/S")
  const changeDealerType = (e) => {
    const { value } = e.target
    setDealerType(value)
  }
  //!Type of Dealer state
  const [userType, setUserType] = useState("accountant")
  const changeUserType = (e) => {
    const { value } = e.target
    setUserType(value)
  }
  const [loaderWhileSubmitNewUser, setLoaderWhileSubmitNewUser] = useState(false)
  const changeLoaderWhileSubmitNewUser = () => {
    setLoaderWhileSubmitNewUser(true)
    setTimeout(() => {
      setLoaderWhileSubmitNewUser(false)
      MyHandleSuccess({
        message: `${
          (userType === "accountant" && "Accountant") ||
          (userType === "generalManager" && "General Manager") ||
          (userType === "executive" && "Executive")
        } Created!`
      })
    }, 2000)
  }

  const [loaderWhileSubmitAcDetails, setLoaderWhileSubmitAcDetails] = useState(false)
  const changeLoaderWhileSubmitAcDetails = () => {
    setLoaderWhileSubmitAcDetails(true)
    setTimeout(() => {
      setLoaderWhileSubmitAcDetails(false)
      MyHandleSuccess({ message: "Account Details Uploaded!" })
    }, 2000)
  }

  //! add account details flag
  const [addAccount, setAddAccount] = useState(false)
  const handleAddAccount = () => {
    setAddAccount(!addAccount)
  }

  const getDealershipFunc = async () => {
    try {
      let data = JSON.stringify({
        "dealerType": "DEALER"
      })
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/filter",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer eyJraWQiOiJIS09XK2dJaGJSNFVjQTNzZUk4RmJHdnByUzVQekJ5bERvQlZxMUl6TGRNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YWYwYmEyMi1jMGRmLTRhZTMtYWUwZS1kNGI2YWM4NTQxZDEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0F3UWd0bnlrOSIsImNsaWVudF9pZCI6IjdhcGVtZGJuMTUyMzcxZGxoaGIyazJpcjFzIiwib3JpZ2luX2p0aSI6IjUxNzQzMjFiLTM4NWEtNDFiZi1iYWE2LWNjNTA2YzljYzUwMCIsImV2ZW50X2lkIjoiOGFlYjg4MmQtMDdlMy00MDAwLWFhMDQtNDljYzFjZTM5NTQ1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MDM3MTg0OCwiZXhwIjoxNjkwNDU4MjQ4LCJpYXQiOjE2OTAzNzE4NDgsImp0aSI6ImI1OTMwM2ZlLWQ2NWUtNDVhZS05ZTcxLTY4Y2I0ZTk0ZjE3ZiIsInVzZXJuYW1lIjoiOWFmMGJhMjItYzBkZi00YWUzLWFlMGUtZDRiNmFjODU0MWQxIn0.aaOBRndGF6ERfAxosksPV7mehMoCMfRm-ERWKR6Utx6b6E3BR4Vh_7TgmgB3e6PamW-TadJ3h9WmRDOfp4-mNO6IKkcdEd5KbfUR3D603ZBpbuZl-9e9mUZxpjgboKOflQzK06FUZJkJsD0bduNRC_ZCfc4RbKlREg0CF-fxow9_vlzVbUcGYhWX2GTHVCxXOnZaRsvbtZVzmAzo0PBIrLZztuiBHtgsmAZntgMx_mVZomk21FvjhLlRllUFbOsWX3uIHBV7SBvR7qRXjuLRJ8Aqbg1EDyqqEFtM-B2jkrJIRbTxpMXjO10nBAHYvIllX2Z7dJnVoNpzYKn31zfEug"
        },
        data: data
      }
      const getDealerships = await axios.request(config)
      let { data: dealerData } = getDealerships
      dealerData = dealerData.dealerships.map((item) => {
        return { ...item?.dealership }
      })
      console.log('dealerData : ', dealerData)
      setDealership(dealerData?.slice(0, 10))
      dispatch({type: GET_DEALERSHIP, payload: dealerData})
    } catch (e) {
      console.log('error at NewDealershipUser : ', e)
    }
  }

  const getSubDealershipData = async() => {
    try {
      let data = JSON.stringify({
        "dealerType": "SUB-DEALER"
      })
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/filter",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer eyJraWQiOiJIS09XK2dJaGJSNFVjQTNzZUk4RmJHdnByUzVQekJ5bERvQlZxMUl6TGRNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YWYwYmEyMi1jMGRmLTRhZTMtYWUwZS1kNGI2YWM4NTQxZDEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0F3UWd0bnlrOSIsImNsaWVudF9pZCI6IjdhcGVtZGJuMTUyMzcxZGxoaGIyazJpcjFzIiwib3JpZ2luX2p0aSI6IjUxNzQzMjFiLTM4NWEtNDFiZi1iYWE2LWNjNTA2YzljYzUwMCIsImV2ZW50X2lkIjoiOGFlYjg4MmQtMDdlMy00MDAwLWFhMDQtNDljYzFjZTM5NTQ1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MDM3MTg0OCwiZXhwIjoxNjkwNDU4MjQ4LCJpYXQiOjE2OTAzNzE4NDgsImp0aSI6ImI1OTMwM2ZlLWQ2NWUtNDVhZS05ZTcxLTY4Y2I0ZTk0ZjE3ZiIsInVzZXJuYW1lIjoiOWFmMGJhMjItYzBkZi00YWUzLWFlMGUtZDRiNmFjODU0MWQxIn0.aaOBRndGF6ERfAxosksPV7mehMoCMfRm-ERWKR6Utx6b6E3BR4Vh_7TgmgB3e6PamW-TadJ3h9WmRDOfp4-mNO6IKkcdEd5KbfUR3D603ZBpbuZl-9e9mUZxpjgboKOflQzK06FUZJkJsD0bduNRC_ZCfc4RbKlREg0CF-fxow9_vlzVbUcGYhWX2GTHVCxXOnZaRsvbtZVzmAzo0PBIrLZztuiBHtgsmAZntgMx_mVZomk21FvjhLlRllUFbOsWX3uIHBV7SBvR7qRXjuLRJ8Aqbg1EDyqqEFtM-B2jkrJIRbTxpMXjO10nBAHYvIllX2Z7dJnVoNpzYKn31zfEug"
        },
        data: data
      }
      const getDealerships = await axios.request(config)
      let { data: dealerData } = getDealerships
      dealerData = dealerData.dealerships.map((item) => {
        return { ...item?.dealership }
      })
      setSubDealership(dealerData?.slice(0, 10))
      dispatch({type: GET_SUB_DEALERSHIP, payload: dealerData})
      // console.log('SubdealerData : ', dealerData)
      // console.log('renderDealerList : ', renderDealerList)
    } catch (e) {
      console.log("error while fetching dealerships : ", e)
    }
  }
  const feildList = ["name", "email", "mobile"]  
  const onSubmit = async (data) => {
    console.log('data getValues : ', data)
    try {
      let configData = JSON.stringify({
        "acplTeamId": 2,
        "userRoleId": Number(data?.userRole),
        "userName": data?.name,
        "userEmail": data?.email,
        "userMobile": data?.mobile,
        "dealershipId": Number(dealerId)
      })
      console.log(configData)
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/users/create',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : configData
      }
      const newDealerUser = await axios.request(config)
      console.log('new dealersip User : ', newDealerUser)
      if (newDealerUser?.status == 200) {
        MyHandleSuccess({ message: "User Created Successfully!" })
        for (let key of feildList) {
          reset(key)
        }
      }
    } catch (e) {
      console.log("error while new user creation : ", e)
        MyHandleInfo({message: 'Unable To Create User!'})
    }
  }

  useEffect(async () => {
    if (dealership?.length == 0) {
      await getDealershipFunc()
    }
    if (subDealership?.length == 0) {
      await getSubDealershipData()
    }
  }, [])

  console.log('dealerID : ', dealerId)
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Users" breadCrumbParent="Forms" breadCrumbActive="View or Create" /> */}
      {/* <Col sm="12"> */}
      <SelectDealerComp
        changeDealerType={changeDealerType}
        dealerType={dealerType}
        testingDealerList={dealershipList}
        testingSubDealerList={subDealershipList}
        dealerID={dealerId}
        handleDealerId={handleDealerId}
      />
      {/* </Col> */}
      {/* <Col> */}
      {dealerId == '' ? <div></div> : <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <div className="d-flex g-2">
            <CustomInput
              type="radio"
              id="exampleCustomRadioUser1"
              name="customRadioDealerType"
              inline
              label="Accountant"
              onChange={changeUserType}
              value="accountant"
              defaultChecked
            />
            <CustomInput
              type="radio"
              id="exampleCustomRadioUser2"
              name="customRadioDealerType"
              inline
              label="General Manager"
              onChange={changeUserType}
              value="generalManager"
            />
            <CustomInput
              type="radio"
              id="exampleCustomRadioUser3"
              name="customRadioDealerType"
              inline
              label="Executive"
              onChange={changeUserType}
              value="executive"
            />
          </div>
        </CardBody>
        <CardHeader className="mt-n2">
          <CardTitle tag="h4">
            {(userType === "accountant" && "Accountant") ||
              (userType === "generalManager" && "General Manager") ||
              (userType === "executive" && "Executive")}{" "}
            Details
          </CardTitle>
        </CardHeader>
        <CardBody className="pt-0 mt-n1">
          <Row>
            <Col sm="3">
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" id="basicInput" placeholder="Enter Name" 
                name="name"
                innerRef={register({ required: true })}
                onChange={handleInputChange}
                />
                {errors?.name && <InputFeedback size={size} message={errors?.name?.message} />}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Email</Label>
                <Input type="text" id="basicInput" placeholder="Enter Email" 
                name="email"
                innerRef={register({ required: true })}
                onChange={handleInputChange}
                />
                {errors?.email && <InputFeedback size={size} message={errors?.email?.message} />}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Mobile</Label>
                <Input type="text" id="basicInput" placeholder="Enter Mobile" 
                name="mobile"
                innerRef={register({ required: true })}
                onChange={handleInputChange}
                />
                {errors?.mobile && <InputFeedback size={size} message={errors?.mobile?.message} />}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Role Type</Label>
                <Input type="select" id="select-basic"
                name="userRole"
                innerRef={register({ required: true })}
                onChange={handleInputChange}
                >
                  {userType === "accountant" &&
                    userAccount?.map((item) => {
                      return <option value={item?.id}>{item?.label}</option>
                    })}
                  {userType === "generalManager" &&
                    userGM?.map((item) => {
                      return <option value={item?.id}>{item?.label}</option>
                    })}
                  {userType === "executive" &&
                    userExecutive?.map((item) => {
                      return <option value={item?.id}>{item?.label}</option>
                    })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <Button color='relief-primary'>Add {(userType === "accountant" && "Accountant") || (userType === "generalManager" && "General Manager") || (userType === "executive" && "Executive")}</Button> */}
              <Button.Ripple color="primary" outline disabled={loaderWhileSubmitNewUser} type="submit">
                {loaderWhileSubmitNewUser ? (
                  <>
                    <Spinner size="sm" type="grow" />
                    <span className="ml-50">
                      Creating New{" "}
                      {(userType === "accountant" && "Accountant") ||
                        (userType === "generalManager" && "General Manager") ||
                        (userType === "executive" && "Executive")}
                      ...
                    </span>
                  </>
                ) : (
                  <>
                    Add New{" "}
                    {(userType === "accountant" && "Accountant") ||
                      (userType === "generalManager" && "General Manager") ||
                      (userType === "executive" && "Executive")}
                  </>
                )}
              </Button.Ripple>
            </Col>
          </Row>
          <Row className="pt-1">
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
          <>
            <CardHeader className="mt-n2">
              <CardTitle tag="h4">Account Details</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 mt-n1">
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label>A/C No.</Label>
                    <Input type="text" id="basicInput" placeholder="Enter A/C no." />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <Label>A/C Type</Label>
                    <Input type="select" name="select" id="select-basic">
                      {acType?.map((el) => {
                        return <option value={el?.value}>{el?.label}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <Label>IFSC No.</Label>
                    <Input type="text" id="basicInput" placeholder="Enter IFSC no." />
                  </FormGroup>
                </Col>
                <Col sm="4">
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
              <Row>
                <Col>
                  {/* <Button color="relief-primary">Add Account Details</Button> */}
                  <Button.Ripple color="primary" outline disabled={loaderWhileSubmitAcDetails} onClick={changeLoaderWhileSubmitAcDetails}>
                    {loaderWhileSubmitAcDetails ? (
                      <>
                        <Spinner size="sm" type="grow" />
                        <span className="ml-50">Uploading Account Details</span>
                      </>
                    ) : (
                      <>Add Account Details</>
                    )}
                  </Button.Ripple>
                </Col>
              </Row>
              {userType === "executive" && (
                <Row className="mt-1">
                  <Col>
                    <CardText className="mb-0">View All Executive</CardText>
                    <CustomInput
                      type="switch"
                      label={<Label />}
                      className="custom-control-danger"
                      id="icon-danger"
                      name="icon-danger"
                      inline
                      defaultChecked
                    />
                  </Col>
                </Row>
              )}
            </CardBody>
          </>
        )}
      </Form>
      </Card>}
      {/* </Col> */}
    </Fragment>
  )
}
