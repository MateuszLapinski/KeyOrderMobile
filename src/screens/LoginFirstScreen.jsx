import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function LoginFirstScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>Kalamus</Text>
          <Ionicons
            name="pencil-outline"
            size={32}
            color={styles.appName.color}
          />
        </View>

       
        <View style={styles.mainContent}>
          <Text style={styles.title}>Ready for{"\n"}success?</Text>
        </View>

    
        <View style={styles.buttonsWrapper}>
          {/* 1) Continue with Google */}
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => {
            
              console.log("Continue with Google pressed");
            }}
          >
            <FontAwesome name="google" size={20} color={styles.purple} />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* 2) Continue with Microsoft */}
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => {
              // np. navigation.navigate('MicrosoftAuth');
              console.log("Continue with Microsoft pressed");
            }}
          >
            <FontAwesome5 name="microsoft" size={20} color={styles.purple} />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>
              Continue with Microsoft
            </Text>
          </TouchableOpacity>

          {/* 3) Continue with E-mail */}
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => {
              // np. navigation.navigate('EmailAuth');
              console.log("Continue with E-mail pressed");
            }}
          >
            <Ionicons name="mail-outline" size={20} color={styles.purple} />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>
              Continue with E-mail
            </Text>
          </TouchableOpacity>
        </View>

        {/* =========================
             Dolny tekst: "Already have an account? Log In"
             ========================= */}
        <View style={styles.footerTextContainer}>
          <Text style={styles.regularText}>
            Already have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => {
                // np. navigation.navigate('Login');
                console.log("Log In pressed");
              }}
            >
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Kolory
const PURPLE = "#3D0066";
const WHITE = "#FFFFFF";
const DARK_GRAY = "#333333";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  // =========================
  // Nagłówek: Kalamus + ikona
  // =========================
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: PURPLE,
    marginRight: 6,
  },
  // =========================
  // Główny blok z tytułem
  // =========================
  mainContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: DARK_GRAY,
    textAlign: "center",
    lineHeight: 36,
  },
  // =========================
  // Przyciski
  // =========================
  buttonsWrapper: {
    width: "100%",
  },
  buttonOutline: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: PURPLE,
  },
  // =========================
  // Dolny tekst
  // =========================
  footerTextContainer: {
    marginBottom: 32,
  },
  regularText: {
    fontSize: 14,
    color: DARK_GRAY,
    textAlign: "center",
  },
  linkText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: "600",
  },
});

