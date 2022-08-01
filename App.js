import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ContextProvider } from "./context/context";
import Navigation from "./components/Navigation/Navigation";


export default function App() {

  return (
    <>
      <ContextProvider>
        <Navigation />
      </ContextProvider>
    </>
  );
}
