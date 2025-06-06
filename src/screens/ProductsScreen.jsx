import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Footer from '../components/Footer';

export default function ProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://10.0.2.2:5029/api/products';

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => {
        setProducts(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Błąd ładowania produktów:', error);
        setLoading(false);
      });
  }, []);

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
    const quantity = cart[item.id] || 0;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, -1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleCheckout = () => {
    navigation.navigate('CartSummary', { cart });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityButton: {
    backgroundColor: '#441233',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 8,
  },
  quantityText: {
    color: 'white',
    fontSize: 18,
  },
  quantityValue: {
    fontSize: 18,
  },
  cartBar: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    color: 'white',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  checkoutText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
});
