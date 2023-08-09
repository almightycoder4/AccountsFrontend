import { Fragment, useState } from "react"
import CardAction from "@components/card-actions"
import { Form, CardBody, Row, Col, Label, CustomInput, FormGroup, Input, Button, Spinner, Badge } from "reactstrap"
import InputFeedback from "../../Common/InputFeedback"
import { notifyInfo, notifySuccess } from "../../Common/MyToasts"
import { useDispatch, useSelector } from "react-redux"
import { getFuelTypeByName } from "@aegisUtils/dataFormat"
import { validatePayOut } from "./payOutUtils"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import NewPayOutTable from "./NewPayOutTable"
import PrevPayOutTable from "./PrevPayOutTable"
import { checkConfigPattern, makeErrorInBulk } from "../ConfigurationCommon"
import { PUSH_PAYOUT } from "../ConfigurationStore/actions/actionType"
import { resetConfigSelectInput } from "../ConfigurationCommon/Sharing"
import { ConvertToPayoutPayload } from "@aegisUtils"
import axios from 'axios'
import { accessToken } from "@env/env"
import { getModelViaInsurer, getVariantViaInsurer } from "../ConfigurationCommon/api"

const inputFieldSize = 'sm'
const border_css = "border border-gray rounded-sm m-1 p-1"
const errorVar = !true
const marginTop = errorVar ? "mt-n1" : "mt-0.5"
const size = true

export default function PayOutConfig({dealerID}) {
  const { rto, insurer, policyType, oem, bodyType, fuelType, models, variants } = useSelector((store) => store.configReducer)
  const dispatch = useDispatch()

  //! model N variant Via Insurer
  const [insurerModel, setInsurerModel] = useState([])
  const [insurerVariant, setInsurerVariant] = useState([])

  //! State to handle Visibility New Pay-Out List
  const [newPayOutList, setNewPayOutList] = useState(true)
  //! State to handle Visibility Older Pay-Out List
  const [olderPayOutList, setOlderPayOutList] = useState(true)
  //! Pay-Out type controller state
  const [payOutType, setPayOutType] = useState("fixed")

  //! Pay-Out Form and its functions
  const { errors, getValues, setValue, register, handleSubmit } = useForm({
    resolver: yupResolver(yup.object().shape(validatePayOut)),
    mode: "onTouched",
    defaultValues: {
      rto: "none",
      insurer: "none",
      policyType: "none",
      oemId: "none",
      bodyType: "none",
      fuelType: "none",
      model: "none",
      variant: "none",
      payOutType: "fixed",
      fixed: "",
      percentage: "",
      dealerID: dealerID
    }
  })
  const [storeNewPayOut, setStoreNewPayOut] = useState([])
  const uploadNewPayOutConfig = () => {
    dispatch({type: PUSH_PAYOUT, payload: storeNewPayOut})
    setStoreNewPayOut([])
  } 

  //! Error State (which helps to set errors on rto->insurer->policyType->oemId->bodyType->fuelType->model->variant);
  const [myFormError, setMyFormError] = useState({})

  //! Check Pattern of Input fields
  const [checkPatternValid, setCheckPattern] = useState(false)

  //! Function to create an object of {field : 'error message'}
  const setGroupError = (array, value) => {
    let tempObj = {}
    for (let fields of array) {
     tempObj[fields] = { message: value }
    }
    return tempObj
  }  
  //! Pay-Out Form handler start
  const payOutInputHandler = (e) => {
    let { name, value } = e.target
    // console.log("name - value", `${name} - ${value}`)
    if (name === "payOutType") {
      setPayOutType(value)
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }
  //! Pay-Out Handlers End

  //! Reset Fixed || Percentage Pay-Out
  const resetPayOutValue = () => {
    if (payOutType === "fixed") {
      setValue("fixed", '')
    } else {
      setValue("percentage", '')
    }
  }

  //! Verifier before creating a configuration
  const payOutPushVerifier = () => {
    if (getValues().payOutType === 'percentage') {
     if (errors.percentage || getValues().percentage === '') return true
    }
    if (getValues().payOutType === 'fixed') {
     if (errors.fixed || getValues().fixed === '') return true
    }
    return false
   }

  //! Actions on created configs Starts
  //? Will update a value in single Configuration
  const updateConfig = (id, name, value) => {
    let updated = [...storeNewPayOut].map((el) => {
      if (el.id === id) {
        return { ...el, [name]: value }
      }
      return el
    })
    // notifyInfo({message: 'Pay-Out Configuration Updated'})
    // console.log([...updated])
  }
  //? Will update a acpl value in a single Configuration
  const updatePayOutValue = (id, data) => {
    // console.log('updatePayOutValue', id, data)
    let updated = [...storeNewPayOut].map((el) => {
      if (el.id === id) {
        return {...el, ...data}
      }
      return el
    })
    notifyInfo({message: 'Pay-Out Value Updated'})
    setStoreNewPayOut([...updated])
  }
  //? Will Delete a single Configuration
  const deleteConfig = (id) => {
    // console.log('delete id : ',id);
    let updated = [...storeNewPayOut].filter((el) => {
      if (el.id !== id) {
        return el
      }
    })
    notifyInfo({message: 'Pay-Out Configuration Deleted'})
    setStoreNewPayOut([...updated])
  }
  //! Actions on created configs Ends

  const changePayOutType = (e) => {
    const { value } = e.target
    setPayOutType(value)
  }
  const [loaderWhileSubmit, setLoaderWhileSubmit] = useState(false)
  const changeLoaderWhileSubmit = () => {
    setLoaderWhileSubmit(true)
    setTimeout(() => {
      setLoaderWhileSubmit(false)
      notifySuccess({ message: "Pay-Out" })
    }, 500)
  }

  //! onChange Function 
  const handlePayOutConfig = (e) => {
    payOutInputHandler(e)
    const check = checkConfigPattern({
      getValues: getValues,
      setCheckPattern: setCheckPattern,
      setMyFormError: setMyFormError
    })
    if (check) {
      makeErrorInBulk({
        getValues: getValues,
        setMyFormError: setMyFormError,
        setGroupError: setGroupError
      })
    }
  }

  // console.log("getValues of PayOut : ", { ...getValues() }.payOutType)
  const onSubmit = (data) => {
    // console.log("getValues of PayOut : ", { ...getValues() })
    const id = Math.floor(Math.random() * 1000)
    const newPayOutItem = { id, dealerID, ...data }
    setStoreNewPayOut([...storeNewPayOut, newPayOutItem])
    notifySuccess({ message: "Pay-Out Configuration Added" })
    //reset select input of whole form
    resetConfigSelectInput(setValue)
    //reset pay-out values
    resetPayOutValue()
    // console.log("newPayOutItem : ", newPayOutItem)
  }

  const createNewPayOut = async (arr) => {
    // console.log("create bulk array", arr)
    // return;
    let bulkConfigData = [...arr].map((item) => {
      // console.log(item);
      let convertedData = ConvertToPayoutPayload({ ...item })
      return { dealerID: String(dealerID), ...convertedData }
    })
    // console.log("bulk modified : ", bulkConfigData)
    // return;
    let postMe = JSON.stringify([...bulkConfigData])
    try {
      let baseURL = "https://svki1qz191.execute-api.ap-south-1.amazonaws.com"
      let extendMe = '/dev/default/config/createPayoutBulk'
      let axiosConfig = {
        url: baseURL + extendMe,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        data: postMe
      }
      const response = await axios.request(axiosConfig)

      // console.log("res : createNewPayOut : ", response?.data)

      if (response && response?.status === 200) {
        // setAllConfig([])
        // dispatch({ type: PUSH_ACPL, payload: push_acpl })
        let tempArr = [...response?.data]?.map((item) => {
          let arr = item?.message?.split(" ")
          let hash = arr[3]?.split(":")
          let configHash = hash[1]
          return configHash
        })
        let newConfigArr = [...storeNewPayOut]?.map((item, idx) => {
          return {
            configHash: tempArr[idx],
            ...item
          }
        })
        dispatch({type: PUSH_PAYOUT, payload: [...newConfigArr]})
        setStoreNewPayOut([])
        // console.log('configHash : ', tempArr)
        notifySuccess({ message: "Config added succesfully" })
        return
      }
      notifyInfo({ message: "Unable to add Pay-Out config" })
    } catch (e) {
      notifyInfo({ message: "Unable to create Pay-Out, try again!!!" })
    }
  }
  // console.log('payout value : ', getValues())
  return (
    <Fragment>
      <CardAction title="Pay Out Form" actions="collapse">
        <CardBody className="pt-0">
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* RTO -> Insurer -> Policy Type -> OEM -> Body Type -> Fuel Type -> Model -> Variant */}
            <Col sm="8" className={border_css}>
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label>Choose RTO</Label>
                    <Input
                      className="select-basic"
                      type="select"
                      // classNamePrefix='select'
                      // defaultValue={'Choose RTO'}
                      placeholder="Choose RTO"
                      name="rto"
                      innerRef={register({ required: true })}
                      onChange={handlePayOutConfig}
                      size={inputFieldSize}
                    >
                      {rto?.map((item) => {
                        return (
                          <option value={item?.id}>
                            {item?.rto_state} - {item?.rto_city}
                          </option>
                        )
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.rto && <InputFeedback size={size} message={myFormError?.rto?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <Label>Choose Insurer</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Insurer"
                    name="insurer"
                    innerRef={register({ required: true })}
                    onChange={async (e) => {
                      handlePayOutConfig(e)
                      if (temp != 'none' || temp != 'all') {
                        let insurerValue = insurer.filter((item) => {
                          if (item?.id == temp) {
                            return item
                          }
                        })
                        let insurerName = insurerValue?.[0]?.name
                        let newModels = await getModelViaInsurer(insurerName)
                        let newVariant = await getVariantViaInsurer(insurerName)
                        if (newModels?.status == 200) {
                          // console.log('newModels Via getModelViaInsurer : ', newModels)
                          setInsurerModel(newModels?.data)
                        }
                        if (newVariant?.status == 200) {
                          // console.log('newVariant Via getVariantViaInsurer : ', newVariant)
                          setInsurerVariant(newVariant?.data)
                        }
                      }
                    }}
                    size={inputFieldSize}
                    >
                      {insurer?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.insurer && <InputFeedback size={size} message={myFormError?.insurer?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <Label>Choose Policy Type</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Policy Type"
                    name="policyType"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {policyType?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.policyType && <InputFeedback size={size} message={myFormError?.policyType?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4" className={marginTop}>
                  <FormGroup>
                    <Label>Choose OEM</Label>
                    <Input className="select-basic" type="select" placeholder="Choose OEM"
                    name="oemId"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {oem?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.oemId && <InputFeedback size={size} message={myFormError?.oemId?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4" className={marginTop}>
                  <FormGroup>
                    <Label>Choose Body Type</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Body Type"
                    name="bodyType"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {bodyType?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.bodyType && <InputFeedback size={size} message={myFormError?.bodyType?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4" className={marginTop}>
                  <FormGroup>
                    <Label>Choose Fuel Type</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Fuel Type"
                    name="fuelType"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {fuelType?.map((item) => {
                        return <option value={item?.id}>{getFuelTypeByName(item?.name)}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.fuelType && <InputFeedback size={size} message={myFormError?.fuelType?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4" className={marginTop}>
                  <FormGroup>
                    <Label>Choose Model</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Model"
                    name="model"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {insurerModel?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.model && <InputFeedback size={size} message={myFormError?.model?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="4" className={marginTop}>
                  <FormGroup>
                    <Label>Choose Variant</Label>
                    <Input className="select-basic" type="select" placeholder="Choose Variant"
                    name="variant"
                    innerRef={register({ required: true })}
                    onChange={handlePayOutConfig}
                    size={inputFieldSize}
                    >
                      {insurerVariant?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>
                      })}
                      <option value="all">All</option>
                      <option value="none" selected>
                        None
                      </option>
                    </Input>
                    {myFormError?.variant && <InputFeedback size={size} message={myFormError?.variant?.message} />}
                  </FormGroup>
                </Col>
                <Col className={marginTop}>
                  <FormGroup>
                    <Label>Insurer Discount</Label>
                    <div style={{ paddingTop: "8px" }}>
                      <Badge color="info" className="badge-glow">
                        {errorVar ? "0 %" : `${Math.floor(Math.random() * 100)} %`}
                      </Badge>
                    </div>
                    {/* <div>
                    <Button.Ripple color="primary">
                        {errorVar ? '0 %' : `${Math.floor(Math.random() * 100)} %`}
                    </Button.Ripple>
                    </div> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <Button color="relief-primary">Add Pay-Out Configuration</Button> */}
                  <Button.Ripple color="primary" outline 
                  // disabled={loaderWhileSubmit} 
                  // onClick={changeLoaderWhileSubmit}
                  type='submit'
                  // onClick={onSubmit}
                  disabled={payOutPushVerifier() || checkPatternValid}
                  >
                    {loaderWhileSubmit ? (
                      <>
                        <Spinner size="sm" type="grow" />
                        <span className="ml-50">Submitting...</span>
                      </>
                    ) : (
                      <>Add Pay-Out Configuration</>
                    )}
                  </Button.Ripple>
                </Col>
              </Row>
            </Col>
            {/* Pay-Out Type */}
            <Col sm="3" className={border_css}>
              <Label>Pay-Out Type</Label>
              <div className="d-flex g-2">
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioPay1"
                  name="payOutType"
                  inline
                  label="Fixed"
                  innerRef={register({ required: true })}
                  onChange={payOutInputHandler}
                  value="fixed"
                  defaultChecked
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioPay2"
                  name="payOutType"
                  inline
                  label="Percent"
                  innerRef={register({ required: true })}
                  onChange={payOutInputHandler}
                  value="percentage"
                />
              </div>
              <Row>
                {payOutType === "percentage" && (
                  <Col className="mt-1" sm="12">
                    <FormGroup>
                      <Label>Enter Percentage</Label>
                      <Input type="text" id="basicInput" placeholder="Percentage" 
                      name="percentage"
                      innerRef={register({ required: true })}
                      onChange={payOutInputHandler}
                      size={inputFieldSize}
                      />
                      {errors?.percentage && <InputFeedback size={size} message={errors?.percentage?.message} />}
                    </FormGroup>
                  </Col>
                )}
                {payOutType === "fixed" && (
                  <Col className="mt-1" sm="12">
                    <FormGroup>
                      <Label>Enter Fixed</Label>
                      <Input type="text" id="basicInput" placeholder="Fixed" 
                      name="fixed"
                      innerRef={register({ required: true })}
                      onChange={payOutInputHandler}
                      size={inputFieldSize}
                      />
                      {errors?.fixed && <InputFeedback size={size} message={errors?.fixed?.message} />}
                    </FormGroup>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="newPayOutList"
                label="New Pay-Out List"
                onClick={() => setNewPayOutList((p) => !p)}
                defaultChecked={newPayOutList}
              />
              {newPayOutList && (
                <div className="mt-1">
                  <NewPayOutTable 
                  newPayOutList={storeNewPayOut} 
                  updateConfig={updateConfig} 
                  updatePayOutValue={updatePayOutValue} 
                  deleteConfig={deleteConfig}
                  uploadNewPayOutConfig={uploadNewPayOutConfig}
                  createNewPayOut={createNewPayOut}
                  />
                </div>
              )}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="olderPayOutList"
                label="Older Pay-Out List"
                onClick={() => setOlderPayOutList((p) => !p)}
                defaultChecked={olderPayOutList}
              />
              {olderPayOutList && (
                <div className="mt-1">
                  <PrevPayOutTable dealerID={dealerID}/>
                </div>
              )}
            </Col>
          </Row>
          </Form>
        </CardBody>
      </CardAction>
    </Fragment>
  )
}
