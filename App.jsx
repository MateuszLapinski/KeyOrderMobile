import React, { createContext, useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  useColorScheme,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './src/navigation/AppNavigator';

export const AuthContext = createContext({
  auth: { user: null, token: null },
  setAuth: () => {},
});

export default function App() {
  const [auth, setAuth] = useState({ user: null, token: null });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const resp = await fetch('http://10.0.2.2:5029/api/Auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (resp.ok) {
            const user = await resp.json();
            setAuth({ user, token });
            console.log('🏷️ auth:', user);
        
          
          } else {
            await AsyncStorage.removeItem('authToken');
            setAuth({ user: null, token: null });
          }
        }
      } catch (e) {
        Alert.alert('Błąd', 'Nie udało się przywrócić sesji.');
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.container}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
