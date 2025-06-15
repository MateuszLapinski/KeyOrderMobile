
import React, { useState, useContext } from 'react';
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
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';

export default function SigninScreen({ navigation }) {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading]       = useState(false);

  const validate = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('E-mail jest wymagany');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Nieprawidłowy format e-mail');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Hasło jest wymagane');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Hasło musi mieć co najmniej 6 znaków');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSignIn = async () => {
    // najpierw walidacja pól
    if (!validate()) return;
  
    setLoading(true);
    try {
      const resp = await fetch('http://10.0.2.2:5029/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: email,
          password: password
        })
      });
  
      const data = await resp.json();
  
      if (resp.ok) {
        await AsyncStorage.setItem('authToken', data.token);
  
        const meResp = await fetch('http://10.0.2.2:5029/api/Auth/me', {
          headers: { Authorization: `Bearer ${data.token}` }
        });
        if (!meResp.ok) {
          throw new Error('Nie udało się pobrać profilu');
        }
        const userProfile = await meResp.json();
  
        setAuth({ user: userProfile, token: data.token });
  
        navigation.replace('Home');
      } else if (resp.status === 401) {
        Alert.alert('Błąd logowania', data.message || 'Nieprawidłowy login lub hasło');
      } else {
        Alert.alert('Błąd serwera', `Kod: ${resp.status}`);
      }
    } catch (err) {
      Alert.alert('Błąd sieci', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
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
              <Text style={styles.appName}>KeyOrder</Text>
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

{passwordError ? <Text style={{ color:'red' }}>{passwordError}</Text> : null}

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
              <View>
              <TouchableOpacity
                onPress={() => {navigation.navigate('Signup')}}
                style={styles.forgotPasswordText}
              >
                <Text style={styles.forgotPasswordText}>Don't have account?</Text>
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
const LIGHT_GRAY_BG = '#F2F2F7'; 
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

