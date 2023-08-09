import { useState } from "react"
import { Card, CardHeader, CardTitle, CardBody, Col, Row, Input, CustomInput, FormGroup, Label, Button, Spinner } from "reactstrap"
import { selectThemeColors } from "@utils"
import Select from "react-select"

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
export default function OwnerDetails() {
  //! add Account flag 
  const [addAccount, setAddAccount] = useState(false)
  const handleAddAccount = () => {
    setAddAccount(!addAccount)
  }
  const [dealerType, setDealerType] = useState("D/S")
  const [loaderWhileSubmit, setLoaderWhileSubmit] = useState(false)
  const changeLoaderWhileSubmit = () => {
    setLoaderWhileSubmit(true)
    setTimeout(() => {
      setLoaderWhileSubmit(false)
    }, 2000)
  }
  return (
    <>
      {/* <Col> */}
      <Card>
        <CardHeader>
          <CardTitle tag="h6">Dealership Owner</CardTitle>
        </CardHeader>
        <CardBody className="mt-n1">
          <Row>
            <Col sm="3">
              {/* D/S Owner Name */}
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" id="basicInput" placeholder="Enter Name" />
              </FormGroup>
            </Col>
            <Col sm="3">
              {/* D/S Owner Email */}
              <FormGroup>
                <Label>Email</Label>
                <Input type="text" id="basicInput" placeholder="Enter Email" />
              </FormGroup>
            </Col>
            <Col sm="3">
              {/* D/S Owner Mobile */}
              <FormGroup>
                <Label>Mobile</Label>
                <Input type="text" id="basicInput" placeholder="Enter Mobile" />
              </FormGroup>
            </Col>
            <Col sm="3">
              {/* D/S Owner D/S name */}
              <FormGroup>
                <Label>Dealership Name</Label>
                <Input type="text" id="basicInput" placeholder="Enter Dealership Name" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="">
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
        {addAccount && <CardHeader>
          <CardTitle tag="h6" className={marginTop}>
            Owner's Account Details
          </CardTitle>
        </CardHeader>}
        <CardBody className="mt-n2">
            {addAccount && <Row>
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
          </Row>}
          {addAccount && <Row>
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
          </Row>}
          <Row>
            <Col>
              <Button.Ripple color="primary" outline disabled={loaderWhileSubmit} onClick={changeLoaderWhileSubmit}>
                {loaderWhileSubmit ? (
                  <>
                    <Spinner size="sm" type="grow" />
                    <span className="ml-50">Uploading {dealerType === "D/S" ? "Dealership" : "Sub-Dealership"} Owner Details...</span>
                  </>
                ) : (
                  <>Add {dealerType === "D/S" ? "Dealership" : "Sub-Dealership"} Owner Details</>
                )}
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* </Col> */}
    </>
  )
}
