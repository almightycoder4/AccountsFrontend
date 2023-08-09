import { Fragment, useState } from "react"
import CardAction from "@components/card-actions"
import { Form, CardBody, Row, Col, Label, FormGroup, Input, CustomInput, Button, Spinner, Badge } from "reactstrap"
import InputFeedback from "../../Common/InputFeedback"
import { notifyInfo, notifySuccess } from "../../Common/MyToasts"
import { useDispatch, useSelector } from "react-redux"
import { getFuelTypeByName, ConvertToCommissionPayload } from "@aegisUtils/dataFormat"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { validateCommission } from "./commissionUtils"
import NewCommissionTable from "./NewCommissionTable"
import PrevCommissionTable from "./PrevCommissionTable"
import { checkConfigPattern, makeErrorInBulk } from "../ConfigurationCommon"
import { PUSH_COMMISSION } from "../ConfigurationStore/actions/actionType"
import { resetConfigSelectInput } from "../ConfigurationCommon/Sharing"
import axios from "axios"
import { accessToken } from "@env/env"
import { getModelViaInsurer, getVariantViaInsurer } from "../ConfigurationCommon/api"

const inputFieldSize = 'sm'
const border_css = "border border-gray rounded-sm m-1 p-1"
const errorVar = !true
const marginTop = errorVar ? "mt-n1" : "mt-0.5"
const size = true

export default function CommissionConfig({ dealerID }) {
  const { rto, insurer, policyType, oem, bodyType, fuelType, models, variants } = useSelector((store) => store.configReducer)
  const dispatch = useDispatch()

  //! model N variant Via Insurer
  const [insurerModel, setInsurerModel] = useState([])
  const [insurerVariant, setInsurerVariant] = useState([])

  //! State to handle Visibility New Commission List
  const [newCommissionList, setNewCommissionList] = useState(true)
  //! State to handle Visibility Older Commission List
  const [olderCommissionList, setOlderCommissionList] = useState(true)
  //! Commission type controller state
  const [commissionType, setCommissionType] = useState("fixed")

  //! Commission Form and its functions
  const { errors, getValues, setValue, register, clearErrors, handleSubmit } = useForm({
    resolver: yupResolver(yup.object().shape(validateCommission)),
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
      commissionType: "fixed",
      masterCommission: "",
      distributorCommission: "",
      dealerID: dealerID
    }
  })
  const [storeNewCommission, setStoreNewCommission] = useState([])
  const uploadNewCommissionConfig = () => {
    dispatch({ type: PUSH_COMMISSION, payload: storeNewCommission })
    setStoreNewCommission([])
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
  //! Commission Form handler start
  const commissionInputHandler = (e) => {
    let { name, value } = e.target
    // console.log("name - value", `${name} - ${value}`)
    if (name === "commissionType") {
      clearErrors("masterCommission")
      clearErrors("distributorCommission")
      setValue("masterCommission", "")
      setValue("distributorCommission", "")
      setCommissionType(value)
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }
  //! Commission Handlers End

  //! Reset Fixed || Percentage Commission
  const resetCommissionValue = () => {
    if (commissionType === "fixed") {
      setValue("masterCommission", '')
      setValue("distributorCommission", '')
    } else {
      setValue("masterCommission", '')
      setValue("distributorCommission", '')
    }
  }

  //! Verifier before creating a configuration
  const commissionPushVerifier = () => {
    if (getValues().commissionType === "percentage") {
      if (errors.masterCommission || getValues().masterCommission === "") {
        return true
      }
      if (errors.distributorCommission || getValues().distributorCommission === "") {
        return true
      }
    }
    if (getValues().commissionType === "fixed") {
      if (errors.distributorCommission || getValues().distributorCommission === "") {
        return true
      }
      if (errors.masterCommission || getValues().masterCommission === "") {
        return true
      }
    }
    return false
  }

  //! Actions on created configs Starts
  //? Will update a value in single Configuration
  const updateConfig = (id, name, value) => {
    let updated = storeNewCommission.map((el) => {
      if (el.id === id) {
        return { ...el, [name]: value }
      }
      return el
    })
    // notifyInfo({message: 'Commission Configuration Updated'})
    setStoreNewCommission([...updated])
  }
  //? Will update a acpl value in a single Configuration
  const updateCommissionValue = (id, data) => {
    let updated = [...storeNewCommission].map((el) => {
      if (el.id === id) {
        return { ...el, ...data }
      }
      return el
    })
    notifyInfo({ message: "Commission Value Updated" })
    setStoreNewCommission([...updated])
  }
  //? Will Delete a single Configuration
  const deleteConfig = (id) => {
    // console.log('delete id : ',id);
    let updated = [...storeNewCommission].filter((el) => {
      if (el.id !== id) {
        return el
      }
    })
    notifyInfo({ message: "Commission Configuration Deleted" })
    setStoreNewCommission([...updated])
  }
  //! Actions on created configs Ends

  const changeCommissionType = (e) => {
    const { value } = e.target
    setCommissionType(value)
  }
  const [loaderWhileSubmit, setLoaderWhileSubmit] = useState(false)
  const changeLoaderWhileSubmit = () => {
    setLoaderWhileSubmit(true)
    setTimeout(() => {
      setLoaderWhileSubmit(false)
      notifySuccess({ message: "Commission" })
    }, 500)
  }

  //! onChange Function
  const handleCommissionConfig = (e) => {
    commissionInputHandler(e)
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

  // console.log("getValues of Commission : ", { ...getValues() }.commissionType)
  const onSubmit = (data) => {
    // console.log("getValues of Commission : ", { ...getValues() })
    const id = Math.floor(Math.random() * 1000)
    const newCommissionItem = { id, dealerID, ...data }
    setStoreNewCommission([...storeNewCommission, newCommissionItem])
    notifySuccess({ message: "Commission Configuration Added" })
    //reset select input of whole form
    resetConfigSelectInput(setValue)
    //reset commisson values
    resetCommissionValue()
    // console.log("newCommissionItem : ", newCommissionItem)
  }

  const createNewCommission = async (arr) => {
    // console.log("create bulk array", arr)
    // return;
    let bulkConfigData = [...arr].map((item) => {
      // console.log(item);
      let convertedData = ConvertToCommissionPayload({ ...item })
      return { dealerID: String(dealerID), ...convertedData }
    })
    // console.log("bulk modified : ", bulkConfigData)
    // return;
    let postMe = JSON.stringify([...bulkConfigData])
    try {
      let baseURL = "https://svki1qz191.execute-api.ap-south-1.amazonaws.com"
      let extendMe = '/dev/default/config/createDistributionBulk'
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
      // console.log("res : createNewCommission : ", response?.data)

      if (response && response?.status === 200) {
        // setAllConfig([])
        // dispatch({ type: PUSH_ACPL, payload: push_acpl })
        let tempArr = [...response?.data]?.map((item) => {
          let arr = item?.message?.split(" ")
          let hash = arr[3]?.split(":")
          let configHash = hash[1]
          return configHash
        })
        let newConfigArr = [...storeNewCommission]?.map((item, idx) => {
          return {
            configHash: tempArr[idx],
            ...item
          }
        })
        dispatch({type: PUSH_COMMISSION, payload: [...newConfigArr]})
        setStoreNewCommission([])
        // console.log('configHash : ', tempArr)
        notifySuccess({ message: "Config added succesfully" })
        return
      }
      notifyInfo({ message: "Unable to add Commission config" })
    } catch (e) {
      notifyInfo({ message: "Unable to create Commission, try again!!!" })
    }
  }

  return (
    <Fragment>
      <CardAction title="Commission Form" actions="collapse">
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
                      name="rto"
                      innerRef={register({ required: true })}
                      placeholder="Choose RTO"
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      name="insurer"
                      innerRef={register({ required: true })}
                      onChange={async (e) => {
                        handleCommissionConfig(e)
                        let temp = e?.target?.value
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
                      placeholder="Choose Insurer"
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose Policy Type"
                      name="policyType"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose OEM"
                      name="oemId"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose Body Type"
                      name="bodyType"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose Fuel Type"
                      name="fuelType"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose Model"
                      name="model"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                    <Input
                      className="select-basic"
                      type="select"
                      placeholder="Choose Variant"
                      name="variant"
                      innerRef={register({ required: true })}
                      onChange={handleCommissionConfig}
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
                  {/* <Button color="relief-primary">Add Commission Configuration</Button> */}
                  <Button.Ripple
                    color="primary"
                    outline
                    // disabled={loaderWhileSubmit}
                    // onClick={changeLoaderWhileSubmit}
                    type="submit"
                    // onClick={onSubmit}
                    disabled={commissionPushVerifier() || checkPatternValid}
                  >
                    {loaderWhileSubmit ? (
                      <>
                        <Spinner size="sm" type="grow" />
                        <span className="ml-50">Submitting...</span>
                      </>
                    ) : (
                      <>Add Commission Configuration</>
                    )}
                  </Button.Ripple>
                </Col>
              </Row>
            </Col>
            {/* Commission Type */}
            <Col sm="3" className={border_css}>
              <Label>Commission Type</Label>
              <div className="d-flex g-2">
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioCommission1"
                  name="commissionType"
                  innerRef={register({ required: true })}
                  inline
                  label="Fixed"
                  onChange={commissionInputHandler}
                  value="fixed"
                  defaultChecked
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioCommission2"
                  name="commissionType"
                  innerRef={register({ required: true })}
                  inline
                  label="Percent"
                  onChange={commissionInputHandler}
                  value="percentage"
                />
              </div>
              <Row>
                <Col className="mt-1" sm="12">
                  <FormGroup>
                    <Label>Master's Commission</Label>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder={commissionType === "fixed" ? "enter fixed..." : "enter percents..."}
                      name="masterCommission"
                      innerRef={register({ required: true })}
                      onChange={commissionInputHandler}
                      size={inputFieldSize}
                    />
                    {errors?.masterCommission && <InputFeedback size={size} message={errors?.masterCommission?.message} />}
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Distributor's Commission</Label>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder={commissionType === "fixed" ? "enter fixed..." : "enter percents..."}
                      name="distributorCommission"
                      innerRef={register({ required: true })}
                      onChange={commissionInputHandler}
                      size={inputFieldSize}
                    />
                    {errors?.distributorCommission && <InputFeedback size={size} message={errors?.distributorCommission?.message} />}
                  </FormGroup>
                </Col>
                {/* {commissionType === "fixed" && (
                  <Col className="mt-1" sm="12">
                    <FormGroup>
                      <Label>Enter Fixed</Label>
                      <Input
                        type="text"
                        id="basicInput"
                        placeholder="Fixed"
                        name="fixed"
                        innerRef={register({ required: true })}
                        onChange={commissionInputHandler}
                      />
                      {errors?.fixed && <InputFeedback size={size} message={errors?.fixed?.message} />}
                    </FormGroup>
                  </Col>
                )} */}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="newCommissionList"
                label="New Commission List"
                onClick={() => setNewCommissionList((p) => !p)}
                defaultChecked={newCommissionList}
              />
              {newCommissionList && (
                <div className="mt-1">
                  <NewCommissionTable
                    newCommissionList={storeNewCommission}
                    updateConfig={updateConfig}
                    updateCommissionValue={updateCommissionValue}
                    deleteConfig={deleteConfig}
                    uploadNewCommissionConfig={uploadNewCommissionConfig}
                    createNewCommission={createNewCommission}
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
                id="olderCommissionList"
                label="Older Commission List"
                onClick={() => setOlderCommissionList((p) => !p)}
                defaultChecked={olderCommissionList}
              />
              {olderCommissionList && (
                <div className="mt-1">
                  <PrevCommissionTable dealerID={dealerID} />
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
