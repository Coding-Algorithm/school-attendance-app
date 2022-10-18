import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBarHeight } from "../components/shared";
import { GetContext } from "../context/context";

const ProfilePage = () => {
  const { logout, auth } = GetContext();

  const {user} = auth

  const {userID, name, faculty, dept, userType} = user

  return (
    <SafeAreaView style={[{ ...styles.profilePageContainer }]}>
      <View
        style={{
          paddingTop: StatusBarHeight,
          backgroundColor: "green",
          borderBottomWidth: 2,
          borderBottomColor: "#f2f2f2",
        }}
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
          Profile Page
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 180,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons style={styles.icon} name="person-circle" size={150} />
      </View>

      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>Name: </Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>User ID:</Text>
          <Text style={styles.value}>{userID}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>User Type:</Text>
          <Text style={styles.value}>{userType}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>Department:</Text>
          <Text style={styles.value}>{dept}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>Faculty:</Text>
          <Text style={styles.value}>{faculty}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>Attendance:</Text>
          <Text style={styles.value}>90/100</Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 10,
            width: 100,
            alignItems: "center",
            borderRadius: 5,
            elevation: 10,
            color: "white",
          }}
          onPress={() => logout()}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  profilePageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    color: '#9f9f9f'
  },
  info: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
  infoWrapper: {
    flexDirection: "row",
  },
});
