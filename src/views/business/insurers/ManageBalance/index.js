import { Fragment } from "react"
import { Card, CardHeader, CardTitle } from "reactstrap"
import BreadCrumbs from "@components/breadcrumbs"

export default function ManageBalance () {
    return (<Fragment>
        {/* <BreadCrumbs breadCrumbTitle="Insurers" breadCrumbParent="Balance" breadCrumbActive="Manage" /> */}
        <Card>
            <CardHeader>
                <CardTitle>
                Manage Balance Page
                </CardTitle>
            </CardHeader>
        </Card>
    </Fragment>)
}