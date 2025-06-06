import React, { useState, useEffect, useRef } from 'react';
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

export default function ResetPasswordCodeScreen({ navigation, route }) {
  const { email = 'test@example.com' } = route?.params || {}; 

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChangeText = (text, index) => {
    // … (logika wpisywania kodu)
  };

  const handleConfirm = () => {
    const joinedCode = code.join('');
    // Wywołanie API weryfikujące { email, code: joinedCode }
    // Jeśli sukces, przejdź do ekranu Confirmation:
    navigation.replace('ResetPasswordSuccess'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Nagłówek */}
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Kalamus</Text>
            <Ionicons name="pencil-outline" size={32} color={styles.appName.color} />
          </View>

          {/* Tytuł & opis */}
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to the e-mail address provided during registration
          </Text>

          {/* 6 pól na kod */}
          <View style={styles.codeContainer}>
            {code.map((_, idx) => (
              <TextInput
                key={idx}
                ref={el => (inputsRef.current[idx] = el)}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={(txt) => handleChangeText(txt, idx)}
                returnKeyType="next"
                textAlign="center"
              />
            ))}
          </View>

          {/* Przycisk potwierdzenia */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { opacity: code.some(d => d === '') ? 0.5 : 1 }
            ]}
            disabled={code.some(d => d === '')}
            onPress={handleConfirm}
          >
            <Text style={styles.primaryButtonText}>Confirm</Text>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // szerokość 6 pól razem
    marginBottom: 24,
  },
  codeInput: {
    width: 40,
    height: 48,
    backgroundColor: LIGHT_GRAY_BG,
    borderRadius: 8,
    fontSize: 20,
    color: '#000000',
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
    marginTop: 8,
  },
  linkText: {
    color: PURPLE,
    fontWeight: '600',
  },
});
