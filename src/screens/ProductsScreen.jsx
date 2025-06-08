import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import Footer from '../components/Footer';

export default function ProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_BASE = 'http://10.0.2.2:5029/api';
  const PRODUCTS_API = `${API_BASE}/products`;
  // **Nowy endpoint zwraca full Product[]**
  const FAVORITE_API = `${API_BASE}/products/favorites/1`;
  const clientId = 1;

  // ładowanie wszystkich produktów
  useEffect(() => {
    fetch(PRODUCTS_API)
      .then(response => response.json())
      .then(json => {
        setProducts(json);
        setFilteredProducts(json);
      })
      .catch(error => console.error('Błąd ładowania produktów:', error))
      .finally(() => setLoading(false));
  }, []);

  // filtrowanie po nazwie
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q === '') {
      // jak query puste — pokaż wszystko
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(p => p.name?.toLowerCase().includes(q))
      );
    }
  }, [searchQuery, products]);

  // **fetch ulubionych – tutaj backend zwraca od razu tablicę Product**
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await fetch(FAVORITE_API);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const favProducts = await res.json();
      // od razu podstawiamy jako filteredProducts
      setFilteredProducts(favProducts);
    } catch (error) {
      console.error('Błąd pobierania ulubionych produktów:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać ulubionych.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const newQty = Math.max((prev[productId] || 0) + delta, 0);
      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const renderItem = ({ item }) => {
    const qty = cart[item.id] || 0;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{qty}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleCheckout = async () => {
    try {
      // Tworzenie zamówienia
      const newOrder = {
        clientId: 1,
        placedAt: new Date().toISOString(),
        status: 'Oczekuje',
        value: 0, 
        shippingAddress: 'ul. Testowa 123, Warszawa',
        paymentMethod: 'Przelew 14 dni',
        notes: 'Zamówienie z aplikacji mobilnej'
      };
  
      const orderResponse = await fetch('http://10.0.2.2:5029/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
  
      const createdOrder = await orderResponse.json();
      const orderId = createdOrder.id;
  
      // Tworzenie OrderItemów
      const orderItems = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return {
          orderId: orderId,
          productId: product.id,
          quantity: quantity,
          price: product.unitPrice,
        };
      });
  
      // Wysłanie każdego OrderItem
      for (let item of orderItems) {
        await fetch('http://10.0.2.2:5029/api/orderitems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
      }
  
      alert('Zamówienie zostało złożone!');
      setCart({});
    } catch (error) {
      console.error('Błąd składania zamówienia:', error);
      alert('Nie udało się złożyć zamówienia.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Szukaj produktu..."
        placeholderTextColor="#999"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filtry */}
      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilteredProducts(products)}>
          <Text style={styles.filterText}>Wszystkie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={fetchFavorites}>
          <Text style={styles.filterText}>Ulubione</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Pasek koszyka */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <Text style={styles.cartText}>
            {totalItems} {totalItems === 1 ? 'produkt' : 'produktów'} w koszyku
          </Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Do kasy</Text>
          </TouchableOpacity>
        </View>
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingTop: 50, paddingHorizontal: 20 },
  center: { justifyContent: 'center', alignItems: 'center' },
  searchInput: { backgroundColor: '#fff', borderRadius: 6, padding: 8, height: 40, marginBottom: 12 },
  filterButtons: { flexDirection: 'row', marginBottom: 12 },
  filterButton: { flex: 1, backgroundColor: '#6200EE', padding: 10, borderRadius: 6, marginHorizontal: 4 },
  filterText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  listContainer: { paddingBottom: 20 },
  itemContainer: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12 },
  productName: { fontSize: 18, fontWeight: '600' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: { backgroundColor: '#6200EE', borderRadius: 4, padding: 8, marginHorizontal: 12 },
  quantityText: { color: '#fff', fontSize: 18 },
  quantityValue: { fontSize: 18 },
  cartBar: { backgroundColor: '#6200EE', padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cartText: { color: '#fff', fontSize: 16 },
  checkoutButton: { backgroundColor: '#fff', padding: 8, borderRadius: 6 },
  checkoutText: { color: '#6200EE', fontWeight: 'bold' },
});
