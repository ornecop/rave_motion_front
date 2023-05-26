import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#00000",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    eventName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 5,
    },
    user: {
        fontSize: 12,
        marginBottom: 10,
    },
    image: {
        height: 250,
        width: 250,
        marginBottom: 10,
    },
    ticketInfo: {
        fontSize: 10,
    },
});

// Create Document Component
const TicketPdf = ({ ticket }) => (
    <Document>
        <Page size="A4" style={styles.page} wrap>
            <View style={styles.section}>
                <Text style={styles.eventName}>{ticket.Event.name}</Text>
                <Text style={styles.user}>{ticket.email}</Text>
                <Image style={styles.image} src={ticket.qrImage} />
                <Text style={styles.ticketInfo}>ID: {ticket.id}</Text>
            </View>
        </Page>
    </Document>
);

export default TicketPdf;

/*
{
		"id": "b6955cec-feda-405d-84ee-23831a49ec97",
		"ticketId": "25b01bcc-ec69-4bd4-9af3-999929f6fbc2",
		"userId": "1d544b05-6401-408c-898d-c80781b7bdaa",
		"eventId": "09e3ede5-ce91-4b12-b0b1-a31b72073fa8",
		"qrImage": "https://res.cloudinary.com/dv8oxhsmk/raw/upload/v1685110980/qrCode.png",
		"email": "facufcasado@gmail.com",
		"validate": false,
		"TicketId": null,
		"UserId": null,
		"EventId": null,
		"Ticket": {
			"accessType": "Acceso general",
			"name": "General 1"
		},
		"Event": {
			"name": "ALAN FITZPATRICK",
			"date": "2023-06-23T00:00:00.000Z"
		}
	}
*/
