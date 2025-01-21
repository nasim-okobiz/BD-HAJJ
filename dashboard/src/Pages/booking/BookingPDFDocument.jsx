// BookingPDFDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import moment from "moment";
// import logoImage from "../../src/assets/logo.png";
import logoImage from "../../assets/logo.png";
import { API_BASE_URL } from "../../Components/config";
// Define styles for the PDF
const styles = StyleSheet.create({
    page: { padding: 20 },

    //   container: { textAlign: "center", marginBottom: 24 },
    logo: { width: 64, height: 64, margin: "0 auto" },
    orderInfo: { color: "#4a5568", fontSize: 12, marginTop: 4 },
    container: {
        display: "flex",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f7fafc",
        minHeight: "100vh",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 8,
        borderRadius: 5,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        width: "100%",
    },
    paymentStatus: (isPaid) => ({
        color: isPaid ? "green" : "red",
        fontWeight: "bold", // Add bold styling here
    }),
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 4, textAlign: "center" },
    orderId: { fontSize: 12, color: "#4a5568", textAlign: "center" },
    orderDate: { fontSize: 12, color: "#4a5568", textAlign: "center" },
    section: { marginBottom: 8, fontSize: 12 },
    header: { backgroundColor: "#e2e8f0", fontSize: 14, fontWeight: "bold", padding: 5, marginBottom: 2, marginTop: 16 },
    productHeader: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
    tableHeader: { backgroundColor: "#dcfce7", flexDirection: "row", padding: 4, fontWeight: "bold" },
    tableRow: { flexDirection: "row", padding: 4 },
    tableCell: { flex: 1, padding: 2, },
    tableCellPhoneEmail: {
        flex: 1, padding: 2,
        minWidth: 50,
        // minHeight: 200,
    },
    textRight: { textAlign: "right" },
    totalCost: { fontSize: 14, fontWeight: "bold", textAlign: "right", marginTop: 4 },

    pagePerson: { padding: 20 },
    headerPerson: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    sectionPerson: { marginBottom: 10, fontSize: 12 },
    boldTextPerson: { fontWeight: "bold", },
    productHeaderPerson: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
    tableHeaderPerson: { flexDirection: "row", marginBottom: 5 },
    evenTableRowPerson: { flexDirection: "row", },
    oddTableRowPerson: { backgroundColor: "#d6d3d1", flexDirection: "row", },
    tableCellPerson: { flex: 1, padding: 2 },
    textRightPerson: { textAlign: "right" },
    totalCostPerson: { fontSize: 14, fontWeight: "bold", marginTop: 4 },
    imagePerson: { width: 50, height: 50, margin: 5 }, // Image style
});
// evenColumn: {
//     backgroundColor: '#f0f0f0', // Light color for even columns
// },
// oddColumn: {
//     backgroundColor: '#d0d0d0', // Darker color for odd columns
// },

const BookingPDFDocument = ({ booking, payments }) => {
    const isPaid = booking?.totalDue <= 0;
    return (
        <Document>
            <Page style={styles.page}>

                <View style={styles.card}>
                    <Image style={styles.logo} src={logoImage} alt="Logo" />
                    <Text style={styles.title}>Order Invoice</Text>
                    <Text style={styles.orderId}>Order ID: {booking?.bookingId || "5e72cb"}</Text>
                    <Text style={styles.orderDate}>
                        {moment(booking.createdAt).format("MMMM D, YYYY [at] h:mm A")}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Single Package Information</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Name:</Text> {booking?.packageRef?.name || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Price:</Text> {booking?.packageRef?.price || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Discount:</Text> {booking?.packageRef?.discountPrice || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>MRP Price:</Text> {booking?.packageRef?.mrpPrice || ""}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Booking Person Information</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Package Name:</Text> {booking?.userRef?.name || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Email:</Text> {booking?.userRef?.email || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Phone:</Text> {booking?.userRef?.phone || ""}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Address:</Text> {booking?.userRef?.address || ""}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Booking Information</Text>
                    <Text style={styles.paymentStatus(isPaid)}><Text >Payment Status:</Text> {booking?.totalDue <= 0 ? "Paid" : "Uncomplete"}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Total Person:</Text> {booking?.totalPerson || "0"}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Total Pay:</Text> {booking?.totalPay || "0"}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Total Due:</Text> {booking?.totalDue || "0"}</Text>

                </View>


                <View style={styles.section}>

                    <Text style={styles.header}>Person Information</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>Name</Text>
                        </Text>
                        <Text style={styles.tableCellPhoneEmail}>
                            <Text style={styles.boldTextPerson}>Phone</Text>
                            {"\n"}
                            <Text style={styles.boldTextPerson}>Email</Text>
                        </Text>
                        {/* <Text style={styles.tableCell}>
                        </Text> */}
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>District</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>Division</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>NID Front</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>NID Back</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>Passport Front</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>Passport Back</Text>
                        </Text>
                        <Text style={styles.tableCell}>
                            <Text style={styles.boldTextPerson}>Passport Photo</Text>
                        </Text>

                    </View>

                    {booking?.personRef?.map((person, personIndex) => (
                        <View
                            // style={styles.tableRowPerson} 
                            style={[
                                personIndex % 2 === 0 ? styles.evenTableRowPerson : styles.oddTableRowPerson
                            ]}
                            key={person?._id}>
                            <Text style={styles.tableCell}>
                                <Text style={styles.boldTextPerson}>{person?.name || "N/A"}</Text>
                            </Text>
                            <Text style={styles.tableCellPhoneEmail}>
                                <Text style={styles.boldTextPerson}>{person?.phone || "N/A"}</Text>
                                {"\n"}
                                <Text style={styles.boldTextPerson}>{person?.email || "N/A"}</Text>
                            </Text>
                            {/* <Text style={styles.tableCell}>
                            </Text> */}
                            <Text style={styles.tableCell}>
                                <Text style={styles.boldTextPerson}>{person?.district || "N/A"}</Text>
                            </Text>
                            <Text style={styles.tableCell}>
                                <Text style={styles.boldTextPerson}>{person?.division || "N/A"}</Text>
                            </Text>

                            <Text style={styles.tableCell}>
                                {person.nidFront ? (
                                    <Image
                                        style={styles.imagePerson}
                                        src={`${API_BASE_URL}${person?.nidFront}`}
                                        alt="NID Front"

                                    />
                                ) : (
                                    <Text style={styles.noImageText}>N/A</Text>
                                )}
                            </Text>
                            <Text style={styles.tableCell}>
                                {person.nidBack ? (
                                    <Image
                                        style={styles.imagePerson}
                                        src={`${API_BASE_URL}${person?.nidBack}`}
                                        alt="NID Back"

                                    />
                                ) : (
                                    <Text style={styles.noImageText}>N/A</Text>
                                )}
                            </Text>
                            <Text style={styles.tableCell}>
                                {person.passportFront ? (
                                    <Image
                                        style={styles.imagePerson}
                                        src={`${API_BASE_URL}${person?.passportFront}`}
                                        alt="Passport Front"

                                    />
                                ) : (
                                    <Text style={styles.noImageText}>N/A</Text>
                                )}
                            </Text>
                            <Text style={styles.tableCell}>
                                {person.passportBack ? (
                                    <Image
                                        style={styles.imagePerson}
                                        src={`${API_BASE_URL}${person?.passportBack}`}
                                        alt="Passport Back"

                                    />
                                ) : (
                                    <Text style={styles.noImageText}>N/A</Text>
                                )}
                            </Text>
                            <Text style={styles.tableCell}>
                                {person.passportPhoto ? (
                                    <Image
                                        style={styles.imagePerson}
                                        src={`${API_BASE_URL}${person?.passportPhoto}`}
                                        alt="Passport Photo"

                                    />
                                ) : (
                                    <Text style={styles.noImageText}>N/A</Text>
                                )}
                            </Text>

                            {/* Display Images */}


                            <Text style={{ marginBottom: 10 }} />
                        </View>
                    ))}


                    <View style={styles.section}>
                        <Text style={styles.header}>Payments Information</Text>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCell}>Pay Name</Text>
                            <Text style={styles.tableCell}>Pay Role</Text>
                            <Text style={styles.tableCell}>Booking Price</Text>
                            <Text style={styles.tableCell}>Amount</Text>
                            <Text style={styles.tableCell}>Date</Text>
                            <Text style={styles.tableCell}>Payment Method</Text>
                        </View>
                        {payments?.map((payment) => (
                            <View style={styles.tableRow} key={payment?._id}>
                                <Text style={styles.tableCell}>{payment?.userRef?.name || "No Name"}</Text>
                                <Text style={styles.tableCell}>{payment?.userRef?.role || "No Role"}</Text>
                                <Text style={styles.tableCell}>{payment?.bookingRef?.totalPrice || "No Price"}</Text>
                                <Text style={styles.tableCell}>{payment?.amount || "0"}</Text>
                                <Text style={styles.tableCell}>
                                    {payment?.paymentDate ? moment(payment?.paymentDate).format("DD/MM/YYYY") : "No Date"}
                                </Text>
                                <Text style={styles.tableCell}>{payment?.paymentMethod || "No Method"}</Text>
                            </View>
                        ))}
                    </View>

                </View>
            </Page>
        </Document>
    );
};

export default BookingPDFDocument;

