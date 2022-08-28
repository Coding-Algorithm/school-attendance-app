import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBarHeight } from "../components/shared";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";
import { Formik } from "formik";
import { GetContext } from "../context/context";

const Login = ({ navigation }) => {
  const [text, onChangeText] = useState(null);
  const [selected, setSelected] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [userType, setUserType] = useState(["Student", "Lecturer"]);
  const [user, setUser] = useState("");
  const { login } = GetContext();

  {
    /* Aunthentication Function */
  }
  
  const authentication = (values) => {
    const { userType, userId, password } = values;

    const errorArray = [];
    
    if (userType === "") {
      errorArray.push("User Type not choosen");
    }
    if (userId < 2) {
      errorArray.push("Invalid User ID");
    }
    if (password < 8) {
      errorArray.push("Password can not be less than 8");
    }
    if(errorArray.length > 0){
      setErrorMsg(errorArray)
      return
    }

    login(values);

  };

  return (
    <View style={[styles.loginContainer, { paddingTop: StatusBarHeight }]}>
      <Text style={[styles.loginHeader, { color: "black" }]}>Login</Text>

      {/* FORM */}
      <Formik
        initialValues={{ userType: "", userId: "", password: "" }}
        onSubmit={(values) => {
          authentication({ ...values, userType: user });
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
                style={[styles.loginInput]}
                onChangeText={handleChange("userId")}
                value={values.userId}
                placeholder="CSC/2018/1164"
                onFocus={() => {}}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Password: </Text>
              <TextInput
                style={styles.loginInput}
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="*******"
                onFocus={() => {}}
                secureTextEntry={true}
              />
            </View>

                {
                  errorMsg &&
                  errorMsg.map(error => <Text style={styles.errorMsg}>{error}</Text>)
                }

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  elevation: 10,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.loginOptions}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("");
          }}
        >
          <Text style={styles.loginOptionsText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.loginOptionsText}>New, Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loginHeader: {
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
  loginInput: {
    borderWidth: 2,
    borderColor: "grey",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  loginOptions: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  loginOptionsText: {
    fontSize: 12,
  },
  errorMsg: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold'
  }
});
