// src/screens/ResetPasswordSuccessScreen.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ResetPasswordSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Nagłówek: Kalamus + ikona pióra */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>Kalamus</Text>
          <Ionicons name="pencil-outline" size={32} color={styles.appName.color}/>
        </View>

        {/* Komunikat */}
        <Text style={styles.title}>Password changed</Text>
        <Text style={styles.subtitle}>
          Your password has been successfully changed
        </Text>

        {/* Przycisk Back to Sign in */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('SignIn')}
        >
          <Text style={styles.primaryButtonText}>Back to Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#3D0066';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: PURPLE,
    marginRight: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: PURPLE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
