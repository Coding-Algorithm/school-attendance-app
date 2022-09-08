import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBarHeight } from "../components/shared";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";
import { Formik } from "formik";
import { GetContext } from "../context/context";

const Signup = ({ navigation }) => {
  const [text, onChangeText] = useState(null);
  const [selected, setSelected] = useState(null);
  const [userType, setUserType] = useState(["Student", "Lecturer"]);
  const [user, setUser] = useState("");
  const { insert } = GetContext();


  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={[styles.signUpContainer, { paddingTop: StatusBarHeight }]}>
        <Text style={[styles.signUpHeader, { color: "green" }]}>Sign up</Text>
        <Formik
          initialValues={{
            userID: "",
            fullname: "",
            email: "",
            department: "",
            faculty: "",
            password: "",
            fingerprint: "",
            courses: "",
          }}
          onSubmit={(values) => {
            insert({...values, userType: user});
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>User Type: </Text>
                <ModalDropdown
                  style={styles.userType}
                  options={userType}
                  textStyle={{ fontSize: 15, marginRight: 15, color: "white" }}
                  defaultValue="Select User"
                  dropdownStyle={styles.courseDropdown}
                  renderRightComponent={() => (
                    <Ionicons
                      name="chevron-down-outline"
                      size={20}
                      style={{ color: "white" }}
                    />
                  )}
                  dropdownTextStyle={{ fontSize: 15, paddingHorizontal: 35 }}
                  onSelect={(index, value) => {
                    setUser(value);
                  }}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>User ID: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("userID")}
                  value={values.userID}
                  placeholder="CSC/2018/1164"
                  onFocus={() => {}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Full name: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("fullname")}
                  value={values.fullname}
                  placeholder="Taofeek Ibrahim"
                  onFocus={() => {}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Email: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="sample@gmail.com"
                  onFocus={() => {}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Password: </Text>
                <TextInput
                  style={styles.signUpInput}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  placeholder="*******"
                  onFocus={() => {}}
                  secureTextEntry={true}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Fingerprint: </Text>
                <TextInput
                  style={styles.signUpInput}
                  onChangeText={handleChange("fingerprint")}
                  value={values.fingerprint}
                  placeholder="*******"
                  onFocus={() => {}}
                  // secureTextEntry={true}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Courses: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("courses")}
                  value={values.courses}
                  placeholder="CSC203,MTH209..."
                  onFocus={() => {}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Department: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("department")}
                  value={values.department}
                  placeholder="CSC"
                  onFocus={() => {}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Faculty: </Text>
                <TextInput
                  style={[styles.signUpInput]}
                  onChangeText={handleChange("faculty")}
                  value={values.faculty}
                  placeholder="Science"
                  onFocus={() => {}}
                />
              </View>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "white",
                    elevation: 10,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.signUpOptions}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signUpOptionsText}>
              Already have an account ?, Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpHeader: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 25,
  },
  inputWrapper: {
    width: "80%",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  userType: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputText: {
    marginBottom: 5,
    fontWeight: "600",
  },
  signUpInput: {
    borderWidth: 2,
    borderColor: "grey",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  signUpButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  signUpOptions: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
  },
  signUpOptionsText: {
    fontSize: 12,
    marginBottom: 20,
  },
});
