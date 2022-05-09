import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>CHAR PAHIYA</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Text
        style={{
          fontSize: 15,
          marginTop: 8,
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 0,
        }}
      >
        Name:{order.user.name}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 3,
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 0,
        }}
      >
        Email:{order.user.email}
      </Text>

      <Table>
        <TableHeader>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Sub Total</TableCell>
        </TableHeader>
      </Table>

      <Table data={order.orderItems}>
        <TableBody>
          <DataTableCell getContent={(x) => x.name} />
          <DataTableCell getContent={(x) => `Rs.${x.price}`} />
          <DataTableCell getContent={(x) => x.qty} />
          <DataTableCell getContent={(x) => `Rs.${x.price * x.qty}`} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text>
          Date: {"                                               "}
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Order Id: {"                                         "}
          {order._id}
        </Text>
        {"\n"}
        <Text>
          Items Price: {"                                    "}
          Rs.{order.itemsPrice}
        </Text>
        {"\n"}
        <Text>
          Shipping: {"                                        "}
          Rs.{order.shippingPrice}
        </Text>
        {"\n"}
        <Text>
          Tax: {"                                                "}
          Rs.{order.taxPrice}
        </Text>
        {"\n"}
        {order.couponApplied ? (
          <Text>
            Total Paid On Discount: {"                  "}Rs.
            {order.paymentIntent && order.paymentIntent.amount / 100}
          </Text>
        ) : (
          <Text>
            Total Paid: {"                                      "}Rs.
            {order.totalPrice}
          </Text>
        )}
      </Text>

      <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 0,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;
