
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo + nazwa aplikacji */}
        <View style={styles.logoContainer}>
          {/* Jeśli masz własny obrazek loga, możesz użyć <Image> zamiast ikony */}
          <Text style={styles.appName}>KeyOrder</Text>
          <Ionicons name="pencil-outline" size={36} color={styles.appName.color} />
        </View>

        {/* Tekst powitalny */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ready for success?</Text>
          <Text style={styles.subtitle}>
            Manage your orders, clients,
          </Text>
          <Text style={styles.subtitle}>results – all in one place.</Text>
        </View>

        {/* Przyciski */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              navigation.navigate('Signin');
              console.log('Sign In pressed');
            }}
          >
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => {
            navigation.navigate('Signup');
              console.log('Create Account pressed');
            }}
          >
            <Text style={styles.outlineButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#3D0066';
const WHITE = '#FFFFFF';
const DARK_GRAY = '#333'; 

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    // Zgrupowanie nazwy i ikony
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: PURPLE,
    marginRight: 8,
  },
  textContainer: {
    // Tekst wyśrodkowany w pionie
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: DARK_GRAY,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: DARK_GRAY,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '600',
  },
});
