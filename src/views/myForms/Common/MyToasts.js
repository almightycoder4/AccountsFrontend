import { Fragment } from "react"
import { toast } from "react-toastify"
import Avatar from "@components/avatar"
import { Bell, Check, X, AlertTriangle, Info } from "react-feather"

const PrimaryToast = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="primary" icon={<Bell size={12} />} />
        <h6 className="toast-title">Default!</h6>
      </div>
      <small className="text-muted">11 Min Ago</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const SuccessToast = ({message}) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
      {/* <small className="text-muted">11 Min Ago</small> */}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
       {message}
      </span>
    </div>
  </Fragment>
)

const ErrorToast = ({message}) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Error!</h6>
      </div>
      {/* <small className="text-muted">11 Min Ago</small> */}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {message}
      </span>
    </div>
  </Fragment>
)

const WarningToast = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="warning" icon={<AlertTriangle size={12} />} />
        <h6 className="toast-title">Warning!</h6>
      </div>
      <small className="text-muted">11 Min Ago</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
)

const InfoToast = ({message}) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="info" icon={<Info size={12} />} />
        <h6 className="toast-title">Info!</h6>
      </div>
      {/* <small className="text-muted">A Moment Ago</small> */}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {message}
      </span>
    </div>
  </Fragment>
)

export const notifyDefault = () => toast(<PrimaryToast />, {position: toast.POSITION.BOTTOM_CENTER, hideProgressBar: true })
export const notifySuccess = ({message}) => toast.success(<SuccessToast message={message}/>, {position: toast.POSITION.BOTTOM_CENTER, hideProgressBar: true })
export const notifyError = ({message}) => toast.error(<ErrorToast message={message}/>, {position: toast.POSITION.BOTTOM_CENTER, hideProgressBar: true })
export const notifyWarning = () => toast.warning(<WarningToast />, {position: toast.POSITION.BOTTOM_CENTER, hideProgressBar: true })
export const notifyInfo = ({message}) => toast.info(<InfoToast message={message}/>, {position: toast.POSITION.BOTTOM_CENTER, hideProgressBar: true })
export const notifySuccessProgress = () => toast.success(<SuccessProgressToast />)
