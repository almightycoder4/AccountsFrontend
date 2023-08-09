import { Fragment } from "react"
import { Card, CardHeader, CardTitle, CardBody, Col, Label, CustomInput, Row, Input } from "reactstrap"

// const dealerList = [
//   { label: "Light", value: "light" },
//   { label: "Damon", value: "damon" },
//   { label: "Gon", value: "gon" },
//   { label: "Lubu", value: "lubu" },
//   { label: "Hinata", value: "hinata" }
// ]

// const subDealerList = [
//     { label: "Tobi", value: "tobi" },
//     { label: "Akuma", value: "akuma" },
//     { label: "Adam", value: "adam" },
//     { label: "Langa", value: "langa" },
//     { label: "Onizuka", value: "onizuka" }
// ]
export default function SelectDealerComp({ dealerID, dealerType, changeDealerType, testingDealerList, testingSubDealerList, handleDealerId }) {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Dealership / Sub-Dealership</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex g-2">
            <CustomInput type="radio" id="exampleCustomRadioDealer1" name="customRadioDealer" inline label="Dealership" onChange={changeDealerType} value="D/S" defaultChecked />
            <CustomInput type="radio" id="exampleCustomRadioDealer2" name="customRadioDealer" inline label="Sub - Dealership" onChange={changeDealerType} value="Sub-D/S" />
          </div>
        </CardBody>
        <CardBody className="pt-0">
        <Row>
        <Col md="6" sm="12">
            <Label>Choose Dealership</Label>
            <Input type="select" name="select" id="select-basic" placeholder='Choose Dealership' defaultValue={null}
            disabled={dealerType === 'Sub-D/S'}
            onChange={handleDealerId}
            >
                    {testingDealerList?.map((el) => {
                      return <option value={el?.id}>{el?.name} - {el?.state}</option>
                    })}
                    { (dealerID == null || dealerID == "") && <option selected>Choose Dealership</option>}
            </Input>
          </Col>
          
          {
            dealerType === 'Sub-D/S'
            &&
            <Col md="6" sm="12">
            <Label>Choose Sub-Dealership</Label>
            <Input type="select" name="select" id="select-basic" placeholder='Choose Sub Dealership'
            onChange={handleDealerId}
            >
                    {testingSubDealerList?.map((el) => {
                      return <option value={el?.id}>{el?.name} - {el?.state}</option>
                    })}
                    { dealerID === null && <option selected>Choose Sub Dealership</option>}
                  </Input>
            </Col>
          }
        </Row>
          
        </CardBody>
      </Card>
    </Fragment>
  )
}
