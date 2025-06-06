import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [userName, setUserName] = useState('');
   const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);


  useEffect(() => {
  axios.get('http://10.0.2.2:5029/api/roles')
    .then(response => {
      setRoles(response.data);
     setSelectedRole(response.data[0]?.roleID);
    })
    .catch(error => {
      console.error('Błąd pobierania ról:', error);
    });
}, []);


  const handleSignUp = () => {
  if (!email || !password || password !== confirmPassword) {
    alert('Wprowadź poprawne dane!');
    return;
  }

  const userData = {
    firstName,
    lastName,
    userName,
    email,
    passwordHash: password,
    roleID: selectedRole
  };

  axios.post('http://10.0.2.2:5029/api/Users', userData)
    .then(response => {
      alert('Użytkownik utworzony!');
    navigation.navigate('Signin');
    }).catch(error => {
      console.error('Błąd rejestracji:', error.response?.data || error.message || error);
      console.log('Dane wysłane:', userData);
      alert('Rejestracja nie powiodła się.');
    });

    


};

  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Używamy ScrollView + KeyboardAvoidingView, żeby na małych ekranach (i przy wywołaniu klawiatury) wszystko było dostępne */}
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Nagłówek: "Kalamus" + ikona pióra */}
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>KeyOrder</Text>
              <Ionicons
                name="pencil-outline"
                size={32}
                color={styles.appName.color}
              />
            </View>

            {/* Tytuł ekranu */}
            <Text style={styles.title}>Sign up</Text>

            {/* Formularz */}
            <View style={styles.formContainer}>
            
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#999999"
                keyboardType="text"
                autoCapitalize="none"
                autoCorrect={false}
                value={firstName}
                onChangeText={setFirstName}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#999999"
                keyboardType="text"
                autoCapitalize="none"
                autoCorrect={false}
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor="#999999"
                keyboardType="text"
                autoCapitalize="none"
                autoCorrect={false}
                value={userName}
                onChangeText={setUserName}
              />
                {/* Pole E-mail */}
              <TextInput
                style={styles.input}
                placeholder="E-mail address"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              {/* Pole Password */}
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

              {/* Pole Confirm Password */}
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999999"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <Text style={{ marginBottom: 6, fontWeight: '600' }}>Wybierz rolę:</Text>
                <View style={{
                  backgroundColor: '#F2F2F7',
                  borderRadius: 8,
                  marginBottom: 12,
                  overflow: 'hidden'
                }}>
                  <Picker
                    selectedValue={selectedRole}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log('Zmieniono rolę:', itemValue);
                      setSelectedRole(itemValue);
                    }}
                    style={{ height: 48 }}
                  >
                    {roles.map(role => (
                      <Picker.Item
                        key={role.roleID}
                        label={role.roleName}
                        value={role.roleID}
                      />
                    ))}
                  </Picker>
                </View>
            </View>

        

            {/* Przycisk Sign up */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignUp}
            >
              <Text style={styles.primaryButtonText}>Sign up</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <Text style={styles.disclaimerText}>
              By registering, you accept our{' '}
              <Text style={styles.linkText}>Terms of Use</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = '#3D0066';
const LIGHT_GRAY_BG = '#F2F2F7'; // Jasny odcień szarości dla tła inputów
const INPUT_HEIGHT = 48;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  // Tytuł ekranu: Sign up
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
    height: INPUT_HEIGHT,
    backgroundColor: LIGHT_GRAY_BG,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },
  // ============================
  // Przycisk Sign up
  // ============================
  primaryButton: {
    width: '100%',
    height: INPUT_HEIGHT,
    backgroundColor: PURPLE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // ============================
  // Disclaimer
  // ============================
  disclaimerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  linkText: {
    color: PURPLE,
    fontWeight: '600',
  },
});
