import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Footer() {
  const navigation = useNavigation();

  const handleOrdersPress = () => {
    navigation.navigate('Orders');
  };
  const handleProductsPress = () => {
    navigation.navigate('Products');
  };
  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  
  return (

    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.tabButton} >
        <Ionicons name="bar-chart-outline" size={24} color="#fff" />
        <Text style={styles.tabLabel}>Sales</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={handleProductsPress}>
        <Ionicons name="pricetags-outline" size={24} color="#fff" />
        <Text style={styles.tabLabel}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton}>
        <Ionicons name="home-outline" size={28} color="#6200EE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={handleOrdersPress}>
        <Ionicons name="calendar-outline" size={24} color="#fff" />
        <Text style={styles.tabLabel}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={handleMenuPress}>
        <Ionicons name="menu-outline" size={24} color="#fff" />
        <Text style={styles.tabLabel}>Menu</Text>
      </TouchableOpacity>
    </View>
  
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#441233',     
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
  
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
