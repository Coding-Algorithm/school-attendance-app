import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const ScreenNav = () => {
  return (
      <Tab.Navigator independent={true}>
        <Tab.Screen name="Home" component={HomePage} />
      </Tab.Navigator>
  );
};

export default ScreenNav;

// export default function ScreenNav() {
//   return (
//     <View style={styles.screenNavContainer}>
//       <TouchableOpacity style={styles.navView}>
//         <Ionicons name="home" size={18} />
//         <Text style={styles.navText}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navView}>
//         <Ionicons name="document-text-outline" size={20} />
//         <Text style={styles.navText}>Report</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navView}>
//         <Ionicons name="person-circle-outline" size={20} />
//         <Text style={styles.navText}>Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navView: {
//     position: "relative",
//     bottom: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   screenNavContainer: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     padding: 20,
//     marginTop: 80,
//     shadowOffset: { width: 0, height: 22 },
//     elevation: 10,
//     shadowColor: '#52006A',
//     justifyContent: "space-between",
//   },
//   navText: {
//     fontSize: 13,
//     fontWeight: "700",
//     letterSpacing: 1,
//   },
// });
