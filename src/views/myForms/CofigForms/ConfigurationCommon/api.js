import axios from "axios"
import { configApiDataConvertor } from "../../../../aegisUtils"

export const getModelViaInsurer = async (insurer) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/database/getAllType/?category=model&insurer=${insurer}`
    }

    const response = await axios.request(config)
    console.log('response at model : ', response?.data)
    const returnData = configApiDataConvertor({list: response?.data, key:'model'})
    //! return if request succeed
    return {
      status: 200,
      data: returnData
    }
  } catch (e) {
    console.log("error while fetching vehicle model : ", e)

    //! return if error occured
    return {
      status: 404
    }
  }
}

export const getVariantViaInsurer = async (insurer) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/database/getAllType/?category=variant&insurer=${insurer}`
    }
    const response = await axios.request(config)
    const returnData = configApiDataConvertor({list: response?.data, key:'variant'})

    //! return if request succeed
    return {
      status: 200,
      data: returnData
    }
  } catch (e) {
    console.log("error while fetching vehicle variant : ", e)

    //! return if error occured
    return {
      status: 404
    }
  }
}
