import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown, Alert, Button } from "reactstrap"
import { useSelector } from "react-redux"
import { getFuelTypeByName } from "@aegisUtils/dataFormat"
import { Menu, Trash2, Edit } from "react-feather"
import { Fragment, useState } from "react"
import EditPayOut from "./EditPayOut"

const acplData = [
  {
    id: 1,
    rto: "AP",
    insurer: "Bajaj",
    policyType: "od1tp5",
    oemId: "HERO",
    bodyType: "Scooter",
    fuelType: "EV",
    model: "3",
    variant: "2018",
    currentAcpl: "24%"
  },
  {
    id: 2,
    rto: "TL",
    insurer: "Hero",
    policyType: "od1tp5",
    oemId: "HERO",
    bodyType: "Scooter",
    fuelType: "EV",
    model: "3",
    variant: "2018",
    currentAcpl: "26%"
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
    id: 1,
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

export default function NewPayOutTable({ newPayOutList, updateConfig, updatePayOutValue, deleteConfig, uploadNewPayOutConfig, createNewPayOut }) {
  const { rto, insurer, policyType, oem, bodyType, fuelType, models, variants } = useSelector((store) => store.configReducer)
  const [editPayOut, setEditPayOut] = useState(false)
  const handleModal = () => {
    setEditPayOut(!editPayOut)
  }
  return (
    <Fragment>
      {newPayOutList?.length === 0 ? (
        <Alert color="danger">
          <h4 className="alert-heading">New Pay-Out List is Empty</h4>
        </Alert>
      ) : (
        <Fragment>
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
              {newPayOutList?.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.rto}
                        name="rto"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.rto === "none" || item.rto === "all"}
                      >
                        {rto?.map((item) => {
                          return <option value={item?.id}>{item?.rto_state}</option>
                        })}
                        {item.rto === "all" || item.rto === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.insurer}
                        name="insurer"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.insurer === "none" || item.insurer === "all"}
                      >
                        {insurer?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.insurer === "all" || item.insurer === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.policyType}
                        name="policyType"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.policyType === "none" || item.policyType === "all"}
                      >
                        {policyType?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.policyType === "all" || item.policyType === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.oemId}
                        name="oemId"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.oemId === "none" || item.oemId === "all"}
                      >
                        {oem?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.oemId === "all" || item.oemId === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.bodyType}
                        name="bodyType"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.bodyType === "none" || item.bodyType === "all"}
                      >
                        {bodyType?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.bodyType === "all" || item.bodyType === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.fuelType}
                        name="fuelType"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.fuelType === "none" || item.fuelType === "all"}
                      >
                        {fuelType?.map((item) => {
                          return <option value={item?.id}>{getFuelTypeByName(item?.name)}</option>
                        })}
                        {item.fuelType === "all" || item.fuelType === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.model}
                        name="model"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.model === "none" || item.model === "all"}
                      >
                        {models?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.model === "all" || item.model === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <select
                        className="select-basic"
                        type="select"
                        defaultValue={item.variant}
                        name="variant"
                        onChange={(e) => updateConfig(item?.id, e.target.name, e.target.value)}
                        disabled={item.variant === "none" || item.variant === "all"}
                      >
                        {variants?.map((item) => {
                          return <option value={item?.id}>{item?.name}</option>
                        })}
                        {item.variant === "all" || item.variant === "none" ? (
                          <>
                            <option value={"all"}>All</option>
                            <option value={"none"}>None</option>
                          </>
                        ) : null}
                      </select>
                    </td>
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
                          <DropdownItem className="w-100" onClick={handleModal}>
                            <Edit size={14} className="mr-50" />
                            <span className="align-middle">Edit</span>
                          </DropdownItem>
                          <DropdownItem className="w-100 text-danger" onClick={() => deleteConfig(item?.id)}>
                            <Trash2 size={14} className="mr-50" />
                            <span className="align-middle">Delete</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <EditPayOut isOpen={editPayOut} onClose={handleModal} updatePayOutValue={updatePayOutValue} item={item} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <div className="mt-1">
            <Button.Ripple color="primary" outline size="sm" onClick={() => { 
              //uploadNewPayOutConfig
              createNewPayOut(newPayOutList) 
              }}>
              Upload Pay-Out Configuration
            </Button.Ripple>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
