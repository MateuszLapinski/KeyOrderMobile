import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from '../screens/StartScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrderScreen'
import ProductScreen from '../screens/ProductsScreen';
import MenuScreen from '../screens/MenuScreen';
import RegistrationCodeScreen from '../screens/RegistrationCodeScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
  
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="RegistrationCodeScreen" component={RegistrationCodeScreen} />
      </Stack.Navigator>



  );
}