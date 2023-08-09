import { useState } from "react"
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Col,
  Row,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Table,
  Badge
} from "reactstrap"
import { Edit, MoreVertical, Trash2 } from "react-feather"

const inputFieldSize = "sm"
const accountsList = [
  { accountNum: "907856341274", accountType: 1, bankName: "HDFC", ifscCode: "HDFC0001720" },
  { accountNum: "687856341212", accountType: 2, bankName: "SBI", ifscCode: "SBI0009024" },
  { accountNum: "257856341226", accountType: 1, bankName: "ICICI", ifscCode: "ICICI0003482" }
]
export default function UserModal({ isOpen, onClose, data }) {
  const [edit, setEdit] = useState(true)
  return (
    <div className="basic-modal">
      <Modal isOpen={isOpen} className="modal-lg">
        <ModalHeader toggle={onClose}>{data?.name}</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="4">
              <FormGroup>
                <Label>Name</Label>
                <Input defaultValue={data?.name} disabled={edit} />
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup>
                <Label>Email</Label>
                <Input defaultValue={data?.email} disabled={edit} />
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup>
                <Label>Mobile</Label>
                <Input defaultValue={data?.mobile} disabled={edit} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {edit && (
                <Button onClick={() => setEdit(!edit)} color="primary" size="sm">
                  Edit
                </Button>
              )}
              {!edit && (
                <>
                  <Button color="primary" onClick={() => setEdit(!edit)} size="sm">
                    Save Changes
                  </Button>
                  <Button color="danger" onClick={() => setEdit(!edit)} className="ml-1" size="sm">
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              <div className="fs-2 " style={{ fontWeight: "bold" }}>
                Account Details
              </div>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              <Table size="sm" hover responsive className="text-center">
                <thead>
                  <th>S.No.</th>
                  <th>A/C No.</th>
                  <th>A/C Type</th>
                  <th>Bank Name</th>
                  <th>IFSC Code</th>
                  <th>Actions</th>
                </thead>
                {accountsList?.map((item, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}.</td>
                      <td>{item?.accountNum}</td>
                      <td>
                      <Badge className="text-capitalize" color={"light-success"}>{item?.accountType === 1 && "Savings"}</Badge>
                      <Badge className="text-capitalize" color={"light-info"}>{item?.accountType === 2 && "Current"}</Badge>
                      </td>
                      <td>{item?.bankName}</td>
                      <td>{item?.ifscCode}</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem className='w-100'>
                              <Edit size={14} className="mr-50" />
                              <span className="align-middle">Edit</span>
                            </DropdownItem>
                            <DropdownItem className='w-100'>
                              <Trash2 size={14} className="mr-50 text-danger" />
                              <span className="align-middle">Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  )
                })}
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className="fs-2 " style={{ fontWeight: "bold" }}>
              Upload New Document
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm="3">
              <FormGroup>
                <Label>A/C No.</Label>
                <Input placeholder="Enter A/C No." size={inputFieldSize} />
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>A/C Type</Label>
                <Input type="select" size={inputFieldSize}>
                  <option>Saving</option>
                  <option>Current</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Bank IFSC</Label>
                <Input placeholder="Enter Bank IFSC" size={inputFieldSize} />
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Bank Name</Label>
                <Input placeholder="Enter Bank Name" size={inputFieldSize} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <FormGroup>
                <Label>Aadhar No.</Label>
                <Input placeholder="Enter Aadhar No." size={inputFieldSize} />
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>Canceled Check</Label>
                <Input placeholder="Upload Canceled Check" size={inputFieldSize} />
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label>GSTIN (optional)</Label>
                <Input placeholder="Enter GSTIN No." size={inputFieldSize} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
                <Button size='sm' color='primary'>Add Account</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}
