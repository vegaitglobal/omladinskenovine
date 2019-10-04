import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';

import Navigator from './navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ff0000',
  },
});
