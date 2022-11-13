import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useRef, useState, useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { StatusBarHeight } from "../components/shared";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { GetContext } from "../context/context";

// REPORT PAGE STARTS
const ReportPage = ({ navigation }) => {
  const { auth, startDate, setStartDate, endDate, setEndDate } = GetContext();
  const { user } = auth;
  const { userType, userId } = user;

  const [student, setStudent] = useState("sample");
  const [chosenStudent, setChosenStudent] = useState("");
  const [chosenCourse, setChosenCourse] = useState(
    userType == "Student" ? userId : ""
  );
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [students, setStudents] = useState(["CSC/2017/1165", "CSC/2019/1678"]);
  const [courses] = useState(["CSC301", "CSC302", "CSC101"]);

  let startDateLocal = `${startDate.getFullYear()}/${
    startDate.getMonth() + 1
  }/${startDate.getDate()}`;
  let endDateLocal = `${endDate.getFullYear()}/${
    endDate.getMonth() + 1
  }/${endDate.getDate()}`;

  console.log(startDateLocal);

  const showDatepicker = (whichDate) => {
    if (whichDate === "startDate") {
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
      };

      DateTimePickerAndroid.open({
        value: startDate,
        onChange,
        mode: "date",
        is24Hour: true,
      });
    } else if (whichDate === "endDate") {
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDate(currentDate);
      };

      DateTimePickerAndroid.open({
        value: endDate,
        onChange,
        mode: "date",
        is24Hour: true,
      });
    }
  };

  const checkAttendance = () => {
    navigation.navigate("ReportModal");
  };

  const markAttendance = () => {
    navigation.navigate("AttandanceModal");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/student/")
      .then((response) => {
        setStudents(() => response.data.map((res) => res.matricNo));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView style={{ ...styles.reportPageContainer }}>
      <View>
        <View
          style={[
            { ...styles.reportPageHeader },
            { paddingTop: StatusBarHeight },
          ]}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
              padding: 10,
              color: "white",
            }}
          >
            Report Page
          </Text>
        </View>

        <View style={styles.mainContent}>
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
              onSelect={(value, index) => setChosenCourse(index)}
            />
          </View>

          {userType === "Lecturer" && (
            <View style={styles.selectStudent}>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}
              >
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

          <View style={styles.startDate}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              {`${startDateLocal}`}
            </Text>
            <Button
              title="Pick Start Date"
              onPress={() => showDatepicker("startDate")}
            />
          </View>
          <View style={styles.endDate}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              {`${endDateLocal}`}
            </Text>
            <Button
              title="Pick End Date"
              onPress={() => showDatepicker("endDate")}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkAttendance}
          onPress={() => checkAttendance()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Check Attendance
          </Text>
        </TouchableOpacity>
      </View>

      {userType === "Lecturer" && (
        <TouchableOpacity
          style={[
            styles.checkAttendance,
            { backgroundColor: "orange" },
          ]}
          onPress={() => markAttendance()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Mark Attendance
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ReportPage;

const styles = StyleSheet.create({
  reportPageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  reportPageHeader: {
    backgroundColor: "green",
    marginBottom: 20,
    elevation: 5,
  },
  reportPageTextInput: {
    width: 200,
    height: 50,
    backgroundColor: "red",
    padding: 10,
  },
  mainContent: {
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  selectCourse: {
    width: "100%",
  },
  courseSelection: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    // borderWidth: 2,
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "stretch",
    width: "100%",
    backgroundColor: "#9bd5a0",
  },
  selectStudent: {
    width: "100%",
    marginBottom: 10,
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
    width: "100%",
    backgroundColor: "#9bd5a0",
    position: "relative",
  },
  studentDropdown: {
    width: "80%",
    position: "absolute",
    marginLeft: -10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  startDate: {
    marginBottom: 20,
  },
  endDate: {
    marginBottom: 10,
  },
  checkAttendance: {
    width: "40%",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginTop: 30,
    marginHorizontal: "30%",
    fontWeight: "bold",
    alignItems: 'center'
  },
  ionicon: {
    position: "absolute",
    right: 0,
  },
});
