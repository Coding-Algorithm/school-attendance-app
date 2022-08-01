import { View, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import Signup from '../../screens/Signup';
import Login from '../../screens/Login';

const AuthNavStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthNavStack.Navigator screenOptions={{headerShown: false}}>
    <AuthNavStack.Screen name='Login' component={Login} />
    <AuthNavStack.Screen name='Signup' component={Signup} />
    </AuthNavStack.Navigator>
  )
}

export default AuthNavigation