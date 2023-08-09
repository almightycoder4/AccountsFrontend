import { Fragment } from "react"
import { CardBody, CardHeader, CardTitle, Card, Media, CardText, Row, Col } from "reactstrap"
import BreadCrumbs from "@components/breadcrumbs"
import { useParams } from "react-router-dom"
import { TrendingUp, User, PenTool, Users, Check, Tool } from "react-feather"
import Avatar from '@components/avatar'

export default function SinglePolicy() {
  const { id } = useParams()
  const data = [
    {
      title: "₹ 13000",
      subtitle: "Premium",
      color: "light-primary",
      icon: <TrendingUp size={24} />
    },
    {
      title: "₹ 7000",
      subtitle: "ACPL",
      color: "light-info",
      icon: <User size={24} />
    },
    {
      title: "₹ 3000",
      subtitle: "Pay-Out",
      color: "light-danger",
      icon: <PenTool size={24} />
    },
    {
      title: "₹ 4000",
      subtitle: "Commission",
      color: "light-success",
      icon: <Users size={24} />
    },
    {
      title: "Success",
      subtitle: "Status",
      color: "light-success",
      icon: <Check size={24} />
    },
    {
      title: "Bike",
      subtitle: "Bajaj",
      color: "light-info",
      icon: <Tool size={24} />
    }
  ]
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle="Insurance" breadCrumbParent="Policy" breadCrumbActive={`#${id}`} /> */}
      <Card>
        <CardHeader>
          <CardTitle>
            Policy ID : <span className="text-danger">{id}</span>
          </CardTitle>
          <CardText className="card-text font-small-2 mr-25 mb-0">Date : 22-06-2023</CardText>
        </CardHeader>
        <CardBody>
          <Row>
            {data?.map((item) => {
              return (
                <Col sm="2">
                  <Media>
                    <Avatar color={item.color} icon={item.icon} className="mr-2" />
                    <Media className="my-auto" body>
                      <h4 className="font-weight-bolder mb-0">{item.title}</h4>
                      <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
                    </Media>
                  </Media>
                </Col>
              )
            })}
          </Row>
        </CardBody>
      </Card>
      {/* <Card className="card-statistics">
        <CardHeader>
          <CardTitle tag="h4">Statistics</CardTitle>
          <CardText className="card-text font-small-2 mr-25 mb-0">Date : 22-06-2023</CardText>
        </CardHeader>
        <CardBody className="statistics-body">
          <Row></Row>
        </CardBody>
      </Card> */}
    </Fragment>
  )
}
