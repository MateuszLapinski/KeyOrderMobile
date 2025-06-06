// HomeScreen.jsx

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';

import { BarChart, PieChart } from 'react-native-chart-kit';
import Footer from '../components/Footer';
import StatsGrid from '../components/StatsGrid';

// Przygotowujemy dane sprzedażowe (słupki) i produktowe (kółko)
const salesData = [
  { month: 'Jan', value: 50 },
  { month: 'Feb', value: 100 },
  { month: 'Mar', value: 125 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 140 },
  { month: 'Jun', value: 110 },
];

const productData = [
  { key: 1, value: 22, svg: { fill: '#FF6384' }, label: 'Product 1' },
  { key: 2, value: 12, svg: { fill: '#36A2EB' }, label: 'Product 2' },
  { key: 3, value: 13, svg: { fill: '#FFCE56' }, label: 'Product 3' },
  { key: 4, value: 20, svg: { fill: '#4BC0C0' }, label: 'Product 4' },
  { key: 5, value: 13, svg: { fill: '#9966FF' }, label: 'Product 5' },
  { key: 6, value: 20, svg: { fill: '#FF9F40' }, label: 'Product 6' },
];

export default function HomeScreen() {
  // Wymiary ekranu, żeby wykresy dopasować do szerokości
  const screenWidth = Dimensions.get('window').width;

  // Przygotowanie danych do BarChart (chart-kit potrzebuje obiektu { labels: [], datasets: [{ data: [] }] })
  const barChartData = {
    labels: salesData.map(item => item.month),
    datasets: [
      {
        data: salesData.map(item => item.value),
      },
    ],
  };

  // Przygotowanie danych do PieChart (chart-kit: tablica obiektów { name, population, color, legendFontColor, legendFontSize })
  const pieChartData = productData.map(item => ({
    name: item.label,
    population: item.value,
    color: item.svg.fill,
    legendFontColor: '#333333',
    legendFontSize: 12,
  }));

  const totalSales = '5 987,34';
  const totalProductsShare = '5 987,34';

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Nagłówek ekranu */}
          <Text style={styles.screenTitle}>Summary</Text>

          {/* Komponent z czterema kartami (StatsGrid) */}
          <StatsGrid />

          {/* ===== Sekcja 1: Sales for the last six months ===== */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sales for the last six months</Text>
              <Text style={styles.infoIcon}>ℹ︎</Text>
            </View>
            <Text style={styles.sectionValue}>{totalSales}</Text>
            <Text style={styles.sectionSubtitle}>Secondary text</Text>

            {/* Wykres słupkowy z react-native-chart-kit */}
            <View style={{ marginTop: 16 }}>
              <BarChart
                data={barChartData}
                width={screenWidth - 32}    // odejmujemy padding (po 16 z każdej strony)
                height={200}
                fromZero                  // zaczynamy y-osię od zera
                showValuesOnTopOfBars     // opcjonalnie: pokazuje wartości nad słupkami
                withInnerLines={false}    // usuwa linie siatki w tle
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`, // #6200EE
                  labelColor: () => '#333333',
                  style: {
                    borderRadius: 8,
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '' /* opcjonalnie: linie pełne zamiast kreskowanych */,
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 8,
                  alignSelf: 'center',
                }}
              />
            </View>

            {/* Legenda pod wykresem słupkowym */}
            <View style={styles.legendContainer}>
              {salesData.map((item, index) => (
                <View style={styles.legendItem} key={index}>
                  <View
                    style={[
                      styles.legendColorBox,
                      { backgroundColor: '#6200EE' },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{item.month}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ===== Sekcja 2: Share of specific products in sales ===== */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Share of specific products in sales
              </Text>
              <Text style={styles.infoIcon}>ℹ︎</Text>
            </View>
            <Text style={styles.sectionValue}>{totalProductsShare}</Text>
            <Text style={styles.sectionSubtitle}>Secondary text</Text>

            {/* Wykres kołowy z react-native-chart-kit */}
            <View style={{ marginTop: 16 }}>
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
                style={{
                  alignSelf: 'center',
                }}
              />
            </View>

            {/* Legenda pod wykresem kołowym */}
            <View style={styles.legendContainer}>
              {pieChartData.map((item, index) => (
                <View style={styles.legendItem} key={index}>
                  <View
                    style={[
                      styles.legendColorBox,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Stopka */}
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
    // cień (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // cień (Android)
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
  infoIcon: {
    fontSize: 16,
    color: '#999999',
  },
  sectionValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginTop: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#333333',
  },
});
