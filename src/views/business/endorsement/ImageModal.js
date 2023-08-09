import { X } from "react-feather"
import { Modal } from "reactstrap"

const demoImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_XH1HpAPylzJ-jC6zXJ6AwHPgnxm38W9vg&usqp=CAU"
export default function ImageModal({ openImg, close, imgUrl }) {
  return (
    <Modal isOpen={openImg} className="modal-lg">
      <div
        style={{
          marginLeft: "54.9rem"
        }}
      >
        <X
          size={30}
          onClick={close}
          style={{
            position: "relative",
            zIndex: "auto"
          }}
        />
      </div>
      <div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            height: "100%"
          }}
        >
          <img
            style={{
              objectFit: "cover",
              alignItems: "center",
              margin: "auto",
              width: "100%"
            }}
            src={imgUrl || demoImage}
          />
        </div>
      </div>
    </Modal>
  )
}
