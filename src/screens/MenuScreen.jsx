import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';

export default function MenuScreen() {
  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.name}>Hurtownia 1</Text>
        <Text style={styles.followers}>Adam Adamiak- Zakupy <Ionicons name="people-outline" size={14} /></Text>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="person-outline" label="Company's Profile" />
        <MenuItem icon="chatbubble-outline" label="Your Profile" />
        <MenuItem icon="pulse-outline" label="Last Order" />
        <MenuItem icon="document-text-outline" label="Reports" />
        <MenuItem icon="stats-chart-outline" label="Statistic" />
        <MenuItem icon="log-out-outline" label="Sign Out" />
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="help-circle-outline" label="Help and Feedback" />
      </View>
    </ScrollView>
    <Footer/>
    </>
  );
}

function MenuItem({ icon, label, active }) {
  return (
    <TouchableOpacity style={[styles.menuItem, active && styles.activeItem]}>
      <Ionicons name={icon} size={20} color={active ? '#6C40BF' : '#555'} style={styles.menuIcon} />
      <Text style={[styles.menuLabel, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  followers: {
    color: '#fff',
    marginTop: 4,
    fontSize: 13,
  },
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
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
  },
  activeItem: {
    backgroundColor: '#f3ecff',
  },
  activeLabel: {
    color: '#6C40BF',
    fontWeight: '600',
  },
});
