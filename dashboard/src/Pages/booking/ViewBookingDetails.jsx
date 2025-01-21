import React from "react";
import { Modal, Button, Row, Col, Divider, Image } from "antd";
import { UserOutlined, PhoneOutlined, InfoCircleOutlined } from '@ant-design/icons'; // Import icons
import { API_BASE_URL } from "../../Components/config";

const ViewBookingDetails = ({ visible, onClose, booking }) => {
  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {booking ? (
        <div>
          <Divider orientation="left">User Information</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <p>
                <UserOutlined /> <strong>User Name:</strong> {booking.userRef?.name || "No User"}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <PhoneOutlined /> <strong>User Phone:</strong> {booking.userRef?.phone || "No User"}
              </p>
            </Col>
          </Row>

          <Divider orientation="left">Package Information</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <p>
                <strong>Package Name:</strong> {booking.packageRef?.name || "No Package"}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <InfoCircleOutlined /> <strong>Total Persons:</strong> {booking.totalPerson}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <InfoCircleOutlined /> <strong>Total Price:</strong> {booking.totalPrice}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <InfoCircleOutlined /> <strong>Total Payment:</strong> {booking.totalPay}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <InfoCircleOutlined /> <strong>Total Due:</strong> {booking.totalDue}
              </p>
            </Col>
          </Row>

          {booking.personRef && booking.personRef.length > 0 ? (
            <>
              <Divider orientation="left">Person Details</Divider>
              {booking.personRef.map((person, index) => (
                person && ( // Check if person has data
                  <div key={index}>
                    <Row gutter={16}>
                      {person.name && (
                        <Col span={12}>
                          <p>
                            <UserOutlined /> <strong>Name:</strong> {person.name}
                          </p>
                        </Col>
                      )}
                      {person.phone && (
                        <Col span={12}>
                          <p>
                            <PhoneOutlined /> <strong>Phone:</strong> {person.phone}
                          </p>
                        </Col>
                      )}
                      {person.eamil && (
                        <Col span={12}>
                          <p><strong>Email:</strong> {person.eamil}</p>
                        </Col>
                      )}
                      {person.division && (
                        <Col span={12}>
                          <p><strong>Division:</strong> {person.division}</p>
                        </Col>
                      )}
                      {person.District && (
                        <Col span={12}>
                          <p><strong>District:</strong> {person.District}</p>
                        </Col>
                      )}
                      {person.upazila && (
                        <Col span={12}>
                          <p><strong>Upazila:</strong> {person.upazila}</p>
                        </Col>
                      )}
                      {person.union && (
                        <Col span={12}>
                          <p><strong>Union:</strong> {person.union}</p>
                        </Col>
                      )}
                    </Row>
                    <Row gutter={16}>
                      {person.nidFront && (
                        <Col span={8}>
                          <Image
                            src={`${API_BASE_URL}${person.nidFront}`}
                            alt="NID Front"
                            width={100}
                            style={{ borderRadius: "8px" }}
                          />
                          <p>NID Front</p>
                        </Col>
                      )}
                      {person.nidBack && (
                        <Col span={8}>
                          <Image
                            src={`${API_BASE_URL}${person.nidBack}`}
                            alt="NID Back"
                            width={100}
                            style={{ borderRadius: "8px" }}
                          />
                          <p>NID Back</p>
                        </Col>
                      )}
                      {person.passportPhoto && (
                        <Col span={8}>
                          <Image
                            src={`${API_BASE_URL}${person.passportPhoto}`}
                            alt="Passport Photo"
                            width={100}
                            style={{ borderRadius: "8px" }}
                          />
                          <p>Passport Photo</p>
                        </Col>
                      )}
                      {person.passportFront && (
                        <Col span={8}>
                          <Image
                            src={`${API_BASE_URL}${person.passportFront}`}
                            alt="Passport Front"
                            width={100}
                            style={{ borderRadius: "8px" }}
                          />
                          <p>Passport Front</p>
                        </Col>
                      )}
                      {person.passportBack && (
                        <Col span={8}>
                          <Image
                            src={`${API_BASE_URL}${person.passportBack}`}
                            alt="Passport Back"
                            width={100}
                            style={{ borderRadius: "8px" }}
                          />
                          <p>Passport Back</p>
                        </Col>
                      )}
                    </Row>
                    {index < booking.personRef.length - 1 && <Divider />}
                  </div>
                )
              ))}
            </>
          ):(
            <p>No person details available.</p>
          )
          }
        </div>
      ) : (
        <p>No booking details available.</p>
      )}
    </Modal>
  );
};

export default ViewBookingDetails;
