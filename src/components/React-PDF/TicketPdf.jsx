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
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
});

// Create Document Component
const TicketPdf = ({ ticket }) => (
    <Document>
        <Page size="A4" style={styles.page} wrap>
            <View style={styles.section} wrap>
                <Text>Prueba</Text>
            </View>
            <Image style={styles.image} src={`ok.com`} />
            <View style={styles.section}>
                <Text>Prueba</Text>
            </View>
        </Page>
    </Document>
);

export default TicketPdf;
