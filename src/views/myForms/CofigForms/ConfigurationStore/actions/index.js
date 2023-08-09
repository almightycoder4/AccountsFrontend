import { baseURL, accessToken } from "@env/env"
import axios from "axios"
import { configApiDataConvertor } from "@aegisUtils"
import { GET_RTO, GET_INSURER, GET_POLICY, GET_OEM, GET_BODY, GET_FUEL_TYPE, GET_MODELS, GET_VARIANTS, GET_MY_ALL_CONFIG } from "./actionType"

const getAll = "/dev/default/database/getAll/"
const getAllTypes = "/dev/default/database/getAllType/"

export const getConfigurations = async ({ type = "getAll", param = "Insurer", insurer = "", category = "", accessToken }) => {
  const bearer = "Bearer " + accessToken

  try {
    // console.log('accessToken at get Config : ', accessToken);
    let fetchData

    if (type === "getAll") {
      fetchData = await axios.get(baseURL + getAll + `?param=${param}`, {
        headers: {
          Authorization: bearer
        }
      })
    } else {
      fetchData = await axios.get(baseURL + getAllTypes + `?category=${category}&insurer=${insurer}`, {
        headers: {
          Authorization: bearer
        }
      })
    }

    const { data } = fetchData
    // console.log(data);
    return fetchData
  } catch (e) {
    console.log("eroor config", e)
    return e
  }
}

export const getAllConfig = (accessToken) => async (dispatch) => {
  //  console.log('getAllConfig call : ', accessToken);

  try {
    //! Check Logged User Access Token
    // if (CheckToken(accessToken)) {
    //   dispatch({ type: LOGOUT })
    //   throw new Error("Authentication Failed!!!")
    // }
    const insurer = await getConfigurations({
      type: "getAll",
      param: "insurer",
      accessToken: accessToken
    })
    const policyType = await getConfigurations({
      type: "getAll",
      param: "policy_type",
      accessToken: accessToken
    })
    const bodyType = await getConfigurations({
      type: "getAll",
      param: "body_type",
      accessToken: accessToken
    })
    const models = await getConfigurations({
      type: "getAllType",
      category: "model",
      insurer: "bajaj",
      accessToken: accessToken
    })
    const variant = await getConfigurations({
      type: "getAllType",
      category: "variant",
      insurer: "shriram",
      accessToken: accessToken
    })
    const oem = await getConfigurations({
      type: "getAll",
      param: "oem",
      accessToken: accessToken
    })
    const fuelType = await getConfigurations({
      type: "getAll",
      param: "fuel_type",
      accessToken: accessToken
    })
    const rto = await getConfigurations({
      type: "getAll",
      param: "rto",
      accessToken: accessToken
    })
    dispatch({ type: GET_INSURER, payload: insurer?.data })
    dispatch({ type: GET_POLICY, payload: policyType?.data })
    dispatch({ type: GET_BODY, payload: bodyType?.data })
    dispatch({ type: GET_MODELS, payload: models?.data })
    dispatch({ type: GET_VARIANTS, payload: variant?.data })
    dispatch({ type: GET_OEM, payload: oem?.data })
    dispatch({ type: GET_FUEL_TYPE, payload: fuelType?.data })
    dispatch({ type: GET_RTO, payload: rto?.data })
    const defaultConfigValue = {
      insurer: insurer?.data?.[0]?.id,
      policyType: policyType?.data?.[0]?.id,
      bodyType: bodyType?.data?.[0]?.id,
      model: models?.data?.[0]?.id,
      variant: variant?.data?.[0]?.id,
      fuelType: fuelType?.data?.[0]?.id,
      oemId: oem?.data?.[0]?.id,
      rtoId: rto?.data?.[0]?.id
    }
    // dispatch({ type: SET_DEFAULT, payload: defaultConfigValue })
    console.log("config fetched")
    return {
      insurer: insurer?.data,
      policyType: policyType?.data,
      bodyType: bodyType?.data,
      model: models?.data,
      variant: variant?.data,
      fuelType: fuelType?.data,
      oem: oem?.data,
      rto: rto?.data,
      error: false
    }
    //   console.log('insurer :',insurer?.data);
    //   console.log('policyType :',policyType?.data);
    //   console.log('bodyType :',bodyType?.data);
    //   console.log('models :',models?.data);
    //   console.log('variant :',variant?.data);
  } catch (err) {
    console.log("error", err?.response)
    return {
      error: true
    }
  }
}

export const myAllConfig =
  ({ dealerID, accessToken }) => async (dispatch) => {
    const customURL = "/dev/default/config/getDealerConfigs/?dealerID="
    console.log("invoke my all configs : ", dealerID)

    const bearer = "Bearer " + accessToken
    try {
      //! Check Logged User Access Token
      if (CheckToken(accessToken)) {
        dispatch({ type: LOGOUT })
        throw new Error("Authentication Failed!!!")
      }

      const axiosConfig = {
        url: baseURL + customURL + Number(dealerID),
        method: "get",
        headers: {
          Authorization: bearer
        }
      }
      const { data } = await axios.request(axiosConfig)
      //    console.log('this user configs : ', data);
      dispatch({ type: GET_MY_ALL_CONFIG, payload: data })
      // console.log(data)
      return data
    } catch (e) {
      console.log("error in fetching my configs")
    }
  }

export const deleteMyConfig =
  ({ accessToken, item, toast }) =>
  async (dispatch) => {
    //! create hash from item...
    const bearer = "Bearer " + accessToken
    const customURL = "/dev/default/config/deconsteConfig"

    // creating configHash from configuration object
    const configHash = Buffer.from(JSON.stringify(item?.configHash)).toString("base64")
    console.log("config Hash : ", configHash)

    try {
      //! Check Logged User Access Token
    //   if (CheckToken(accessToken)) {
    //     dispatch({ type: LOGOUT })
    //     throw new Error("Authentication Failed!!!")
    //   }

      const data = JSON.stringify([
        {
          dealerID: Number(item?.dealerID),
          configHash: configHash
        }
      ])
      const axiosConfig = {
        url: baseURL + customURL,
        method: "deconste",
        maxBodyLength: Infinity,
        headers: {
          Authorization: bearer
        },
        data: data
      }

      const response = await axios.request(axiosConfig)
      if (response?.status === 200) {
        // if(response?.data?.message=="Successfully deconsted items"){
        return toast({
          title: "Config Deconsted",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top"
        })
        // }
      }
      return toast({
        title: "Unable to Deconste",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top"
      })

      console.log("deconstion an ACPL config : ", response)
    } catch (e) {
      console.log("error while deconsting my config!!!")
      return toast({
        title: "Unable to Deconste",
        description: "Try again!!!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      })
    }
  }

export const tempGetAllConfig =  () => async (dispatch) => {
  try {
    let insurer = await getConfigurations({
      type: "getAll",
      param: "insurer",
      accessToken: accessToken
    })

    let policyType = await getConfigurations({
      type: "getAll",
      param: "policy_type",
      accessToken: accessToken
    })

    let bodyType = await getConfigurations({
      type: "getAll",
      param: "body_type",
      accessToken: accessToken
    })
    
    let models = await getConfigurations({
      type: "getAllType",
      category: "model",
      insurer: "bajaj",
      accessToken: accessToken
    })
    let variant = await getConfigurations({
      type: "getAllType",
      category: "variant",
      insurer: "shriram",
      accessToken: accessToken
    })
    let oem = await getConfigurations({
      type: "getAll",
      param: "oem",
      accessToken: accessToken
    })
    let fuelType = await getConfigurations({
      type: "getAll",
      param: "fuel_type",
      accessToken: accessToken
    })
    let rto = await getConfigurations({
      type: "getAll",
      param: "rto",
      accessToken: accessToken
    })

    let newInsurer = configApiDataConvertor({list: insurer?.data, key: 'insurer'})
    let newPolicyType = configApiDataConvertor({list: policyType?.data, key: 'policy_type'})
    let newBodyType = configApiDataConvertor({list: bodyType?.data, key: 'body_type'})
    let newModel = configApiDataConvertor({list: models?.data, key: 'model'})
    let newFuelType = configApiDataConvertor({list: fuelType?.data, key: 'fuel_type'})
    let newOemId = configApiDataConvertor({list: oem?.data, key: 'oem'})
    let newRtoId = configApiDataConvertor({list: rto?.data, key: 'rto'})
    let newVariant = configApiDataConvertor({list: variant?.data, key: 'variant'})

    const defaultConfigValue = {
      insurer: newInsurer,
      policyType: newPolicyType,
      bodyType: newBodyType,
      model: newModel,
      variant: newVariant,
      fuelType: newFuelType,
      oemId: newOemId,
      rtoId: newRtoId
    }
    dispatch({ type: GET_INSURER, payload: newInsurer })
    dispatch({ type: GET_POLICY, payload: newPolicyType })
    dispatch({ type: GET_BODY, payload: newBodyType })
    dispatch({ type: GET_MODELS, payload: newModel })
    dispatch({ type: GET_VARIANTS, payload: newVariant })
    dispatch({ type: GET_OEM, payload: newOemId })
    dispatch({ type: GET_FUEL_TYPE, payload: newFuelType })
    dispatch({ type: GET_RTO, payload: newRtoId })
    // console.log("Succes in tempGetAllConfig", defaultConfigValue)
  } catch (e) {
    console.log("Error in tempGetAllConfig")
  }
}
