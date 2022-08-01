import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function OutCome({ result, checkError }) {
  return result ? (
    <View>
      <Ionicons name="checkmark-circle-outline" size={100} color="green" />
      <Text style={{ fontSize: 30, fontWeight: "700", color: "green" }}>
        Present
      </Text>
    </View>
  ) : result == null ? (
    checkError.length > 0 ?  checkError.map((error, index) => <Text key={index}
      style={{
        color: 'red',
        fontSize: 14,
        fontWeight: "600"
      }}
    >{error}</Text>) :
    <Text> </Text>
  ) : (
    <View>
      <Ionicons name="close-circle-outline" size={100} color="red" />
      <Text style={{ fontSize: 30, fontWeight: "700", color: "red" }}>
        Absent
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultText: {
    fontSize: 30,
    fontWeight: "400",
    color: "white",
  },
});
