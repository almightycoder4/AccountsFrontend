import { Fragment, useEffect, useState } from "react"
import CardAction from "@components/card-actions"
import { CardBody, Row, Col, Label, CustomInput, Input, FormGroup, Button, Spinner, Badge, Card, CardText, CardTitle, Form } from "reactstrap"
import InputFeedback from "../../Common/InputFeedback"
import { MyHandleSuccess } from "../../Common/MySweetAlerts"
import { notifyInfo, notifySuccess } from "../../Common/MyToasts"
import { validateACPL } from "./acplUtils"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getFuelTypeByName, ConvertToAcplPayload } from "@aegisUtils/dataFormat"
import NewAcplTable from "./NewAcplTable"
import PrevAcplTable from "./PrevAcplTable"
import { checkConfigPattern, makeErrorInBulk } from "../ConfigurationCommon"
import { PUSH_ACPL } from "../ConfigurationStore/actions/actionType"
import { resetConfigSelectInput } from "../ConfigurationCommon/Sharing"
import axios from "axios"
import { accessToken } from "@env/env"
import { getModelViaInsurer, getVariantViaInsurer } from "../ConfigurationCommon/api"

const inputFieldSize = "sm"
const border_css = "border border-gray rounded-sm m-1 p-1"
const errorVar = !true
const marginTop = errorVar ? "mt-n1" : "mt-0.5"
const size = true

export default function AcplConfig({ dealerID }) {
  const { rto, insurer, policyType, oem, bodyType, fuelType, models, variants } = useSelector((store) => store.configReducer)
  const dispatch = useDispatch()

  //! model N variant Via Insurer
  const [insurerModel, setInsurerModel] = useState([])
  const [insurerVariant, setInsurerVariant] = useState([])

  //! State to handle Visibility New Acpl List
  const [newAcplList, setNewAcplList] = useState(true)
  //! State to handle Visibility Older Acpl List
  const [olderAcplList, setOlderAcplList] = useState(true)
  //! Acpl type controller state
  const [acplType, setAcplType] = useState("fixed")

  //! ACPL Config Form Start
  const { errors, getValues, setValue, register, reset, handleSubmit } = useForm({
    resolver: yupResolver(yup.object().shape(validateACPL)),
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
      acplType: "fixed",
      tppd: "",
      nildep: "",
      cpa: "",
      // discountType: "",
      discount: "",
      fixed: "",
      percentage: "",
      dealerID: dealerID
    }
  })
  const [storeNewAcpl, setStoreNewAcpl] = useState([])
  const uploadNewAcplConfig = () => {
    // console.log("upload new acpl configuration")
    dispatch({ type: PUSH_ACPL, payload: [...storeNewAcpl] })
    setStoreNewAcpl([])
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
  //! ACPL Handlers Start
  const acplInputHandler = (e) => {
    let { name, value } = e.target
    // console.log("name - value", `${name} - ${value}`)
    if (name === "acplType") {
      setAcplType(value)
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }
  //! ACPL Handlers End
  //! Reset Custom Fixed Percentage Values
  const resetAcplValue = () => {
    if (acplType === "custom") {
      setValue("nildep", "")
      setValue("tppd", "")
      setValue("cpa", "")
      setValue("discount", "")
    } else if (acplType === "fixed") {
      setValue("fixed", "")
    } else {
      setValue("percentage", "")
    }
  }
  //! Verifier before creating a configuration
  const acplPushVerifier = () => {
    if (getValues().acplType === "custom") {
      if (errors?.tppd || getValues().tppd === "") return true
      if (errors?.cpa || getValues().cpa === "") return true
      if (errors?.nildep || getValues().nildep === "") return true
      //  if (errors?.discountType || getValues().discountType === '') return true
      if (errors?.discount || getValues().discount === "") return true
    }
    if (getValues().acplType === "percentage") {
      if (errors.percentage || getValues().percentage === "") return true
    }
    if (getValues().acplType === "fixed") {
      if (errors.fixed || getValues().fixed === "") return true
    }
    return false
  }

  //! Actions on created configs Starts
  //? Will update a value in single Configuration
  const updateConfig = (id, name, value) => {
    let updated = storeNewAcpl.map((el) => {
      if (el.id === id) {
        return { ...el, [name]: value }
      }
      return el
    })
    // notifyInfo({message: 'ACPL Configuration Updated'})
    setStoreNewAcpl([...updated])
  }
  //? Will update a acpl value in a single Configuration
  const updateAcplValue = (id, data) => {
    let updated = storeNewAcpl.map((el) => {
      if (el.id === id) {
        return { ...el, ...data }
      }
      return el
    })
    notifyInfo({ message: "ACPL Value Updated" })
    setStoreNewAcpl([...updated])
  }
  //? Will Delete a single Configuration
  const deleteConfig = (id) => {
    // console.log('delete id : ',id);
    let updated = [...storeNewAcpl].filter((el) => {
      if (el.id !== id) {
        return el
      }
    })
    notifyInfo({ message: "ACPL Configuration Deleted" })
    setStoreNewAcpl([...updated])
  }
  //! Actions on created configs Ends

  const [loaderWhileSubmit, setLoaderWhileSubmit] = useState(false)
  //! Alert of Success

  const changeLoaderWhileSubmit = () => {
    setLoaderWhileSubmit(true)
    setTimeout(() => {
      setLoaderWhileSubmit(false)
      // MyHandleSuccess()
      notifySuccess({ message: "ACPL Cofiguration Added" })
    }, 500)
  }

  //! onChange Function
  const handleAcplConfig = (e) => {
    acplInputHandler(e)
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

  // console.log("getValues of acplType : ", { ...getValues() }.acplType)
  const onSubmit = (data) => {
    // console.log("getValues of Acpl : ", { ...getValues() })
    const id = Math.floor(Math.random() * 1000)
    const newAcplItem = { id, dealerID, ...data }
    setStoreNewAcpl([...storeNewAcpl, newAcplItem])
    notifySuccess({ message: "ACPL Cofiguration Added" })
    //reset select input of whole form
    resetConfigSelectInput(setValue)
    //reset Acpl Values
    resetAcplValue()
    // console.log("newAcplItem : ", newAcplItem)
  }

  const createNewACPL = async (arr) => {
    // console.log("create bulk array", arr)
    // return;
    let bulkConfigData = [...arr].map((item) => {
      // console.log(item);
      let convertedData = ConvertToAcplPayload({ ...item })
      return { dealerID: String(dealerID), ...convertedData }
    })
    // console.log("bulk modified : ", bulkConfigData)
    // return;
    let postMe = JSON.stringify([...bulkConfigData])
    try {
      let baseURL = "https://svki1qz191.execute-api.ap-south-1.amazonaws.com"
      let extendMe = "/dev/default/config/createAcplBulk"
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
      // console.log("res : createNewAcpl : ", response?.data)

      if (response && response?.status === 200) {
        // setAllConfig([])
        // dispatch({ type: PUSH_ACPL, payload: push_acpl })
        let tempArr = [...response?.data]?.map((item) => {
          let arr = item?.message?.split(" ")
          let hash = arr[3]?.split(":")
          let configHash = hash[1]
          return configHash
        })
        let newConfigArr = [...storeNewAcpl]?.map((item, idx) => {
          return {
            configHash: tempArr[idx],
            ...item
          }
        })
        console.log('newConfigArr : ', newConfigArr)
        dispatch({type: PUSH_ACPL, payload: [...newConfigArr]})
        setStoreNewAcpl([])
        // console.log('configHash : ', tempArr)
        notifySuccess({ message: "Config added succesfully" })
        return
      }
      notifyInfo({ message: "Unable to add ACPL config" })
    } catch (e) {
      notifyInfo({ message: "Unable to create ACPL, try again!!!" })
    }
  }

  return (
    <Fragment>
      <CardAction title="ACPL Form" actions="collapse">
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
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
                      onChange={handleAcplConfig}
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
                      placeholder="Choose Insurer"
                      name="insurer"
                      innerRef={register({ required: true })}
                      onChange={async (e) => {
                        handleAcplConfig(e)
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
                      onChange={handleAcplConfig}
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
                      onChange={handleAcplConfig}
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
                      onChange={handleAcplConfig}
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
                      onChange={handleAcplConfig}
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
                      onChange={handleAcplConfig}
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
                      onChange={handleAcplConfig}
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
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <Button color="relief-primary">Add Acpl Configuration</Button> */}
                  <Button.Ripple
                    color="primary"
                    outline
                    // disabled={loaderWhileSubmit}
                    // onClick={changeLoaderWhileSubmit}
                    type="submit"
                    // onClick={onSubmit}
                    disabled={acplPushVerifier() || checkPatternValid}
                  >
                    {loaderWhileSubmit ? (
                      <>
                        <Spinner size="sm" type="grow" />
                        <span className="ml-50">Submitting...</span>
                      </>
                    ) : (
                      <>Add Acpl Configuration</>
                    )}
                  </Button.Ripple>
                </Col>
              </Row>
            </Col>
            {/* Acpl Type */}
            <Col sm="3" className={border_css}>
              <Label>Acpl Type</Label>
              <div className="d-flex g-2">
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioAcpl1"
                  name="acplType"
                  innerRef={register({ required: true })}
                  inline
                  label="Fix"
                  onChange={acplInputHandler}
                  value="fixed"
                  defaultChecked
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioAcpl2"
                  name="acplType"
                  innerRef={register({ required: true })}
                  inline
                  label="Custom"
                  onChange={acplInputHandler}
                  value="custom"
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadioAcpl3"
                  name="acplType"
                  innerRef={register({ required: true })}
                  inline
                  label="Percent"
                  onChange={acplInputHandler}
                  value="percentage"
                />
              </div>
              <Row>
                {acplType === "custom" && (
                  <>
                    <Col className="mt-1" md="6" sm="12">
                      <FormGroup>
                        <Label>Enter Nildep</Label>
                        <Input
                          type="text"
                          id="basicInput"
                          placeholder="nildep."
                          name="nildep"
                          innerRef={register({ required: true })}
                          onChange={acplInputHandler}
                          size={inputFieldSize}
                        />
                        {errors?.nildep && <InputFeedback size={size} message={errors?.nildep?.message} />}
                      </FormGroup>
                    </Col>
                    <Col className="mt-1" md="6" sm="12">
                      <Label>Enter Discount</Label>
                      <FormGroup>
                        <Input
                          type="text"
                          id="basicInput"
                          placeholder="discount"
                          name="discount"
                          innerRef={register({ required: true })}
                          onChange={acplInputHandler}
                        />
                        {errors?.discount && <InputFeedback size={size} message={errors?.discount?.message} />}
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label>Enter TPPD</Label>
                        <Input
                          type="text"
                          id="basicInput"
                          placeholder="tppd"
                          name="tppd"
                          innerRef={register({ required: true })}
                          onChange={acplInputHandler}
                          size={inputFieldSize}
                        />
                        {errors?.tppd && <InputFeedback size={size} message={errors?.tppd?.message} />}
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label>Enter CPA</Label>
                        <Input
                          type="text"
                          id="basicInput"
                          placeholder="cpa"
                          name="cpa"
                          innerRef={register({ required: true })}
                          onChange={acplInputHandler}
                          size={inputFieldSize}
                        />
                        {errors?.cpa && <InputFeedback size={size} message={errors?.cpa?.message} />}
                      </FormGroup>
                    </Col>
                  </>
                )}
                {acplType === "percentage" && (
                  <Col className="mt-1" md="6" sm="12">
                    <Label>Enter Percentage</Label>
                    <FormGroup>
                      <Input
                        type="text"
                        id="basicInput"
                        placeholder="Percentage"
                        name="percentage"
                        innerRef={register({ required: true })}
                        onChange={acplInputHandler}
                        size={inputFieldSize}
                      />
                      {errors?.percentage && <InputFeedback size={size} message={errors?.percentage?.message} />}
                    </FormGroup>
                  </Col>
                )}
                {acplType === "fixed" && (
                  <Col className="mt-1" md="6" sm="12">
                    <Label>Enter Fixed</Label>
                    <FormGroup>
                      <Input
                        type="text"
                        id="basicInput"
                        placeholder="Fixed"
                        name="fixed"
                        innerRef={register({ required: true })}
                        onChange={acplInputHandler}
                        size={inputFieldSize}
                      />
                      {errors?.fixed && <InputFeedback size={size} message={errors?.fixed?.message} />}
                    </FormGroup>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          {/* <hr style={{marginTop: '-0.1px'}}/> */}
          <Row>
            <Col>
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="newAcplList"
                label="New Acpl List"
                onClick={() => setNewAcplList((p) => !p)}
                defaultChecked={newAcplList}
              />
              {newAcplList && (
                <div className="mt-1">
                  <NewAcplTable
                    newAcplList={storeNewAcpl}
                    updateConfig={updateConfig}
                    updateAcplValue={updateAcplValue}
                    deleteConfig={deleteConfig}
                    uploadNewAcplConfig={uploadNewAcplConfig}
                    createNewACPL={createNewACPL}
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
                id="olderAcplList"
                label="Older Acpl List"
                onClick={() => setOlderAcplList((p) => !p)}
                defaultChecked={olderAcplList}
              />
              {olderAcplList && (
                <div className="mt-1">
                  <PrevAcplTable dealerID={dealerID} />
                </div>
              )}
            </Col>
          </Row>
          </Form>
        </CardBody>
        {/* </Form> */}
      </CardAction>
    </Fragment>
  )
}
