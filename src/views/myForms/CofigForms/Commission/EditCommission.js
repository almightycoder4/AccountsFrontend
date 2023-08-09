import { Fragment, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, CustomInput, Col, Row, Input, FormGroup } from "reactstrap"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import InputFeedback from "../../Common/InputFeedback"
import { useForm } from "react-hook-form"

const inputFieldSize = "sm"
const size = true

const validateEditedCommission = {
  //! commission type
  commissionType: yup.string().required("Pay-Out required"),

  //! master commissions
  masterCommission: yup
    .string()
    .when("commissionType", {
      is: "percentage",
      then: yup
        .string()
        .required("percentage required")
        .max(6, "too high")
        .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
    })
    .when("commissionType", {
      is: "fixed",
      then: yup
        .string()
        .required("fixed required")
        .max(5, "too high")
        .matches(/^\d*[1-9]\d*$/, "invalid number")
    }),
  //! distributors commissions
  distributorCommission: yup
    .string()
    .when("commissionType", {
      is: "percentage",
      then: yup
        .string()
        .required("percentage required")
        .max(6, "too high")
        .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
    })
    .when("commissionType", {
      is: "fixed",
      then: yup
        .string()
        .required("fixed required")
        .max(5, "too high")
        .matches(/^\d*[1-9]\d*$/, "invalid number")
    })
}

export default function EditCommission({ isOpen, onClose, updateCommissionValue, item }) {
  const [commissionType, setCommissionType] = useState(item?.commissionType)
  const { errors, getValues, setValue, register } = useForm({
    resolver: yupResolver(yup.object().shape(validateEditedCommission)),
    mode: "onTouched",
    defaultValues: {
      commissionType: item?.commissionType || "fixed",
      masterCommission: item?.masterCommission || "",
      distributorCommission: item?.distributorCommission || ""
    }
  })
  const editThisCommission = (e) => {
    let { name, value } = e?.target
    if (name === "commissionType") {
      // console.log("name - value", `${name} - ${value}`)
      setCommissionType(value)
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }

  const payloadVerifier = () => {
    if (getValues().commissionType === "percentage") {
      if (errors.masterCommission || getValues().masterCommission === "") return true
      if (errors.distributorCommission || getValues().distributorCommission === "") return true
    }
    if (getValues().commissionType === "fixed") {
      if (errors.masterCommission || getValues().masterCommission === "") return true
      if (errors.distributorCommission || getValues().distributorCommission === "") return true
    }
    return false
  }
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader toggle={onClose}>Edit Commission Configuration</ModalHeader>
        <ModalBody>
          <div
          //   className={border_css}
          >
            <Label>Commission Type</Label>
            <div className="d-flex g-2">
              <CustomInput
                type="radio"
                id="exampleEditRadioCommission1"
                name="commissionType"
                inline
                label="Fix"
                innerRef={register({ required: true })}
                onChange={editThisCommission}
                value="fixed"
              />
              <CustomInput
                type="radio"
                id="exampleEditRadioCommission2"
                name="commissionType"
                inline
                label="Percent"
                innerRef={register({ required: true })}
                onChange={editThisCommission}
                value="percentage"
              />
            </div>
            <Row>
                <Col className="mt-1" md="6" sm="12">
                  <Label>Master's Commission</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder={commissionType === 'fixed' ? 'enter fixed...' : 'enter percents...'}
                      name="masterCommission"
                      size={inputFieldSize}
                      innerRef={register({ required: true })}
                      onChange={editThisCommission}
                    />
                    {errors?.masterCommission && <InputFeedback size={size} message={errors?.masterCommission?.message} />}
                  </FormGroup>
                </Col>
                <Col className="mt-1" md="6" sm="12">
                  <Label>Distributor's Commission</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder={commissionType === 'fixed' ? 'enter fixed...' : 'enter percents...'}
                      name="distributorCommission"
                      size={inputFieldSize}
                      innerRef={register({ required: true })}
                      onChange={editThisCommission}
                    />
                    {errors?.distributorCommission && <InputFeedback size={size} message={errors?.distributorCommission?.message} />}
                  </FormGroup>
                </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={payloadVerifier()}
            onClick={() => {
              updateCommissionValue(item?.id, { ...getValues() })
              onClose()
            }}
          >
            Update
          </Button>
          <Button color="danger" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
