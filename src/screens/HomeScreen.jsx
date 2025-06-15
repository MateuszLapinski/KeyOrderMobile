import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Footer from '../components/Footer';
import StatsGrid from '../components/StatsGrid';
import { AuthContext } from '../../App';


export default function HomeScreen() {
  const { auth } = useContext(AuthContext);
  const user = auth.user;
  const screenWidth = Dimensions.get('window').width;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://10.0.2.2:5029/api';
  const ORDERS_API = `${API_BASE}/orders/company/${user.clientId}`;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${ORDERS_API}`);
        if (!res.ok) {
          const text = await res.text(); // Zobacz co zwraca serwer
          console.error('Błąd serwera:', res.status, text);
          throw new Error(`HTTP ${res.status}`);
        }
    
        const text = await res.text();
        if (!text) {
          console.warn('Pusta odpowiedź z serwera.');
          setOrders([]);
          return;
        }
    
        const data = JSON.parse(text); // Ręczne parsowanie — kontrola
        setOrders(data);
      } catch (err) {
        console.error('Błąd pobierania zamówień:', err);
        Alert.alert('Błąd', 'Nie udało się pobrać zamówień.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const salesDataMap = orders.reduce((acc, order) => {
    const month = new Date(order.placedAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + order.value;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(salesDataMap),
    datasets: [{ data: Object.values(salesDataMap) }],
  };

  const productMap = {};
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      const label = item.product.name;
      productMap[label] = (productMap[label] || 0) + item.quantity;
    });
  });

  const pieChartData = Object.entries(productMap).map(([label, value], index) => ({
    name: label,
    population: value,
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'][index % 6],
    legendFontColor: '#333333',
    legendFontSize: 12,
  }));

  const totalSales = orders.reduce((sum, o) => sum + o.value, 0).toFixed(2);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#6200EE" style={{ marginTop: 100 }} />
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.screenTitle}>Summary</Text>

          <StatsGrid />

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sales for the last six months</Text>
            </View>
            <Text style={styles.sectionValue}>{totalSales} zł</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 32}
              height={200}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
                labelColor: () => '#333333',
                style: { borderRadius: 8 },
              }}
              style={{ marginVertical: 8, borderRadius: 8, alignSelf: 'center' }}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Share of specific products in sales</Text>
            </View>
            <PieChart
              data={pieChartData}
              width={screenWidth - 32}
              height={200}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51,51,51, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[0, 0]}
              absolute
              style={{ alignSelf: 'center' }}
            />
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginTop: 16,
    marginHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  sectionValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginTop: 8,
    textAlign: 'center',
  },
});
