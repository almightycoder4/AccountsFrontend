//! array of all form fields keys
let mainFormFieldArr = ["rto", "insurer", "policyType", "oemId", "bodyType", "fuelType", "model", "variant"]

//! Check Config Patter Start
export const checkConfigPattern = ({ getValues, setCheckPattern, setMyFormError }) => {
  console.log(
    `${getValues().rto} -> ${getValues().insurer} -> ${getValues().policyType} -> ${getValues().oemId} -> ${getValues().bodyType} -> ${
      getValues().fuelType
    } -> ${getValues().model} -> ${getValues().variant}`
  )
  /**
   *? V = value
   *? -- = no value
   *? rto -> insurer -> policyType -> oemId -> bodyType -> fuelType -> model -> variant
   *? type 1 :- V -> V -> V -> V -> V -> V -> V //! Ideal v1
   *? type 2 :- V -> V -> -- -> -- -> -- -> -- -> -- //! Ideal v2
   *? type 3 :- all -> all -> all -> all -> all -> all -> V //! all-Value pattern v1
   *? type 4 :- all -> all -> all -> V -> -- -> -- -> -- //! all-Value pattern v2
   *? type 5 :- -- -> -- -> -- -> -- -> -- -> -- -> -- //! none-none-none- ----- pattern
   */

  //! to check type 1 pattern
  let n = mainFormFieldArr.length
  let typeOne = 0
  for (let i = 0; i < n; i++) {
    let temp = getValues()[mainFormFieldArr[i]]
    if (temp !== "all" && temp !== "none") {
      typeOne++
    }
  }
  console.log("typeOne : ", typeOne)
  if (typeOne === n) {
    setCheckPattern(false)
    //  clearErrorsInBulk();
    setMyFormError({})
    return false
  }
  //! pattern type 1 detected

  //! to check type 2 pattern
  let typeTwo = 0
  let validTypeTwo = false
  for (let i = 0; i < n; i++) {
    let temp = getValues()[mainFormFieldArr[i]]
    if (validTypeTwo) {
      if (temp === "none") {
        typeTwo++
      }
    } else {
      if (temp !== "all" && temp !== "none") {
        typeTwo++
      } else if (temp === "none") {
        typeTwo++
        validTypeTwo = true
      }
    }
  }
  console.log("typeTwo : ", typeTwo)
  if (typeTwo === n) {
    setCheckPattern(false)
    //  clearErrorsInBulk();
    setMyFormError({})
    return false
  }
  //! pattern type 2 detected

  //! to check type 3 and 4 pattern
  let typeThree = 0
  let valueTag = false
  for (let i = 0; i < n; i++) {
    let temp = getValues()[mainFormFieldArr[i]]
    if (valueTag) {
      if (temp === "none") {
        typeThree++
      }
    } else {
      if (temp === "all") {
        typeThree++
      } else if (temp !== "all" && temp !== "none") {
        typeThree++
        valueTag = true
      }
    }
  }
  console.log("typeThree : ", typeThree, 'valueTag : ', valueTag)
  if (typeThree === n && valueTag) {
    setCheckPattern(false)
    //  clearErrorsInBulk();
    setMyFormError({})
    return false
  }
  //! pattern type 3 and 4 detected

  //! to check type 4 pattern
  // let typeFour = 0;
  // for(let i=0;i<n;i++){
  //   let temp:any = getValues()[mainFormFieldArr[i]];
  //   if(temp!=='all' || temp!=='none'){
  //     typeFour++;
  //   }
  // }
  // if(typeFour===n){
  //   return false;
  // }
  //! pattern type 4 detected

  //! to check type 5 pattern
  let typeFive = 0
  for (let i = 0; i < n; i++) {
    let temp = getValues()[mainFormFieldArr[i]]
    if (temp == "none") {
      typeFive++
    }
  }
  console.log("typeFive : ", typeFive)
  if (typeFive === n) {
    setCheckPattern(false)
    //  clearErrorsInBulk();
    setMyFormError({})
    return false
  }
  //! pattern type 5 detected

  setCheckPattern(true)

  return true
}
//! Check Config Patter End

//! Make Erros In Bulk Start
export const makeErrorInBulk = ({ getValues, setMyFormError, setGroupError }) => {
  let n = mainFormFieldArr.length
  //! if all 5 patterns didn't matched then
  // setError('rto',{type:'custom',message:'Invalid Value'})
  let rtoValue = getValues().rto
  //! this "if" statment was supposed cover error of type 1 and type 2
  if (rtoValue != "all" && rtoValue != "none") {
    console.log("rtoValue : ", rtoValue)
    let arrayOfValueAll = []
    let arrayOfValueNone = []
    for (let i = 1; i < n; i++) {
      let temp = getValues()[mainFormFieldArr[i]]
      if (temp == "all") {
        arrayOfValueAll.push(mainFormFieldArr[i])
      }
      if (temp == "none") {
        arrayOfValueNone.push(mainFormFieldArr[i])
      }
    }
    console.log("arrayOfFields : none or all ", arrayOfValueAll)
    let errorBoxOne = setGroupError([...arrayOfValueAll], "All option not allowed")
    let errorBoxTwo = setGroupError([...arrayOfValueNone], "None option not allowed")
    setMyFormError({ ...errorBoxOne, ...errorBoxTwo })
    return true
  }

  //! this "if" statment was supposed cover error of type 3 and type 4
  if (rtoValue === "all") {
    console.log("rtoValue : ", rtoValue)
    let allTypeTemp = false
    let arrayOfValueAll = []
    let arrayOfValueNone = []

    for (let i = 1; i < n; i++) {
      let temp = getValues()[mainFormFieldArr[i]]
      if (allTypeTemp) {
        if (temp !== "none") {
          arrayOfValueNone.push(mainFormFieldArr[i])
        }
      } else {
        if (temp !== "all" && temp !== "none") {
          allTypeTemp = true
        } else if (temp == "none") {
          arrayOfValueAll.push(mainFormFieldArr[i])
          allTypeTemp = true
        } else {
          arrayOfValueAll.push(mainFormFieldArr[i])
        }

      }
      console.log("key : ", temp)
    }
    let errorBoxOne = setGroupError([...arrayOfValueNone], "Only None is allowed")
    let errorBoxTwo = setGroupError([...arrayOfValueAll], "All or None not allowed")
    setMyFormError({ ...errorBoxOne, ...errorBoxTwo })
    return true
  }
  //! this "if" statment was supposed cover error of type 5
  if (rtoValue === "none") {
    console.log("rtoValue : ", rtoValue)
    let arrayOfValidValue = []
    for (let i = 1; i < n; i++) {
      let temp = getValues()[mainFormFieldArr[i]]
      if (temp != "none") {
        arrayOfValidValue.push(mainFormFieldArr[i])
      }
    }
    let errorBoxOne = setGroupError([...arrayOfValidValue], "only None is allowed")
    setMyFormError({ ...errorBoxOne })
    return true
  }
}
//! Make Errors In Bulk End

export const testingDealerList = [
    {
        "id": 16,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Tezzz HERO-MOTO",
        "dealer_type": "DEALER",
        "email": "afsaklkl@aegis.com",
        "mobile": "9778342490",
        "city": "Bangalore",
        "state": "Karnataka",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": null,
        "dealership_wallet_id": 33,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-24T07:17:25.000Z",
        "updated_at": "2023-05-24T07:17:25.000Z"
    },
    {
        "id": 15,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Nav TVS",
        "dealer_type": "DEALER",
        "email": "asfafxss@aegis.com",
        "mobile": "9778342490",
        "city": "Kerala",
        "state": "Kerala",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": null,
        "dealership_wallet_id": 31,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-24T07:07:23.000Z",
        "updated_at": "2023-05-24T07:07:23.000Z"
    },
    {
        "id": 14,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Iron Bajaj",
        "dealer_type": "DEALER",
        "email": "asfafs@aegis.com",
        "mobile": "9778342490",
        "city": "Panchkula",
        "state": "Punjab",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": null,
        "dealership_wallet_id": 30,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-24T07:00:58.000Z",
        "updated_at": "2023-05-24T07:00:58.000Z"
    },
    {
        "id": 13,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Foo Honda",
        "dealer_type": "DEALER",
        "email": "afshjva@aegis.com",
        "mobile": "9778342490",
        "city": "Bareli",
        "state": "Uttar Pradesh",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": null,
        "dealership_wallet_id": 0,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-24T06:09:07.000Z",
        "updated_at": "2023-05-24T06:09:07.000Z"
    },
    {
        "id": 12,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "ABC Suzuki",
        "dealer_type": "DEALER",
        "email": "afshva@aegis.com",
        "mobile": "9778342490",
        "city": "Indore",
        "state": "Madhya Pradesh",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": null,
        "dealership_wallet_id": 0,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-24T06:07:11.000Z",
        "updated_at": "2023-05-24T06:07:11.000Z"
    }
]

export const testingSubDealerList = [
    {
        "id": 11,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Tan Vespa",
        "dealer_type": "SUB-DEALER",
        "email": "sadasd@aegis.com",
        "mobile": "9778342490",
        "city": "Kolkata",
        "state": "Kolkata",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": 1,
        "dealership_wallet_id": 0,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-19T07:00:01.000Z",
        "updated_at": "2023-05-19T07:00:01.000Z"
    },
    {
        "id": 10,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Yin Royal Enfield",
        "dealer_type": "SUB-DEALER",
        "email": "oluf@aegis.com",
        "mobile": "9778342490",
        "city": "Katihar",
        "state": "Bihar",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": 1,
        "dealership_wallet_id": 0,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-16T12:20:53.000Z",
        "updated_at": "2023-05-16T12:20:53.000Z"
    },
    {
        "id": 8,
        "oem_id": 59,
        "acpl_team_id": null,
        "name": "Pre Jawa",
        "dealer_type": "SUB-DEALER",
        "email": "hasf@aegis.com",
        "mobile": "9778342490",
        "city": "Delhi",
        "state": "Delhi",
        "address": "Place some",
        "pincode": "112212",
        "master_dealership_id": 1,
        "dealership_wallet_id": 0,
        "payout_type": "FULL PAY",
        "distributor_id": 3,
        "rto_id": 1,
        "is_deleted": 0,
        "created_at": "2023-05-16T12:13:39.000Z",
        "updated_at": "2023-05-16T12:13:39.000Z"
    }
]

//! reset all input fields
export const resetConfigSelectInput = (setValue) => {
  let fields = ['rto', 'insurer', 'policyType', 'oemId', 'bodyType', 'fuelType', 'model', 'variant']
  for (let item of fields) {
    setValue(item, 'none', { shouldValidate: true, shouldTouch: true })
  }
}
