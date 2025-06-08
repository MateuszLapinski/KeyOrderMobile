import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={[styles.status, product.isActive ? styles.active : styles.inactive]}>
          {product.isActive ? 'Aktywny' : 'Nieaktywny'}
        </Text>
      </View>

      <Text style={styles.price}>Cena: {product.unitPrice.toFixed(2)} zł</Text>
      <Text style={styles.stock}>Magazyn: {product.stockQuantity} szt.</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>–</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  active: {
    backgroundColor: '#E0F8E9',
    color: '#2E7D32',
  },
  inactive: {
    backgroundColor: '#FDECEA',
    color: '#C62828',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  stock: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  qtyBtn: {
    backgroundColor: '#6200EE',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  qtyValue: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
});
