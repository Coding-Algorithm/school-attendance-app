import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React from "react";
import { StatusBarHeight } from "./shared";
import { GetContext } from "../context/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import attendanceData from "../dummyData/attendance";
import ModalDropdown from "react-native-modal-dropdown";

const AttendanceModal = ({ navigation }) => {
  const { startDate, endDate } = GetContext();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

      <View style={styles.selectStudent}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
          Select Student
        </Text>
        <ModalDropdown
          style={styles.studentSelection}
          options={students}
          textStyle={{ fontSize: 15, marginRight: 15 }}
          defaultValue="Select Student"
          dropdownStyle={styles.StudentDropdown}
          renderRightComponent={() => (
            <Ionicons
              name="chevron-down-outline"
              size={20}
              style={styles.ionicon}
            />
          )}
          dropdownTextStyle={{ fontSize: 15, paddingHorizontal: 35 }}
          onSelect={(value, index) => setChosenStudent(index)}
        />
      </View>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AttendanceModal;

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
