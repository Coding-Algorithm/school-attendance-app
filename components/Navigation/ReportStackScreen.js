import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportPage from "../../screens/ReportPage";
import ReportModal from "../reportModal";
import AttendanceModal from "../attendanceModal";

const ReportStack = createNativeStackNavigator();

const ReportStackScreen = () => {
  return (
    <ReportStack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
      Options={{ presentation: "modal" }}
    >
      <ReportStack.Screen name="ReportPage" component={ReportPage} />
      <ReportStack.Screen name="ReportModal" component={ReportModal} />
      <ReportStack.Screen name="AttandanceModal" component={AttendanceModal} />
    </ReportStack.Navigator>
  );
};

export default ReportStackScreen;
