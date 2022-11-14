import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBarHeight } from "./shared";
import { GetContext } from "../context/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import attendanceData from "../dummyData/attendance";
import ModalDropdown from "react-native-modal-dropdown";

const AttendanceModal = ({ navigation }) => {
  const { startDate, endDate, auth, studentsForCourse, getStudentsForCourse, students, markAttendance } =
    GetContext();
  const { user } = auth;

  const lecturerCourses = user.courses.split(",");

  const months = [
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

  console.log(studentsForCourse, "for course");

  // const [students, setStudents] = useState(studentsForCourse);
  const [chosenStudent, setChosenStudent] = useState("");
  const [chosenCourse, setChosenCourse] = useState("");
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [courses] = useState(lecturerCourses);

  const isCourseChosen = chosenCourse.length ? true : false;

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
          Take Attendance
        </Text>
      </View>

      <View style={styles.selectCourse}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
          Select Course
        </Text>
        <ModalDropdown
          style={styles.courseSelection}
          options={courses}
          textStyle={{ fontSize: 15, marginRight: 15 }}
          defaultValue="Select course"
          dropdownStyle={styles.courseDropdown}
          renderRightComponent={() => (
            <Ionicons
              name="chevron-down-outline"
              size={20}
              style={styles.ionicon}
            />
          )}
          dropdownTextStyle={{ fontSize: 15, paddingHorizontal: 35 }}
          onSelect={(index, value) => {
            setChosenCourse(value);
            getStudentsForCourse({
              value: "userID",
              table: "student",
              course: value,
            });
          }}
        />
      </View>

      {isCourseChosen && (
        <View style={styles.selectStudent}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 15 }}>
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
      )}

      <View style={{ marginBottom: 20, width: "100%", alignItems: "center" }}>
        <Button
          title="Mark Present"
          onPress={() => {
            if (!chosenStudent) {
              return;
            }

            const date = new Date();
            date.setHours(0, 0, 0, 0);

            markAttendance({chosenCourse, chosenStudent, date});
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%", alignItems: "center" }}>
        <Button
          title="Back"
          color="green"
          onPress={() => navigation.goBack()}
        />
      </View>
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
  selectStudent: {
    width: "100%",
    marginBottom: 10,
    margin: 10,
  },
  studentSelection: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    // borderWidth: 2,
    marginBottom: 15,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "stretch",
    width: "90%",
    backgroundColor: "#9bd5a0",
    position: "relative",
  },

  selectCourse: {
    width: "100%",
    margin: 10,
  },
  courseSelection: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    // borderWidth: 2,
    marginBottom: 5,
    marginRight: 15,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "stretch",
    width: "90%",
    backgroundColor: "#9bd5a0",
  },
});
