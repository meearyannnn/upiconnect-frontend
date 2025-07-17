// File: app/qr-generator/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Linking,
  Animated,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Speech from "expo-speech";
import { Link } from "expo-router";
import { Gift, CreditCard, Send, TrendingUp, ArrowLeft } from "lucide-react-native";

export default function QRGeneratorScreen() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [qrData, setQrData] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const generateQR = () => {
    if (!upiId || !amount) return;
    const upiUrl = `upi://pay?pa=${upiId}&pn=UPIConnect&am=${amount}&cu=INR`;
    setQrData(upiUrl);

    const points = Math.floor(Number(amount) / 100);
    setLoyaltyPoints((prev) => prev + points);
    Speech.speak(`QR generated for rupees ${amount}`);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Alert.alert("QR Generated", `Earned ${points} loyalty point(s)`);
  };

  const sendSMSPayment = () => {
    if (!upiId || !amount) return;
    const message = `PAY UPI ${upiId} INR ${amount}`;
    const phoneNumber = "*99#";
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Generator</Text>

      <TextInput
        placeholder="Enter UPI ID"
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
      />

      <TextInput
        placeholder="Enter Amount"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Pressable style={styles.primaryButton} onPress={generateQR}>
        <CreditCard color="white" size={20} />
        <Text style={styles.primaryButtonText}>Generate QR</Text>
      </Pressable>

      {qrData !== "" && (
        <Animated.View style={{ ...styles.qrBox, opacity: fadeAnim }}>
          <QRCode value={qrData} size={200} />
          <Text style={styles.qrText}>{qrData}</Text>
        </Animated.View>
      )}

      <Pressable style={styles.secondaryButton} onPress={sendSMSPayment}>
        <Send color="white" size={20} />
        <Text style={styles.secondaryButtonText}>Offline Pay via SMS</Text>
      </Pressable>

      <View style={styles.statusBox}>
        <View style={styles.statusRow}>
          <Gift color="green" size={18} />
          <Text style={styles.loyalty}>Loyalty Points: {loyaltyPoints}</Text>
        </View>
        <View style={styles.statusRow}>
          <TrendingUp color="#1e88e5" size={18} />
          <Text style={styles.creditScore}>Credit Score: {600 + loyaltyPoints}</Text>
        </View>
      </View>

      <Link href="/dashboard" asChild>
        <Pressable style={styles.dashboardLink}>
          <Text style={styles.linkText}>Go to Smart Dashboard</Text>
        </Pressable>
      </Link>

      <Link href="/" asChild>
        <Pressable style={styles.homeLink}>
          <ArrowLeft color="white" size={18} />
          <Text style={styles.homeLinkText}>Back to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#03a9f4",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
  },
  qrBox: {
    alignItems: "center",
    marginTop: 20,
  },
  qrText: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
  statusBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  loyalty: {
    marginLeft: 10,
    fontSize: 16,
    color: "green",
  },
  creditScore: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1e88e5",
  },
  dashboardLink: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#673ab7",
    borderRadius: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeLink: {
    marginTop: 12,
    flexDirection: "row",
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  homeLinkText: {
    color: "white",
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});
