import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export const MyHandleSuccess = ({message}) => {
  return MySwal.fire({
    title: "Good job!",
    text: message,
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary"
    },
    buttonsStyling: false
  })
}

export const MyHandleInfo = ({message}) => {
  return MySwal.fire({
    title: "Info!",
    text: message,
    icon: "info",
    customClass: {
      confirmButton: "btn btn-primary"
    },
    buttonsStyling: false
  })
}

export const MyHandleWarning = () => {
  return MySwal.fire({
    title: "Warning!",
    text: " You clicked the button!",
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary"
    },
    buttonsStyling: false
  })
}

export const MyHandleError = () => {
  return MySwal.fire({
    title: "Error!",
    text: " You clicked the button!",
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary"
    },
    buttonsStyling: false
  })
}
