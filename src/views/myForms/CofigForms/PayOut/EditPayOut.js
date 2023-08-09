import { Fragment, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, CustomInput, Col, Row, Input, FormGroup } from "reactstrap"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import InputFeedback from "../../Common/InputFeedback"
import { useForm } from "react-hook-form"

const inputFieldSize = "sm"
const size = true

const validateEditedPayOut = {
  //! payout type
  payOutType: yup.string().required("Pay-Out required"),

  //! payout percentage
  percentage: yup.string().when("payOutType", {
    is: "percentage",
    then: yup
      .string()
      .required("Percentage required")
      .max(6, "too high")
      .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
  }),
  //! payout fixed
  fixed: yup.string().when("payOutType", {
    is: "fixed",
    then: yup
      .string()
      .required("Fixed amount required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  })
}

export default function EditPayOut({ isOpen, onClose, updatePayOutValue, item }) {
  const [payOutType, setPayOutType] = useState(item?.payOutType)
  const { errors, getValues, setValue, register } = useForm({
    resolver: yupResolver(yup.object().shape(validateEditedPayOut)),
    mode: "onTouched",
    defaultValues: {
      payOutType: item?.payOutType || "fixed",
      fixed: item?.fixed || "",
      percentage: item?.percentage || ""
    }
  })
  const editThisPayOut = (e) => {
    let { name, value } = e?.target
    if (name === "payOutType") {
      // console.log("name - value", `${name} - ${value}`)
      setPayOutType(value)
    }
    setValue(name, value, { shouldValidate: true, shouldTouch: true })
  }

  const payloadVerifier = () => {
    if (getValues().payOutType === "percentage") {
      if (errors.percentage || getValues().percentage === "") return true
    }
    if (getValues().payOutType === "fixed") {
      if (errors.fixed || getValues().fixed === "") return true
    }
    return false
  }
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader toggle={onClose}>Edit Pay-Out Configuration</ModalHeader>
        <ModalBody>
          <div
          //   className={border_css}
          >
            <Label>Pay-Out Type</Label>
            <div className="d-flex g-2">
              <CustomInput
                type="radio"
                id="exampleEditRadioAcpl1"
                name="payOutType"
                inline
                label="Fix"
                defaultChecked
                innerRef={register({ required: true })}
                onChange={editThisPayOut}
                value="fixed"
              />
              <CustomInput
                type="radio"
                id="exampleEditRadioAcpl3"
                name="payOutType"
                inline
                label="Percent"
                innerRef={register({ required: true })}
                onChange={editThisPayOut}
                value="percentage"
              />
            </div>
            <Row>
              {payOutType === "percentage" && (
                <Col className="mt-1" md="6" sm="12">
                  <Label>Enter Percentage</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder="Percentage"
                      name="percentage"
                      size={inputFieldSize}
                      innerRef={register({ required: true })}
                      onChange={editThisPayOut}
                    />
                    {errors?.percentage && <InputFeedback size={size} message={errors?.percentage?.message} />}
                  </FormGroup>
                </Col>
              )}
              {payOutType === "fixed" && (
                <Col className="mt-1" md="6" sm="12">
                  <Label>Enter Fixed</Label>
                  <FormGroup>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder="Fixed"
                      name="fixed"
                      size={inputFieldSize}
                      innerRef={register({ required: true })}
                      onChange={editThisPayOut}
                    />
                    {errors?.fixed && <InputFeedback size={size} message={errors?.fixed?.message} />}
                  </FormGroup>
                </Col>
              )}
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={payloadVerifier()}
            onClick={() => {
              updatePayOutValue(item?.id, { ...getValues() })
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
