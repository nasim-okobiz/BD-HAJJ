import React, { useState } from "react";
import { Input, Button, message, Card, Spin, Descriptions } from "antd";
import axiosInstance from "../../../Components/Axios";

const MembershipValidateComponent = () => {
    const [membershipId, setMembershipId] = useState("");
    const [membershipData, setMembershipData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setMembershipId(e.target.value);
        setMembershipData(null); // Reset previous data when input changes
        setErrorMessage(""); // Reset error message
    };

    const validateMembership = async () => {
        if (!membershipId) {
            message.warning("Please enter a membership ID.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.get(`/membership?memberId=${membershipId}`);
            if (response?.data?.data && response.data.data.length > 0) {
                setMembershipData(response.data.data[0]);
                setErrorMessage(""); // Clear any previous error message
                message.success("Membership ID is valid.");
            } else {
                setErrorMessage("Invalid membership ID.");
                setMembershipData(null);
            }
        } catch (error) {
            setErrorMessage("Invalid membership ID.");
            setMembershipData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-5">
            <Card>
                <div className="flex justify-center mb-4">
                    <Input
                        placeholder="Enter Membership ID"
                        value={membershipId}
                        onChange={handleInputChange}
                        style={{ width: 300, marginRight: 10 }}
                    />
                    <Button type="primary" onClick={validateMembership} loading={loading}>
                        Validate
                    </Button>
                </div>

                {/* Loading Spinner */}
                {loading && <Spin tip="Validating..." style={{ display: "block", textAlign: "center" }} />}

                {/* Display Membership Data */}
                {membershipData && (
                    <Card title="Membership Details" style={{ width: 600, margin: "20px auto" }}>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Name">{membershipData.name}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{membershipData.phone}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{membershipData.occupation}</Descriptions.Item>
                            <Descriptions.Item label="Division">{membershipData.division}</Descriptions.Item>
                            <Descriptions.Item label="District">{membershipData.district}</Descriptions.Item>
                            <Descriptions.Item label="Union">{membershipData.union}</Descriptions.Item>
                            <Descriptions.Item label="Person Category">{membershipData.personCategory}</Descriptions.Item>
                            <Descriptions.Item label="Agent Type">{membershipData.agentType}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}

                {/* Display Error Message */}
                {errorMessage && (
                    <p style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorMessage}</p>
                )}
            </Card>
        </div>
    );
};

export default MembershipValidateComponent;
