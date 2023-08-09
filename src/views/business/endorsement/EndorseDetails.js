import { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap"
import ImageModal from "./ImageModal"

const buttonSize = "sm"
const demoImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_XH1HpAPylzJ-jC6zXJ6AwHPgnxm38W9vg&usqp=CAU"
const demoImage2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3VrHDDjQbpAIzNWKcR8Lb6pE0MH5Nol6JA&usqp=CAU'
const demoImage3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitJaDVaFrc3amUn7Y_uBH-w1R7hgK5b4fqNTZOZyiaMsJh0RYg-rj_sBEBQ9qNuQUF4o&usqp=CAU'
const demoImage4 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK72jZ3nO69qQylCo7zIQpe_1UAN2WEZ4jvg&usqp=CAU'

let images = [
  {
    url: demoImage,
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
export default function EndorseDetails({ isOpen, onClose, data }) {
  console.log("modalData : ", data)
  const [openImage, setOpenImage] = useState(false)
  const [renderImg, setRenderImg] = useState('')
  const handleModal = () => {
    setOpenImage(!openImage)
  }
  return (
    <div className="basic-modal">
      <Modal isOpen={isOpen} className="modal-lg">
        <ModalHeader toggle={onClose}>
          Dealership Name : <code>{data?.dealer_name}</code>
        </ModalHeader>
        <ModalBody>
          <h6>
            Requested User :
            <Badge className="text-capitalize" color={"light-primary"} pill>
              {data?.request_user}
            </Badge>
          </h6>
          <div>Request Date : {data?.request_date}</div>
          <div>Request ID : {data?.request_id}</div>
          <div>Dealer ID : {data?.dealer_id}</div>
          
              <div>Endorsement Proof :</div>
              <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                rowGap:'5px',
                columnGap:'2.5px'
              }}
              >
                {images?.map((item) => {
                    return <div
                    style={{
                        width:'100%'
                    }}
                    ><img
                    src={item?.url}
                    style={{
                        width:'100%',
                        marginLeft:'4px',
                        border:'2px solid lightgray',
                        borderRadius:'6px',
                        height:'200px'
                    }}
                    onClick={() => {
                        handleModal()
                        setRenderImg(item?.url)
                    }}
                    /></div>
                })}
              </div>
              {/* <Button onClick={() => setOpenImage(!openImage)} size="sm">
                Open Image
              </Button> */}
            
        </ModalBody>
        <ModalFooter>
          <Button color="success" size={buttonSize}>
            Approve
          </Button>
          <Button color="danger" size={buttonSize}>
            Decline
          </Button>
          <Button color="primary" onClick={onClose} size={buttonSize}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {openImage && <ImageModal openImg={openImage} close={handleModal} imgUrl={renderImg}/>}
    </div>
  )
}
