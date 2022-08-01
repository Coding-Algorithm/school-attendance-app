import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import OutCome from "./OutCome";
import { GetContext } from "../../context/context";

export default function HomeResult() {
  const { result, checkError } = GetContext(); 


  return ( 
    <View style={styles.homeResultContainer}>
      <OutCome result={result} checkError={checkError} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeResultContainer: {
    // backgroundColor: "green",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
