import axios from "axios"
import { notifyInfo, notifySuccess } from "../views/myForms/Common/MyToasts"

export const deleteConfig = async (configHash, dealerID, accessToken) => {
  let deleteMe = JSON.stringify([{ configHash: configHash, dealerID: dealerID }])
//   console.log('inside deleteConfig function')
  try {
    let baseURL = "https://svki1qz191.execute-api.ap-south-1.amazonaws.com"
    let extendMe = "/dev/default/config/deleteConfig"
    let axiosConfig = {
      url: baseURL + extendMe,
      method: "delete",
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      data: deleteMe
    }
    const response = await axios.request(axiosConfig)
    console.log("res : deleteConfig : ", response?.data)
    notifySuccess({ message: "Config Deleted" })
  } catch (e) {
    notifyInfo({ message: "Unable to create ACPL, try again!!!" })
  }
}

export const getDealershipGlobal = async (dealerType) => {
  try {
    let data = JSON.stringify({
      dealerType: dealerType
    })

    let config = {
      method: "post",
      url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/filter",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    }
    const dealershipFetched = await axios.request(config)
    let { data: dealerData } = dealershipFetched
    dealerData = dealerData?.dealerships.map((item) => {
      return { ...item?.dealership }
    })
    return {
      status: 200,
      data: dealerData
    }
  } catch (e) {
    return {
      status: 404
    }
  }
}

export const getThisDealershipUsers = async (id) => {
  try {
    let configData = JSON.stringify({
      dealershipID: id
    })

    let config = {
      method: "post",
      url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/users/bulk",
      headers: {
        "Content-Type": "application/json"
      },
      data: configData
    }

    const response = await axios.request(config)
    const { data } = response
    return {
      status: 200,
      data: data?.users
    }

  } catch (e) {
    return {
      status: 404
    }
  }
}

  //! get Indian City based on State
export const getCityViaState = async (indianState) => {
    try {
      let data = JSON.stringify({
        "state": indianState
      })
      
      let config = {
        method: 'post',
        url: 'https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/database/rto-details',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      }

      const cityData = await axios.request(config)
      // console.log('city via state', cityData?.data?.data)
      const cityList = cityData?.data?.data?.map((item) => {
        return {...item?.rto}
      })
      // console.log('city via state updated ', cityList)
      return {
        status: 200,
        data: cityList
      }
    } catch (e) {
      console.log('error while getting City : ', e)
      return {
        status: 404
      }
    }
  } 

  //! get Indian City based on State
export  const getRtoViaCity = async (indianCity) => {
    try {
      let data = JSON.stringify({
        "city": indianCity
      })
      
      let config = {
        method: 'post',
        url: 'https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/database/rto-details',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      }

      const rtoData = await axios.request(config)
      // console.log('rto via city', rtoData?.data?.data)
      const rtoList = rtoData?.data?.data?.map((item) => {
        return {...item?.rto}
      })
      // console.log('rto via city updated ', rtoList)
      return {
        status: 200,
        data: rtoList
      }
    } catch (e) {
      console.log('error while getting Rto : ', e)
      return {
        status: 404
      }
    }
  }