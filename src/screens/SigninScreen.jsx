
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
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Tu wrzuć logikę logowania (walidacja + API)
    console.log('E-mail:', email);
    console.log('Password:', password);
    navigation.replace('Home');
  };

  const handleForgotPassword = () => {
    // Przykładowo: navigation.navigate('ForgotPassword');
    console.log('Forgot Password pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* =========================
                             Nagłówek: Kalamus + ikona pióra
                              ========================= */}
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>Kalamus</Text>
              <Ionicons
                name="pencil-outline"
                size={32}
                color={styles.appName.color}
              />
            </View>

            {/* =========================
                             Tytuł ekranu: Sign in
                              ========================= */}
            <Text style={styles.title}>Sign in</Text>

            {/* =========================
                             Formularz
                              ========================= */}
            <View style={styles.formContainer}>
              {/* E-mail Address */}
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

              {/* Password */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999999"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* =========================
                             Przycisk Sign in
                              ========================= */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignIn}
            >
              <Text style={styles.primaryButtonText}>Sign in</Text>
            </TouchableOpacity>

            {/* =========================
                             Sekcja "Or log in with:"
                              ========================= */}
            <View style={styles.socialLoginContainer}>
              <Text style={styles.orText}>Or log in with:</Text>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    // np. navigation.navigate('GoogleAuth');
                    console.log('Google login pressed');
                  }}
                >
                  <FontAwesome name="google" size={24} color={styles.purple} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    // np. navigation.navigate('MicrosoftAuth');
                    console.log('Microsoft login pressed');
                  }}
                >
                  <FontAwesome5
                    name="microsoft"
                    size={24}
                    color={styles.purple}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#3D0066';
const WHITE = '#FFFFFF';
const LIGHT_GRAY_BG = '#F2F2F7'; // jasnoszare tło inputów
const DARK_GRAY = '#333333';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  // ============================
  // Nagłówek: Kalamus + ikona
  // ============================
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
  // ============================
  // Tytuł ekranu: Sign in
  // ============================
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 32,
  },
  // ============================
  // Formularz
  // ============================
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: LIGHT_GRAY_BG,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: DARK_GRAY,
    marginBottom: 12,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '500',
  },
  // ============================
  // Przycisk Sign in
  // ============================
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: PURPLE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  // ============================
  // Sekcja "Or log in with:" + ikony
  // ============================
  socialLoginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  orText: {
    fontSize: 14,
    color: DARK_GRAY,
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%', // dwa przyciski w jednej linii, wyśrodkowane
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  // ============================
  // Dodatkowe kolory w stylach
  // ============================
  purple: {
    color: PURPLE,
  },
});

