import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useRef, useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import attendanceData from "../dummyData/attendance";
import { GetContext } from "../context/context";

const HomeSearch = () => {

  const { auth, date, setResult, checkError, setCheckError } = GetContext();
  const { user } = auth;
  const { userType, userId } = user;

  const coursesArray = user.courses.split(',')

  let dateLocal = date
    ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    : "";


  const [chosenStudent, setChosenStudent] = useState(
    userType == "Student" ? userId : ""
  );
  const [chosenCourse, setChosenCourse] = useState("");
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [courses, setCourses] = useState(coursesArray);
  const [students, setStudents] = useState("");


  let checkAttendance = (course, student, date) => {
    let errorMsg = [];

    if (course === "") {
      errorMsg.push("You have to select a course");
    }
    if (student === "") {
      errorMsg.push("You have to select a student");
    }
    if (date === "") {
      errorMsg.push("You have to select a date");
    }

    setCheckError(errorMsg);
    if (checkError.length > 0) {
      return;
    }

    attendanceData.forEach((attendance) => {
      if (
        attendance.course == course &&
        attendance.student == student &&
        attendance.date == date
      ) {
        setResult(attendance.attended);
      }
    });
  };

  return (
    <View style={styles.homeSearchContainer}>
      {/* COURSE DROPDOWN */}
      <View style={styles.courseSelectionWrapper}>
        <Text>Courses: </Text>
        <ModalDropdown
          style={styles.courseSelection}
          options={courses}
          textStyle={{ fontSize: 15, marginRight: 15 }}
          defaultValue="Courses"
          dropdownStyle={styles.courseDropdown}
          renderRightComponent={() => (
            <Ionicons
              name="chevron-down-outline"
              size={20}
              style={styles.ionicon}
            />
          )}
          dropdownTextStyle={{
            position: "relative",
            fontSize: 15,
            paddingHorizontal: 0,
            borderWidth: 0,
            borderBottomColor: "white",
            width: 290,
            textAlign: "center",
          }}
          onSelect={(value, index) => setChosenCourse(index)}
        />
      </View>

      {/* STUDENT DROPDOWN, if user is lecturer */}
      {userType === "Lecturer" && (
        <View style={styles.studentSelectionWrapper}>
          <Text>Students: </Text>
          <ModalDropdown
            style={styles.studentSelection}
            options={students}
            textStyle={{ fontSize: 15, marginRight: 15 }}
            defaultValue="Students"
            dropdownStyle={styles.studentDropdown}
            renderRightComponent={() => (
              <Ionicons
                name="chevron-down-outline"
                size={20}
                style={styles.ionicon}
              />
            )}
            dropdownTextStyle={{
              position: "relative",
              borderBottomColor: "white",
              width: 290,
              textAlign: "center",
              fontSize: 15,
              paddingHorizontal: 0,
              textAlign: "center",
            }}
            onSelect={(value, index) => setChosenStudent(index)}
          />
        </View>
      )}

      {/* CHECK BUTTON */}
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => checkAttendance(chosenCourse, chosenStudent, dateLocal)}
      >
        <Text style={styles.checkText}>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeSearchContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: "column",
  },
  courseSelection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "stretch",
    position: "relative",
    marginBottom: 10,
  },
  courseDropdown: {
    width: "80%",
    position: "absolute",
    marginLeft: -10,
    marginRight: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  studentSelection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "stretch",
    position: "relative",
  },
  studentDropdown: {
    width: "80%",
    position: "absolute",
    left: 220,
    marginLeft: 0,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  ionicon: {
    position: "absolute",
    right: 0,
  },
  checkButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  checkText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default HomeSearch;
