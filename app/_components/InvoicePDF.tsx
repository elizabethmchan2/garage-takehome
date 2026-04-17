import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { Listing } from "@/app/_types/listing";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  // header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  logo: {
    width: 100,
    height: 26,
  },
  invoiceLabel: {
    fontSize: 10,
    color: "#737373",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // title section
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#171717",
  },
  subtitle: {
    fontSize: 11,
    color: "#737373",
    marginBottom: 20,
  },
  // image
  image: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 6,
    marginBottom: 24,
  },
  // price section
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    padding: 16,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 11,
    color: "#737373",
  },
  priceValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#f97316",
  },
  // description
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#737373",
    marginBottom: 8,
  },
  description: {
    fontSize: 10,
    color: "#404040",
    lineHeight: 1.6,
  },
  // footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: "#a3a3a3",
  },
});

const InvoicePDF = ({ data }: { data: Listing }) => {
  const formattedPrice = data.sellingPrice
    ? `$${data.sellingPrice.toLocaleString()}`
    : "Contact for price";

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://www.shopgarage.com/logos/garage/garage-logo.svg"
          />
          <Text style={styles.invoiceLabel}>Invoice · {date}</Text>
        </View>

        {/* title */}
        <Text style={styles.title}>{data.listingTitle}</Text>
        <Text style={styles.subtitle}>
          {data.category?.name} · {data.address?.state}
        </Text>

        {/* main image */}
        {data.listingImages?.[0]?.url && (
          <Image style={styles.image} src={data.listingImages[0].url} />
        )}

        {/* price */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Listing Price</Text>
          <Text style={styles.priceValue}>{formattedPrice}</Text>
        </View>

        {/* description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{data.listingDescription}</Text>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>shopgarage.com</Text>
          <Text style={styles.footerText}>Listing ID: {data.secondaryId}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
