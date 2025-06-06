// src/screens/ResetPasswordEmailScreen.jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ResetPasswordEmailScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // 1) Wywołaj endpoint API, np. /auth/send-reset-code z { email }
    // 2) Jeśli odpowiedź sukces (200), nawiguj do kolejnego ekranu:
    navigation.replace('ResetPasswordCode', { email }); 
    // przekazujemy e-mail do kolejnego etapu, żeby wiedzieć, dla kogo weryfikować kod
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Nagłówek: Kalamus + ikona */}
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Kalamus</Text>
            <Ionicons name="pencil-outline" size={32} color={styles.appName.color}/>
          </View>

          {/* Tytuł */}
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Enter the e-mail address used during registration
          </Text>

          {/* Pole E-mail */}
          <TextInput
            style={styles.input}
            placeholder="E-mail Address"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          {/* Przycisk Send Code */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSendCode}
            disabled={!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)} // prosty warunek: valid email
          >
            <Text style={styles.primaryButtonText}>Send Code</Text>
          </TouchableOpacity>

          {/* Link do logowania */}
          <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.linkText}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#3D0066';
const WHITE = '#FFFFFF';
const LIGHT_GRAY_BG = '#F2F2F7';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  flexOne: {
    flex: 1,
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
  input: {
    width: '100%',
    height: 48,
    backgroundColor: LIGHT_GRAY_BG,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    marginBottom: 24,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: PURPLE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#333333',
  },
  linkText: {
    color: PURPLE,
    fontWeight: '600',
  },
});
