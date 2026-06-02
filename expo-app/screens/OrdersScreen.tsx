import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, TouchableOpacity, RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const API = 'http://192.168.137.51:3001';

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  tipologia?: string;
};

type Order = {
  _id: string;
  total: number;
  createdAt: string;
  cart: CartItem[];
};

const formatTipo = (t?: string) => {
  if (!t) return null;
  if (t === 'grano') return '🌰 Grano';
  if (t === 'molido') return '⚡ Molido';
  if (t === 'liofilizado') return '❄️ Liofilizado';
  return `📌 ${t}`;
};

export default function OrdersScreen() {
  const navigation = useNavigation<any>();
  const { user } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${API}/orders/${user.email}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data.reverse() : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadOrders();
    }, [user?.email])
  );

  if (!user?.email) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>Inicia sesión primero</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Ir a Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#921919" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>Sin pedidos aún</Text>
        <Text style={styles.emptySubtitle}>Tus pedidos aparecerán aquí.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnText}>Ver productos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={o => o._id}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadOrders(); }} />
      }
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderNum}>Pedido #{orders.length - index}</Text>
            <Text style={styles.orderDate}>
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString('es-CO') : 'Sin fecha'}
            </Text>
          </View>

          {item.cart.map(ci => (
            <View
              key={`${ci._id}-${ci.tipologia || ''}`}
              style={styles.itemRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{ci.name}</Text>
                {ci.tipologia && (
                  <Text style={styles.itemTipo}>{formatTipo(ci.tipologia)}</Text>
                )}
              </View>
              <Text style={styles.itemQty}>x{ci.quantity}</Text>
              <Text style={styles.itemTotal}>
                ${(ci.price * ci.quantity).toLocaleString()}
              </Text>
            </View>
          ))}

          <View style={styles.cardFooter}>
            <Text style={styles.totalLabel}>💰 Total</Text>
            <Text style={styles.totalValue}>${item.total.toLocaleString()}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#fff' },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: '#888', marginBottom: 24, textAlign: 'center' },
  btn: { backgroundColor: '#921919', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, marginBottom: 16,
    padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  orderNum: { fontSize: 16, fontWeight: '700', color: '#2c2c2c' },
  orderDate: { fontSize: 13, color: '#888' },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  itemName: { fontSize: 14, fontWeight: '600', color: '#333' },
  itemTipo: { fontSize: 11, color: '#888', marginTop: 2 },
  itemQty: { fontSize: 14, color: '#666', marginHorizontal: 12 },
  itemTotal: { fontSize: 14, fontWeight: '700', color: '#2c2c2c' },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 12, paddingTop: 10,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#555' },
  totalValue: { fontSize: 20, fontWeight: '800', color: '#921919' },
});
