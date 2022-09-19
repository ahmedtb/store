import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import LocationPicker from '../components/LocationPicker';
import * as Location from 'expo-location';

export default function GPSLocationScreenScreen() {
  const [location, setLocation] = React.useState< { latitude: number, longitude: number } | null>(null);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>سيتم استعمال موقعك الحالي لتوصيل الطلبيات</Text>

      <LocationPicker
        value={location}
        onChange={setLocation}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
