import { Fragment, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, CustomInput, Col, Row, Input, FormGroup } from 'reactstrap'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import InputFeedback from "../../Common/InputFeedback"
import { useForm } from "react-hook-form"

const inputFieldSize = 'sm'
const size = true

const validateEditedAcpl = {
 //! acpl type
 acplType: yup.string().required('Acpl required'),

 //! acpl custom
 tppd: yup.string().when('acplType', {
  is: 'custom',
  then: yup
   .string()
   .required('TPPD required')
   .max(5, 'too high')
   .matches(/^\d*[1-9]\d*$/, 'invalid number')
 }),

 nildep: yup.string().when('acplType', {
  is: 'custom',
  then: yup
   .string()
   .required('nildep required')
   .max(5, 'too high')
   .matches(/^\d*[1-9]\d*$/, 'invalid number')
 }),

 cpa: yup.string().when('acplType', {
  is: 'custom',
  then: yup
   .string()
   .required('cpa required')
   .max(5, 'too high')
   .matches(/^\d*[1-9]\d*$/, 'invalid number')
 }),
 discount: yup.string().when('acplType', {
  is: 'custom',
  then: yup
   .string()
   .required('Discount value required')
   .max(5, 'too high')
   .matches(/^\d*[1-9]\d*$/, 'invalid number')
 }),
 //! acpl percentage
 percentage: yup.string().when('acplType', {
  is: 'percentage',
  then: yup
   .string()
   .required('Percentage required')
   .max(6, 'too high')
   .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, 'invalid percents')
 }),
 //! acpl fixed
 fixed: yup.string().when('acplType', {
  is: 'fixed',
  then: yup
   .string()
   .required('Fixed amount required')
   .max(5, 'too high')
   .matches(/^\d*[1-9]\d*$/, 'invalid number')
 })
}

export default function EditAcpl ({isOpen, onClose, updateAcplValue, item}) {
    const [acplType, setAcplType] = useState('fixed')
    const { errors, getValues, setValue, register } = useForm({
        resolver: yupResolver(yup.object().shape(validateEditedAcpl)),
        mode: "onTouched",
        defaultValues: {
          acplType: item?.acplType || 'fixed',
          tppd: item?.tppd || "",
          nildep: item?.nildep || "",
          cpa: item?.cpa || "",
          discount: item?.discount || "",
          fixed: item?.fixed || "",
          percentage: item?.percentage || ""
        }
      })
    const editThisAcpl = (e) => {
        let { name, value } = e?.target
        if (name === 'acplType') {
            // console.log("name - value", `${name} - ${value}`)
            setAcplType(value)
        }
        setValue(name, value, { shouldValidate: true, shouldTouch: true })
    }

    const payloadVerifier = () => {
        if (getValues().acplType === "custom") {
          if (errors?.tppd || getValues().tppd === "") return true
          if (errors?.cpa || getValues().cpa === "") return true
          if (errors?.nildep || getValues().nildep === "") return true
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
    return (<Fragment>
        <Modal isOpen={isOpen} toggle={onClose}>
          <ModalHeader toggle={onClose}>Edit Acpl Configuration</ModalHeader>
          <ModalBody>
          <div 
        //   className={border_css}
          >
              <Label>Acpl Type</Label>
              <div className="d-flex g-2">
                <CustomInput
                  type="radio"
                  id="exampleEditRadioAcpl1"
                  name="acplType"
                  inline
                  label="Fix"
                  defaultChecked
                  innerRef={register({ required: true })}
                  onChange={editThisAcpl}
                  value="fixed"
                />
                <CustomInput
                  type="radio"
                  id="exampleEditRadioAcpl2"
                  name="acplType"
                  inline
                  label="Custom"
                  innerRef={register({ required: true })}
                  onChange={editThisAcpl}
                  value="custom"
                />
                <CustomInput
                  type="radio"
                  id="exampleEditRadioAcpl3"
                  name="acplType"
                  inline
                  label="Percent"
                  innerRef={register({ required: true })}
                  onChange={editThisAcpl}
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
                          size={inputFieldSize}
                          innerRef={register({ required: true })}
                          onChange={editThisAcpl}
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
                          onChange={editThisAcpl}
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
                          size={inputFieldSize}
                          innerRef={register({ required: true })}
                        onChange={editThisAcpl}
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
                          size={inputFieldSize}
                          innerRef={register({ required: true })}
                          onChange={editThisAcpl}
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
                        size={inputFieldSize}
                        innerRef={register({ required: true })}
                        onChange={editThisAcpl}
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
                        size={inputFieldSize}
                        innerRef={register({ required: true })}
                        onChange={editThisAcpl}
                      />
                      {errors?.fixed && <InputFeedback size={size} message={errors?.fixed?.message} />}
                    </FormGroup>
                  </Col>
                )}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
           <Button color='primary'
           disabled={payloadVerifier()}
           onClick={() => {
            updateAcplValue(item?.id, {...getValues()})
            onClose()
           }}
           >
              Update
            </Button>
            <Button color='danger' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    </Fragment>)
}