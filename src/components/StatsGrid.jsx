import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatCard = ({
  icon,
  iconBackground,
  percentage,
  percentageColor,
  title,
  value,
  progress,
  subtitle,
}) => (
  <Card style={styles.card}>
    <Card.Content>
      {/* Nagłówek: ikonka po lewej i badge po prawej */}
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
          <MaterialCommunityIcons name={icon} size={28} color={percentageColor} />
        </View>
        <View style={[styles.badgeContainer, { backgroundColor: percentageColor }]}>
          <Text style={styles.badgeText}>{percentage}</Text>
        </View>
      </View>

      {/* Tytuł karty */}
      <Text style={styles.title}>{title}</Text>

      {/* Duża liczba */}
      <Text style={styles.value}>{value}</Text>

      {/* Pasek postępu */}
      <ProgressBar
        progress={progress}
        color={percentageColor}
        style={styles.progress}
      />

      {/* Dopisek pod paskiem */}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Card.Content>
  </Card>
);

/**
 * Siatka czterech kart (dwie kolumny, dwa wiersze).
 */
export default function StatsGrid() {
  return (
    <View style={styles.container}>
      {/* Pierwszy wiersz: Revenue + Orders Today */}
      <View style={styles.row}>
        <StatCard
          icon="currency-usd"
          iconBackground="rgba(76,175,80,0.1)"   // zielone tło 10% opacity
          percentage="+3%"
          percentageColor="#4CAF50"               // kolor zielony
          title="Revenue"
          value="$84,245"
          progress={0.84}                         // 84% postępu
          subtitle="Monthly target: $100,000"
        />
        <StatCard
          icon="file-sync"
          iconBackground="rgba(244,67,54,0.1)"    // czerwone tło 10% opacity
          percentage="-5.5%"
          percentageColor="#F44336"               // kolor czerwony
          title="Orders Today"
          value="145"
          progress={0.23}                         // 23% postępu
          subtitle="Daily target: 550"
        />
      </View>

      {/* Drugi wiersz: Month Total + Orders in Progress */}
      <View style={styles.row}>
        <StatCard
          icon="history"
          iconBackground="rgba(76,175,80,0.1)"
          percentage="+4.5%"
          percentageColor="#4CAF50"
          title="Month Total"
          value="25,091"
          progress={0.75}
          subtitle="(to previous month)"
        />
        <StatCard
          icon="account"
          iconBackground="rgba(76,175,80,0.1)"
          percentage="+17.5%"
          percentageColor="#4CAF50"
          title="Orders in Progress"
          value="25,091"
          progress={0.75}
          subtitle="(to previous month)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // jasnoszare tło ekranu
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    elevation: 2,        // cień na Androidzie
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  progress: {
    height: 4,
    borderRadius: 2,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#777777',
  },
});
