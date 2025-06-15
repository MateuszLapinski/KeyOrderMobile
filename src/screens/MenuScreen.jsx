import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import { AuthContext } from '../../App';

export default function MenuScreen({ navigation }) {
  const { auth, setAuth } = useContext(AuthContext);
  const user = auth.user;

  const handleSignOut = async () => {
    try {
      await fetch('http://10.0.2.2:5029/api/Auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
      });
    } catch (e) {
      console.warn('Logout failed', e);
    } finally {
      await AsyncStorage.removeItem('authToken');
      setAuth({ user: null, token: null });
      navigation.replace('Signin');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie profilu…</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {user.profileImageURL ? (
            <Image source={{ uri: user.profileImageURL }} style={styles.avatar} />
          ) : null}

          <Text style={styles.name}>{user.fullName ?? user.username}</Text>

          <Text style={styles.followers}>
            Role: {user.roleName} {' '}
            <Ionicons name="people-outline" size={14} color="#fff" />
          </Text>
          <Text style={styles.followers}>
            Organization: {user.organizationName} {' '}
            <Ionicons name="business-outline" size={14} color="#fff" />
          </Text>
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon="person-outline"
            label="Company's Profile"
            onPress={() => navigation.navigate('CompanyProfile')}
          />
          <MenuItem
            icon="chatbubble-outline"
            label="Your Profile"
            onPress={() => navigation.navigate('UserProfile')}
          />
          <MenuItem
            icon="pulse-outline"
            label="Last Order"
            onPress={() => navigation.navigate('LastOrder')}
          />
          <MenuItem
            icon="document-text-outline"
            label="Reports"
            onPress={() => navigation.navigate('Reports')}
          />
          <MenuItem
            icon="stats-chart-outline"
            label="Statistics"
            onPress={() => navigation.navigate('Statistics')}
          />
          <MenuItem
            icon="log-out-outline"
            label="Sign Out"
            onPress={handleSignOut}
          />
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon="help-circle-outline"
            label="Help and Feedback"
            onPress={() => navigation.navigate('Help')}
          />
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

function MenuItem({ icon, label, onPress, active }) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, active && styles.activeItem]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? '#6C40BF' : '#555'}
        style={styles.menuIcon}
      />
      <Text style={[styles.menuLabel, active && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#6C40BF',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: { color: '#fff', fontSize: 20, fontWeight: '600' },
  followers: { color: '#fff', marginTop: 4, fontSize: 13 },
  menuSection: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuIcon: { marginRight: 16 },
  menuLabel: { fontSize: 16, color: '#333' },
  activeItem: { backgroundColor: '#f3ecff' },
  activeLabel: { color: '#6C40BF', fontWeight: '600' },
});
