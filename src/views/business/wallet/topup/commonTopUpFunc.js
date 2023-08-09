import axios from "axios"

export const updateTopUpReqStatus = async (topupId, status) => {
  try {
    let data = JSON.stringify({
      acplTeamId: 4,
      topupStatus: status
    })

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/wallet/topup/${topupId}/status`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    }

    const patchRequestRes = await axios.request(config)
    console.log('patch request response : ', patchRequestRes)
    return 200
  } catch (e) {
    console.log("error on updating status : ", e)
    return 404
  }
}
