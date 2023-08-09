import { Fragment } from "react"
import { Card, CardHeader, CardTitle } from "reactstrap"
import BreadCrumbs from "@components/breadcrumbs"

export default function Claims () {
    return (<Fragment>
        {/* <BreadCrumbs breadCrumbTitle="Policies" breadCrumbParent="Claims" breadCrumbActive="Table" /> */}
        <Card>
            <CardHeader>
                <CardTitle>
                Claims Page
                </CardTitle>
            </CardHeader>
        </Card>
    </Fragment>)
}