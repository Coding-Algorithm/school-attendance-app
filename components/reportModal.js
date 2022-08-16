import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React from "react";
import { StatusBarHeight } from "./shared";
import { GetContext } from "../context/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import attendanceData from "../dummyData/attendance";

const ReportModal = ({ navigation }) => {
  const { startDate, endDate } = GetContext();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  console.log(attendanceData);
  const attendance = attendanceData.filter(
    (item) => (item.date >= startDate) & (item.date <= endDate)
  );
  
  return (
    <View style={[styles.container]}>
      <View
        style={{
          paddingTop: StatusBarHeight,
          backgroundColor: "green",
          alignItems: "center",
          paddingBottom: StatusBarHeight - 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Report Modal
        </Text>
      </View>

      <View style={styles.topSection}>
        <MaterialCommunityIcons style={styles.icon} name="account" size={25} />
        <MaterialCommunityIcons style={[{...styles.icon}, {marginLeft: 50}]} name="calendar" size={25}/>
        <AntDesign
          style={[styles.icon, { fontWeight: "bold", elevation: 20 }]}
          name="question"
          size={25}
        />
      </View>

      <ScrollView style={{ backgroundColor: "#f2f2f2", paddingVertical: 5 }}>
        {attendance.map((attend, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#ffffff",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginBottom: 10,
            }}
          >
            <Text>{attend.student}</Text>

            <Text>{`${attend.date.getDate()}, ${month[attend.date.getMonth()]}, ${attend.date.getFullYear()}`}</Text>

            {attend.attended ? (
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="green"
              />
            ) : (
              <Ionicons name="close-circle-outline" size={20} color="red" />
            )}
          </View>
        ))}
      </ScrollView>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    elevation: 10,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
  },
  icon: {
    color: "green",
  },
});
