/*
[{body_type : {id: 1, name: 'Electric'}}] --> [{id: 1, name: 'Electric'}]
*/
export const configApiDataConvertor = ({ list, key }) => {
  if (!list || list?.length == 0) {
    return
  }
  if (!key || key == '') {
    return
  }
  let newData = [...list].map((item) => {
    let tempObj = item[key]
    return { ...tempObj }
  })
  return newData
}

export const getFuelTypeByName = (x) => {
  if (x === "e") {
    return "EV"
  } else if (x === "d") {
    return "DIESEL"
  } else if (x === "c") {
    return "CNG"
  } else if (x === "p") {
    return "PETROL"
  } else if (x === "All") {
    return "All"
  }
  return "---"
}

let mainFormFieldArr = ["rto", "insurer", "policyType", "oemId", "bodyType", "fuelType", "model", "variant"]
let mapFormFields = {
  rto: "rtoID",
  insurer: "insurerID",
  policyType: "policyID",
  oemId: "oemID",
  bodyType: "bodyID",
  fuelType: "fuelTypeID",
  model: "modelID",
  variant: "variantID"
}
//! Conversion of ACPL Payload Start
export const ConvertToAcplPayload = (item) => {
  let obj = {}

  for (let i = 0; i < mainFormFieldArr.length; i++) {
    let temp = item[mainFormFieldArr[i]]
    if (temp != "none") {
      let key = mapFormFields[mainFormFieldArr[i]]
      if (temp == "all") {
        obj[key] = "All"
      } else {
        obj[key] = String(temp)
      }
    }
  }

  let calculationObj = {}
  if (item.acplType == "percentage") {
    calculationObj = {
      type: "percentage",
      min: 11,
      acpl: Number(item?.percentage)
    }
  }
  if (item.acplType == "fixed") {
    calculationObj = {
      type: "fixed",
      min: 1300,
      acpl: Number(item?.fixed)
    }
  }
  if (item.acplType == "custom") {
    calculationObj = {
      nilDep: Number(item?.nildep),
      discount: Number(item?.discount),
      min: 900,
      type: "custom",
      cpa: Number(item?.cpa),
      tppd: Number(item?.tppd)
    }
  }
  return { ...obj, calculation: { ...calculationObj } }
}
//! Conversion of ACPL Payload End

//! Conversion of Pay-Out Payload Start
export const ConvertToPayoutPayload = (item) => {
  let obj = {}

  for (let i = 0; i < mainFormFieldArr.length; i++) {
    let temp = item[mainFormFieldArr[i]]
    if (temp != "none") {
      let key = mapFormFields[mainFormFieldArr[i]]
      if (temp === "all") {
        obj[key] = "All"
      } else {
        obj[key] = String(temp)
      }
    }
  }

  let calculationObj = {
    type: item?.payOutType,
    payout: Number(item?.fixed || item?.percentage)
  }
  return { ...obj, calculation: { ...calculationObj } }
}
//! Conversion of Pay-Out Payload End

//! Conversion of Commission Payload Start
export const ConvertToCommissionPayload = (item) => {
  let obj = {}

  for (let i = 0; i < mainFormFieldArr.length; i++) {
    let temp = item[mainFormFieldArr[i]]
    if (temp != "none") {
      let key = mapFormFields[mainFormFieldArr[i]]
      if (temp == "all") {
        obj[key] = "All"
      } else {
        obj[key] = String(temp)
      }
    }
  }

  let calculationObj = {
    type: item?.commissionType,
    distributor: Number(item?.distributorCommission) || Number(item?.masterCommission)
  }
  return { ...obj, calculation: { ...calculationObj } }
}
//! Conversion of Commission Payload End

export const getConfigLabel = (array, id, flag) => {
  if (id == "All" || id == "all") {
    return "All"
  }
  if (!id) {
    return "--"
  }
  let soloItem = [...array]?.filter((el) => {
    if (el?.id == id) {
      return el
    }
  })
  if (flag) {
    return soloItem[0]?.rto_state || "--"
  } else {
    return soloItem[0]?.name || "--"
  }
}

export const converFetchedAcplData = (listOfConfig) => {
  //   sample response from api
  //   {
  //     "createdAt": 1690523156328,
  //     "dealerID": "65",
  //     "calcID": {
  //         "acpl": 12345,
  //         "min": 1300,
  //         "type": "fixed"
  //     },
  //     "configHash": {
  //         "dealerID": "65",
  //         "rtoID": "128",
  //         "configType": "acpl"
  //     },
  //     "configID": "eyJkZWFsZXJJRCI6IjY1IiwicnRvSUQiOiIxMjgiLCJjb25maWdUeXBlIjoiYWNwbCJ9"
  // }

  // key value convention over the app
  // let tempObj = {
  //   dealerID:'dealerID',
  //   rtoID:'rto',
  //   insurerID:'insurer',
  //   policyID:'policyType',
  //   oemID:'oemId',
  //   bodyID:'bodyType',
  //   fuelTypeID:'fuelType',
  //   variantID:'variant',
  //   modelID:'model',
  //   type:'acplType',
  // }

  let dataForReducer = [...listOfConfig]?.map((item) => {
    let temp =  {...item, ...item?.calcID, ...item?.configHash}

    let tempOne = {
      dealerID : temp?.dealerID,
      rto : temp?.rtoID,
      insurer : temp?.insurerID,
      policyType : temp?.policyID,
      oemId : temp?.oemID,
      bodyType : temp?.bodyID,
      fuelType : temp?.fuelTypeID,
      model : temp?.modelID,
      variant : temp?.variantID,
      acplType : temp?.type,
      fixed : temp?.acpl, 
      percentage : temp?.acpl, 
      custom : temp?.acpl,
      configID : temp?.configID
    }
    return tempOne
  })

  return dataForReducer

}
