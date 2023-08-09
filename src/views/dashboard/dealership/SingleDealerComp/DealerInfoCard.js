import Avatar from "@components/avatar"
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap"
import { DollarSign, Check, Star, Flag, Phone, MapPin, Map, TrendingUp, Compass } from "react-feather"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function DealerInfoCard({ data }) {
  // console.log("dealerinfo : ", data)
  const [walletBalance, setWalletBalance] = useState('---')
  const getWalletBalance = async () => {
    console.log('wallet id dealership : ', data?.dealership_wallet_id)
    try {
      let configData = JSON.stringify({
        userType: data?.dealer_type,
        userIds: [data?.dealership_wallet_id],
        sort: "",
        limit: 100,
        offset: 0
      })

      let config = {
        method: "post",
        // maxBodyLength: Infinity,
        url: "https://svki1qz191.execute-api.ap-south-1.amazonaws.com/dev/default/wallet/fetch",
        headers: {
          "Content-Type": "application/json"
        },
        data: configData
      }

      const response = await axios.request(config)
      console.log("wallet balance : ", response?.data?.data)
      setWalletBalance(response?.data?.data?.[0]?.wallet_balance)
    } catch (e) {
      console.log("error while get wallet balance : ", e)
    }
  }

  const renderDealerImg = () => {
    const stateNum = Math.floor(Math.random() * 6)
    const states = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"]
    const color = states[stateNum]
    return (
      <Avatar
        initials
        color={color}
        className="rounded"
        content={data?.name}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(36px)",
          width: "100%",
          height: "100%"
        }}
        style={{
          height: "90px",
          width: "90px"
        }}
      />
    )
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="5" className="d-flex flex-column justify-content-between border-container-lg">
            <div className="user-avatar-section">
              <div className="d-flex justify-content-start">
                {/* Dealer Avatar */}
                {renderDealerImg()}
                {/* Feature Buttons */}
                <div className="d-flex flex-column ml-1">
                  <div className="user-info mb-1">
                    <h4 className="mb-0">{data?.name}</h4>
                    <CardText tag="span">{data?.name}</CardText>
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    <Button.Ripple tag={Link} to={`/dashboard/dealership/main/${data?.id}`} color="primary">
                      Edit
                    </Button.Ripple>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col sm="4" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              {/* Dealer Status */}
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="user-info-title">
                  <Check className="mr-1" size={14} />
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Amount
                  </CardText>
                </div>
                <CardText className="mb-0">{data?.is_active ? "Active" : "Inactive"}</CardText>
              </div>
              {/* Dealer Role */}
              <div className="d-flex flex-wrap justify-content-between align-items-center my-50">
                <div className="user-info-title">
                  <Star className="mr-1" size={14} />
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Role
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">{data?.dealer_type === "DEALER" ? "Dealership" : "Sub-Dealership"}</CardText>
              </div>
              {/* Dealer State */}
              <div className="d-flex flex-wrap justify-content-between align-items-center my-50">
                <div className="user-info-title">
                  <Flag className="mr-1" size={14} />
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    State
                  </CardText>
                </div>
                <CardText className="mb-0">{data?.state}</CardText>
              </div>
              {/* Dealer City */}
              <div className="d-flex flex-wrap justify-content-between align-items-center my-50">
                <div className="user-info-title">
                  <MapPin className="mr-1" size={14} />
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    City
                  </CardText>
                </div>
                <CardText className="mb-0">{data?.city}</CardText>
              </div>
              {/* Dealer Contact */}
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="user-info-title">
                  <Phone className="mr-1" size={14} />
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Contact
                  </CardText>
                </div>
                <CardText className="mb-0">{data?.mobile}</CardText>
              </div>
            </div>
          </Col>

          <Col sm="3" className="d-flex flex-column justify-content-between border-container-lg">
            <div>
              <div className="d-flex align-items-center mr-2">
                <div className="color-box bg-light-primary" style={{ padding: "5px" }}>
                  <DollarSign className="text-primary" size={30} />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">&#8377; {walletBalance}</h5>
                  <small>Wallet Balance</small>
                </div>
              </div>
              <div className="d-flex align-items-center mt-1">
                <div>
                  <Button size="sm" color="primary" onClick={getWalletBalance}>
                    View Balance
                  </Button>
                </div>
              </div>
              <div className="d-flex align-items-center mt-1">
                <div className="color-box bg-light-success" style={{ padding: "5px" }}>
                  <TrendingUp className="text-success" size={30} />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">900</h5>
                  <small>Total Policies</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm="3">
            <div className="user-info-title">
              <Compass className="mr-1" size={14} />
              <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                Pincode
              </CardText>
            </div>
            <CardText>{data?.pincode}</CardText>
          </Col>
          <Col sm="3">
            <div className="user-info-title">
              <Map className="mr-1" size={14} />
              <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                RTO Id
              </CardText>
            </div>
            <CardText>{"123"}</CardText>
          </Col>
          <Col sm="6">
            <div className="user-info-title">
              <MapPin className="mr-1" size={14} />
              <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                Address
              </CardText>
            </div>
            <div>
              <CardText>{data?.address}</CardText>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
