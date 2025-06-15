import React, { useState, useEffect } from 'react';
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
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PURPLE = '#3D0066';
const LIGHT_GRAY = '#F2F2F7';
const INPUT_HEIGHT = 48;

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [organizations, setOrganization] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2:5029/api/roles')
      .then(res => res.json())
      .then(data => {
        setRoles(data);
        setSelectedRole(data[0]?.roleID ?? null);
      })
      .catch(error => {
        console.error('Błąd pobierania ról:', error);
        Alert.alert('Błąd', 'Nie udało się pobrać listy ról.');
      });
  }, []);

  useEffect(() => {
    fetch('http://10.0.2.2:5029/api/Organizations')
      .then(res => res.json())
      .then(data => {
        setOrganization(data);
        setSelectedOrganization(data[0]?.organizationID ?? null);
      })
      .catch(error => {
        console.error('Błąd pobierania organizacji:', error);
        Alert.alert('Błąd', 'Nie udało się pobrać listy organizacji.');
      });
  }, []);

  const checkEmailExists = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) return;
    try {
      const resp = await fetch(`http://10.0.2.2:5029/api/Auth/check-email?email=${encodeURIComponent(email)}`);
      if (resp.ok) {
        const { exists } = await resp.json();
        setEmailError(exists ? 'E-mail już jest zajęty.' : '');
      }
    } catch (e) {
      console.warn('Błąd weryfikacji e-maila', e);
    }
  };

  const validate = () => {
    if (!firstName.trim() || !lastName.trim() || !userName.trim()) {
      Alert.alert('Błąd', 'Podaj imię, nazwisko i nazwę użytkownika.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Błąd', 'Nieprawidłowy adres e-mail.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Błąd', 'Hasło musi mieć co najmniej 6 znaków.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła nie są zgodne.');
      return false;
    }
    if (!selectedRole || !selectedOrganization) {
      Alert.alert('Błąd', 'Wybierz rolę i organizację.');
      return false;
    }
    if (emailError) {
      Alert.alert('Błąd', 'Popraw błędy przed kontynuowaniem.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const userData = {
        firstName,
        lastName,
        userName,
        email,
        passwordHash: password,
        roleID: selectedRole,
        organizationID: selectedOrganization
      };

      const resp = await fetch('http://10.0.2.2:5029/api/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const text = await resp.text();
      if (!resp.ok) {
        Alert.alert('Błąd rejestracji', text || 'Nie udało się utworzyć konta.');
        return;
      }

      await fetch('http://10.0.2.2:5029/api/Auth/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      navigation.navigate('RegistrationCodeScreen', { email });
    } catch (err) {
      console.error('Błąd rejestracji:', err);
      Alert.alert('Błąd sieci', err.message || 'Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flexOne} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>KeyOrder</Text>
              <Ionicons name="pencil-outline" size={32} color={PURPLE} />
            </View>

            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.formContainer}>
              <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#999" value={firstName} onChangeText={setFirstName} />
              <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#999" value={lastName} onChangeText={setLastName} />
              <TextInput style={styles.input} placeholder="User Name" placeholderTextColor="#999" value={userName} onChangeText={setUserName} />
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="E-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                onBlur={checkEmailExists}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
              <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#999" secureTextEntry value={confirmPassword} onChangeText={setConfirm} />

              <Text style={styles.label}>Select Role:</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedRole} onValueChange={val => setSelectedRole(val)} style={styles.picker}>
                  {roles.map(role => (
                    <Picker.Item key={role.roleID} label={role.roleName} value={role.roleID} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Select Organization:</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedOrganization} onValueChange={val => setSelectedOrganization(val)} style={styles.picker}>
                  {organizations.map(org => (
                    <Picker.Item key={org.organizationID} label={org.name} value={org.organizationID} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, (emailError || loading) ? { opacity: 0.5 } : null]}
              disabled={!!emailError || loading}
              onPress={handleSignUp}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  flexOne: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40, alignItems: 'center' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  appName: { fontSize: 32, fontWeight: '700', color: PURPLE, marginRight: 6 },
  title: { fontSize: 24, fontWeight: '700', color: PURPLE, marginBottom: 32 },
  formContainer: { width: '100%', marginBottom: 24 },
  input: { height: INPUT_HEIGHT, backgroundColor: LIGHT_GRAY, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600' },
  pickerContainer: { backgroundColor: LIGHT_GRAY, borderRadius: 8, marginBottom: 12 },
  picker: { height: INPUT_HEIGHT },
  primaryButton: { width: '100%', height: INPUT_HEIGHT, backgroundColor: PURPLE, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  inputError: { borderColor: 'crimson', borderWidth: 1 },
  errorText: { color: 'crimson', marginTop: 4, marginBottom: 8 },
});
