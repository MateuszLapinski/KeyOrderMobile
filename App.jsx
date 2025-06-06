
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  useColorScheme,
} from 'react-native';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/screens/HomeScreen';
import StartScreen from './src/screens/StartScreen';
import LoginFirstScreen from './src/screens/LoginFirstScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ResetPasswordEmailScreen from './src/screens/ResetPasswordEmailScreen';
import ResetPasswordCodeScreen from './src/screens/ResetPasswordCodeScreen';
import ResetPasswordSuccessScreen from './src/screens/ResetPasswordSuccessScreen';
import ProductScreen from './src/screens/ProductsScreen';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
     
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* HomeScreen wypełnia cały ekran */}
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
