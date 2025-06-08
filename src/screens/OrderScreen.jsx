import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Footer from '../components/Footer';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5029/api/orders');
        console.log('Pobrane zamówienia:', response.data); 
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error('Błąd pobierania zamówień:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zamówienia</Text>
        <Ionicons name="person-circle" size={30} color="#444" />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Szukaj zamówienia..."
          placeholderTextColor="#999"
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
 
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.company}>{order.client?.name ?? 'Nieznany klient'}</Text>
                <Text style={styles.meta}>Adres: {order.shippingAddress}</Text>
                <Text style={styles.meta}>Płatność: {order.paymentMethod}</Text>
                <Text style={styles.meta}>Status: {order.status}</Text>
                <Text style={styles.meta}>Wartość: {order.value?.toFixed(2)} zł</Text>
                <Text style={styles.meta}>Data: {new Date(order.placedAt).toLocaleDateString()}</Text>
              </View>
              <View style={styles.statusRow}>
                <TouchableOpacity>
                  <Ionicons name="chevron-forward" size={22} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            Brak wyników dla: {searchQuery}
          </Text>
        )}
      </ScrollView>
    </View>
    <Footer/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 50,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
