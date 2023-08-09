import { Fragment } from "react"
import BreadCrumbs from "@components/breadcrumbs"

export default function SingleCertificate () {
    return (<Fragment>
        <BreadCrumbs breadCrumbTitle="Certificates" breadCrumbParent="Certificate" breadCrumbActive="#certificateId" />
    </Fragment>)
}