import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";

// Fonts
import MontserratRegular from "../../assets/fonts/Montserrat-Regular.ttf";
import MontserratBold from "../../assets/fonts/Montserrat-Bold.ttf";
import MontserratSemiBold from "../../assets/fonts/Montserrat-SemiBold.ttf";

Font.register({
    family: "Montserrat",
    fonts: [
        { src: MontserratRegular },
        { src: MontserratBold, fontWeight: "bold" },
        { src: MontserratSemiBold, fontWeight: "semibold" },
    ],
});

// Malditos estilos raros de PDF
const styles = StyleSheet.create({
    page: {
        fontFamily: "Montserrat",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
    },
    section: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "auto",
    },
    eventName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 5,
        paddingHorizontal: 50,
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
        borderWidth: 4,
        borderColor: "#DB2777",
        borderStyle: "solid",
        borderRadius: 5,
    },
    image: {
        height: 250,
        width: 250,
    },
    ticketName: {
        fontSize: 18,
        fontWeight: "semibold",
        marginBottom: 10,
    },
    ticketInfo: {
        fontSize: 15,
    },
});

const TicketPdf = ({ ticket }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.eventName}>{ticket.Event.name}</Text>
                <Text style={styles.user}>{ticket.email}</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} src={ticket.qrImage} />
                </View>
                <Text style={styles.ticketName}>{ticket.Ticket.name}</Text>
                <Text style={styles.ticketInfo}>{ticket.id}</Text>
            </View>
        </Page>
    </Document>
);

export default TicketPdf;
