import { Fragment, useEffect, useState } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import AcplConfig from "./CofigForms/ACPL"
import PayOutConfig from "./CofigForms/PayOut"
import CommissionConfig from "./CofigForms/Commission"
import SelectDealerComp from "./Common/SelectDealerComp"
import { tempGetAllConfig } from "./CofigForms/ConfigurationStore/actions"
import { useDispatch, useSelector } from "react-redux"
import { testingDealerList, testingSubDealerList } from "./CofigForms/ConfigurationCommon"
import { getDealershipData } from "../dashboard/dealership/api"
import { GET_DEALERSHIP, GET_SUB_DEALERSHIP } from "./DealershipForms/DealershipStore/actions"

export default function Configuration() {
  const { dealership, subDealership } = useSelector((store) => store.dealershipReducer)
  const dispatch = useDispatch()

  const [dealerType, setDealerType] = useState("D/S")
  const [dealerID, setDealerID] = useState(null)

  const changeDealerType = (e) => {
    const { value } = e.target
    setDealerID(null)
    setDealerType(value)
  }
  
  const handleDealerId = (e) => {
    let { value } = e?.target
    setDealerID(value)
  }

  useEffect(async () => {
    dispatch(tempGetAllConfig())
    if (dealership?.length == 0) {
      const dealerData = await getDealershipData('DEALER', 0)
      if (dealerData?.status == 200) {
        dispatch({type: GET_DEALERSHIP, payload: dealerData?.data})
      }
    }
    if (subDealership?.length == 0) {
      const subDealerData = await getDealershipData('SUB-DEALER', 0)
      if (subDealerData?.status == 200) {
        dispatch({type: GET_SUB_DEALERSHIP, payload: subDealerData?.data})
      }
    }
  }, [])
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Configuration" breadCrumbParent="Forms" breadCrumbActive="Create or Update" /> */}
      <Fragment>
        <SelectDealerComp
          dealerID={dealerID}
          changeDealerType={changeDealerType}
          dealerType={dealerType}
          testingDealerList={dealership}
          testingSubDealerList={subDealership}
          handleDealerId={handleDealerId}
        />
      </Fragment>
      {dealerID === null ? null : (
        <>
          <Fragment>
            <AcplConfig dealerID={dealerID}/>
          </Fragment>
          <Fragment>
            <PayOutConfig dealerID={dealerID}/>
          </Fragment>
          <Fragment>
            <CommissionConfig dealerID={dealerID}/>
          </Fragment>
        </>
      )}
    </Fragment>
  )
}
