// File: app/show-qr.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ShowQRScreen() {
  const upiLink = "upi://pay?pa=merchant@upi&pn=UPIConnect+Merchant&am=100&cu=INR";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan to Pay</Text>
      <QRCode value={upiLink} size={200} />
      <Text style={styles.note}>UPI ID: merchant@upi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  note: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
