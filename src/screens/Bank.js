import React from "react";
import { View, Image, StyleSheet } from "react-native";

const BankScreen = () => {
  return (
    <View style={styles.bankScreen}>
      <Image
        style={styles.vector}
        source={require("./bank.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bankScreen: {
    borderWidth: 1,
    borderColor: "transparent",
    height: 139,
    position: "relative",
    width: 139,
  },
  vector: {
    height: 122,
    left: 12,
    position: "absolute",
    top: 6,
    width: 110,
  },
});

export default BankScreen;
