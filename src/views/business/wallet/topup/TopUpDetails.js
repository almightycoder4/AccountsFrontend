import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge, Row, Col } from "reactstrap"
import { notifyError, notifyInfo, notifySuccess } from "../../../myForms/Common/MyToasts"
import { updateTopUpReqStatus } from "./commonTopUpFunc"
import TopUpProofModal from "./TopUpProofModal"

const buttonSize = "sm"
const demoImage = "https://images.template.net/wp-content/uploads/2017/05/Fund-Transfer-Receipt.jpg"
const statusObj = {
  APPROVED: "light-success",
  PENDING: "light-warning",
  PROCESSING: "light-info"
}

const demoImage1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_XH1HpAPylzJ-jC6zXJ6AwHPgnxm38W9vg&usqp=CAU"
const demoImage2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3VrHDDjQbpAIzNWKcR8Lb6pE0MH5Nol6JA&usqp=CAU"
const demoImage3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitJaDVaFrc3amUn7Y_uBH-w1R7hgK5b4fqNTZOZyiaMsJh0RYg-rj_sBEBQ9qNuQUF4o&usqp=CAU"
const demoImage4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK72jZ3nO69qQylCo7zIQpe_1UAN2WEZ4jvg&usqp=CAU"

let images = [
  {
    url: demoImage1,
    title: "Image Description 1"
  },
  {
    url: demoImage2,
    title: "Image Description 1"
  },
  {
    url: demoImage3,
    title: "Image Description 1"
  },
  {
    url: demoImage4,
    title: "Image Description 1"
  }
]
export default function TopUpDetails({ isOpen, onClose, data, getLatestTopUpRequest, topupStatus }) {
  console.log("modalData : ", data)
  const [doxArr, setDoxArr] = useState([])
  const [openImage, setOpenImage] = useState(false)
  const [renderImg, setRenderImg] = useState("")
  const handleModal = () => {
    setOpenImage(!openImage)
  }

  const getTopUpDocuments = async () => {
    try {
      let configData = JSON.stringify({
        topupId: data?.topup_id
      })

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/wallet/topup/document",
        headers: {
          "Content-Type": "application/json"
        },
        data: configData
      }

      const documentData = await axios.request(config)
      console.log("document data response : ", documentData)
      setDoxArr(documentData?.data?.data)
    } catch (e) {
      console.log("error while fetching topup document : ", e)
    }
  }

  useEffect(() => {
    getTopUpDocuments()
  }, [])
  return (
    <div className="basic-modal">
      <Modal isOpen={isOpen} className="modal-lg">
        <ModalHeader toggle={onClose}>
          <code>Top Up Request Id : {data?.topup_id}</code>
        </ModalHeader>
        <ModalBody>
          <h6>
            <Badge className="text-capitalize" color={statusObj[data?.topup_status]} pill>
              {data?.topup_status === "APPROVED" && "Approved"}
              {data?.topup_status === "PENDING" && "Pending"}
              {data?.topup_status === "PROCESSING" && "Failed"}
            </Badge>
          </h6>
          <div>Transaction Amount : ₹ {data?.amount}</div>
          <div>Transaction Date : {data?.created_at?.split("T")?.[0]}</div>
          <div>Request Date : {data?.created_at?.split("T")?.[0]}</div>
          <div>Document Reference Id. : {doxArr?.[0]?.document_reference_no ? doxArr?.[0]?.document_reference_no : "Null"}</div>
          <div>Top-Up Request Proof :</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              rowGap: "5px",
              columnGap: "2.5px"
            }}
          >
            {doxArr?.map((item) => {
              return (
                <div
                  style={{
                    width: "100%"
                  }}
                >
                  <img
                    src={item?.document_url}
                    style={{
                      width: "100%",
                      marginLeft: "4px",
                      border: "2px solid lightgray",
                      borderRadius: "6px",
                      height: "200px"
                    }}
                    onClick={() => {
                      handleModal()
                      setRenderImg(item?.document_url)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          {data?.topup_status === "APPROVED" ? null : (
            <Button
              color="success"
              size={buttonSize}
              onClick={async () => {
                const status = await updateTopUpReqStatus(data?.topup_id, "APPROVED")
                if (status == 200) {
                  await getLatestTopUpRequest(topupStatus)
                  notifySuccess({message : 'Top-Up Approved'})
                } else {
                  notifyInfo({message : 'Top-Up declined failed'})
                }
              }}
            >
              Approve
            </Button>
          )}
          {data?.topup_status === "APPROVED" ? null : (
            <Button
              color="danger"
              size={buttonSize}
              onClick={async () => {
                const status = await updateTopUpReqStatus(data?.topup_id, "REJECT")
                if (status == 200) {
                  await getLatestTopUpRequest(topupStatus)
                  notifyInfo({message:'Top-Up request Declined'})
                } else {
                  notifyError({message:'Top-Up request decline failed'})
                }
              }}
            >
              Decline
            </Button>
          )}
          {/* <Button color="primary" onClick={onClose} size={buttonSize}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
      {openImage && <TopUpProofModal openImg={openImage} close={handleModal} imgUrl={renderImg} />}
    </div>
  )
}
