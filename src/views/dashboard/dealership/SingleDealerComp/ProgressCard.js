import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from "reactstrap"

const OemMap = {
  1: "Yamaha Motor India",
  2: "TVS Motor",
  3: "Royal Enfield",
  4: "Honda Motor Company",
  5: "Bajaj Auto",
  6: "Hero MotoCorp",
  7: "Suzuki Motorcycle",
  8: "KTM",
  9: "Harley-Davidson"
}
const month = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}
export default function ProgressCard({ data }) {
  return (
    <Card className="plan-card border-primary">
      <CardHeader className="d-flex justify-content-between align-items-center pt-75 pb-1">
        <h5 className="mb-0">Progress Card</h5>
        <Badge id="plan-expiry-date" color="light-secondary">
          {month[new Date().getMonth() + 1]} {new Date().getDate()}, {new Date().getFullYear()}
        </Badge>
        <UncontrolledTooltip placement="top" target="plan-expiry-date">
          Registration Date
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>
        <Badge className="text-capitalize" color="light-primary">
          {OemMap[Math.floor(Math.random() * 10) || 1]}
        </Badge>
        <ul className="list-unstyled my-1">
          <li>
            <span className="align-middle">5 Users</span>
          </li>
          <li className="my-25">
            <span className="align-middle">19 Sub D/S</span>
          </li>
          <li>
            <span className="align-middle">Basic Support</span>
          </li>
        </ul>
        {data?.dealer_type === "DEALER" ? (
          <Button.Ripple className="text-center" color="primary" block>
            View Sub D/S
          </Button.Ripple>
        ) : null}
      </CardBody>
    </Card>
  )
}
