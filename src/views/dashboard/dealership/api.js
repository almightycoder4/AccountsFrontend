import axios from "axios"

export const getDealershipData = async (dealerType, offset, search) => {
  try {
    let configData

    if (search) {
      configData = JSON.stringify({
        dealerType: dealerType,
        offset: +offset,
        search: search
      })
    } else if (offset) {
      configData = JSON.stringify({
        dealerType: dealerType,
        offset: +offset
      })
    } else {
      configData = JSON.stringify({
        dealerType: dealerType
      })
    }

    let config = {
      method: "post",
      url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/user/dealership/filter",
      headers: {
        "Content-Type": "application/json"
      },
      data: configData
    }
    const response = await axios.request(config)
    let { data: dealerData } = response
    dealerData = dealerData.dealerships.map((item) => {
      return { ...item?.dealership }
    })
    //   console.log("dealerData : ", dealerData)
    //! return if request succeed
    return {
      status: 200,
      data: dealerData
    }
  } catch (e) {
    console.log(`error while fetching ${dealerType} : `, e)
    //! return if error occured
    return {
      status: 404
    }
  }
}
