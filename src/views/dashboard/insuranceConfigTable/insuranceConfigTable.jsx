import { Fragment } from "react"
import DataTable from "react-data-table-component"
import { Card, Col, FormGroup, Input, Row } from "reactstrap"
import { dealerListColumns, renderDealerList } from "../insuranceConfigTable/MockDealerList"
import { ChevronDown } from "react-feather"

export default function insuranceConfigTable() {
    let insuranceConfigColumns = dealerListColumns

    return (
        <>
        <Fragment>
            <Card>
            <div className="font-dark pl-1 pt-1 font-weight-bold" style={{ fontSize: "1.5rem" }}>
            <p>Insurance Configration Table</p>
          </div>
        <Row>
        <Col sm="4"></Col>
        <Col sm="4"></Col>
        <FormGroup>
                 <div className="d-flex align-items-center">
                   <div>Search : </div>
                   <div style={{ width: "75%" }}>
                    <Input></Input>
                  </div>
                   </div>
               </FormGroup>                  
        </Row>
           <DataTable
           noHeader
           responsive
           paginationServer
           columns={insuranceConfigColumns}
           sortIcon={<ChevronDown/>}
           className="react-dataTable"
           data={renderDealerList}
           />
        
           {/* End of the Page */}
            </Card>
        </Fragment>
        
         </>
    )

}