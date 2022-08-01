import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { GetContext } from "../context/context";

const Calender = () => {
  const { date, setDate } = GetContext();

  // const [date, setDate] = useState(new Date());

  function onDateChange(dateSelected) {
    const dateConverted = new Date(dateSelected);

    setDate((prevDate) => (prevDate = dateConverted));
  }

  return (
    <SafeAreaView>
      <View style={styles.calenderContainer}>
        <CalendarPicker
          // selectedDayStyle={styles.selectedDay}
          todayBackgroundColor={{ backgroundColor: "white" }}
          todayTextStyle={{ color: "white", backgroundColor: "transparent" }}
          selectedDayColor="orange"
          selectedDayTextStyle={{ color: "green", fontWeight: "bold" }}
          textStyle={{ color: "white" }}
          onDateChange={(dateSelected) => {
            onDateChange(dateSelected);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: "#1fad24",
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    color: "green",
    fontWeight: "700",
    fontSize: 5,
    backgroundColor: "white",
  },
  selectedDayText: {
    color: "green",
  },
});

export default Calender;
