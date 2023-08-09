import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown, Alert } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { getFuelTypeByName, getConfigLabel } from "@aegisUtils/dataFormat"
import { Menu, Trash2, Edit } from "react-feather"
import { Fragment } from "react"
import { accessToken } from "@env/env"
import { deleteConfig } from "@aegisUtils/sharedFunc"
import { POP_PAYOUT } from "../ConfigurationStore/actions/actionType"

const acplData = [
  {
    id: 1,
    rto: "Karnataka",
    insurer: "Bajaj",
    policyType: "od1tp5",
    oemId: "HERO",
    bodyType: "Scooter",
    fuelType: "EV",
    model: "3",
    variant: "2018",
    currentAcpl: "1200",
    acplType: "fixed"
  },
  {
    id: 2,
    rto: "Telangana",
    insurer: "Hero",
    policyType: "od1tp5",
    oemId: "HERO",
    bodyType: "Scooter",
    fuelType: "EV",
    model: "3",
    variant: "2018",
    currentAcpl: "26",
    acplType: "percent"
  }
]

const acplDataPartTwo = [
  {
    id: 1,
    rto: 1,
    insurer: 1,
    policyType: 1,
    oemId: 1,
    bodyType: 1,
    fuelType: 1,
    model: 1,
    variant: 1,
    currentAcpl: "2400",
    acplType: "fixed"
  },
  {
    id: 2,
    rto: 1,
    insurer: 2,
    policyType: 2,
    oemId: 2,
    bodyType: 2,
    fuelType: 2,
    model: 2,
    variant: 2,
    currentAcpl: "34",
    acplType: "percent"
  }
]

export default function PrevPayOutTable({ dealerID }) {
  const { rto, insurer, policyType, oem, bodyType, fuelType, models, variants, payoutList } = useSelector((store) => store.configReducer)
  const dispatch = useDispatch()

  const deleteConfigFromRedux = (configHash) => {
    let updatedList = [...payoutList].filter((item) => {
      if (item?.configHash !== configHash) {
        return item
      }
    })
    dispatch({type: POP_PAYOUT, payload: updatedList})
  }
  return (
    <Fragment>
      {payoutList?.length === 0 ? (
        <Alert color="danger">
          <h4 className="alert-heading">Older Pay-Out List is Empty</h4>
        </Alert>
      ) : (
        <Table size="sm" className="text-left border border-gray rounded-sm">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>RTO</th>
              <th>Insurer</th>
              <th>Policy Type</th>
              <th>OEM</th>
              <th>Body Type</th>
              <th>Fuel Type</th>
              <th>Model</th>
              <th>Variant</th>
              <th>Pay-Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payoutList?.map((item, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{getConfigLabel(rto, item.rto, true) }</td>
                  <td>{getConfigLabel(insurer, item.insurer)}</td>
                  <td>{getConfigLabel(policyType, item.policyType)}</td>
                  <td>{getConfigLabel(oem, item.oemId)}</td>
                  <td>{getConfigLabel(bodyType, item.bodyType)}</td>
                  <td>{getFuelTypeByName(getConfigLabel(fuelType, item.fuelType))}</td>
                  <td>{getConfigLabel(models, item.model)}</td>
                  <td>{getConfigLabel(variants, item.variant)}</td>
                  <td>
                    {item?.payOutType === "fixed" ? (
                      <>&#8377; {item.fixed}</>
                    ) : (
                      <>
                        {item.percentage}
                        {" %"}
                      </>
                    )}
                  </td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="div" className="btn btn-sm">
                        <Menu size={14} className="cursor-pointer" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem className="w-100 text-danger"
                        onClick={() => {
                          // console.log('inside pay-out config deletion')
                          deleteConfig(item?.configHash, dealerID, accessToken)
                          deleteConfigFromRedux(item?.configHash)
                        }}
                        >
                          <Trash2 size={14} className="mr-50" />
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Fragment>
  )
}
