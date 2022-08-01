import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Calender from "../components/Calender";
import HomeResult from "../components/HomeResult/HomeResult";
import HomeSearch from "../components/HomeSearch";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.homePageContainer}>
      <View>
        <StatusBar theme="light" />
        <Calender />
        <HomeSearch />
        <HomeResult  />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
