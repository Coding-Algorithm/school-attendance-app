import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../../screens/HomePage";
import ProfilePage from "../../screens/ProfilePage";
import { ContextProvider, GetContext } from "../../context/context";
// import ReportModal from "./reportModal";
import ReportStackScreen from "./ReportStackScreen";
import AuthNavigation from "./AuthNavigation";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { auth } = GetContext();
  const { user } = auth;


  return (
    <>
      <NavigationContainer style={styles.container}>
        {user ? (
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Report" component={ReportStackScreen} />
            <Tab.Screen name="Profile" component={ProfilePage} />
          </Tab.Navigator>
        ) : (
          <AuthNavigation />
        )}
      </NavigationContainer>
    </>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    fontFamily: "helvetica",
  },
});
