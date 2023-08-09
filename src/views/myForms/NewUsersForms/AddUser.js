import { Fragment } from "react"
import { Col, Row } from "reactstrap"
import SelectDealerComp from './Common/SelectDealerComp'
import { testingDealerList, testingSubDealerList } from "../CofigForms/ConfigurationCommon"

export default function AddUser() {
    return (<Fragment>
        <BreadCrumbs breadCrumbTitle='Users' breadCrumbParent='Forms' breadCrumbActive='View or Create'/>
        <Col sm='12'>
            <SelectDealerComp changeDealerType={changeDealerType}
            testingDealerList={testingDealerList}
            testingSubDealerList={testingSubDealerList}
            />
        </Col>
    </Fragment>)
}