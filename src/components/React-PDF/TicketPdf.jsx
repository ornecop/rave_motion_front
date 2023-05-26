import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { LinearGradient } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFFFFF",
    },
    section: {
        margin: "auto",
        padding: 10,
        textAlign: "center",
    },
    eventName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 5,
    },
    user: {
        fontSize: 15,
        marginBottom: 10,
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    image: {
        height: 250,
        width: 250,
    },
    ticketInfo: {
        fontSize: 15,
    },
});

// Create Document Component
const TicketPdf = ({ ticket }) => (
    <Document>
        <Page size="A4" style={styles.page} wrap="false">
            <View style={{ flexGrow: 1 }}>
                <View style={styles.section}>
                    <Text style={styles.eventName}>{ticket.Event.name}</Text>
                    <Text style={styles.user}>{ticket.email}</Text>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} src={ticket.qrImage} />
                    </View>
                    <Text style={styles.accessType}>
                        {ticket.Ticket.accessType}
                    </Text>
                    <Text style={styles.ticketInfo}>{ticket.id}</Text>
                </View>
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
