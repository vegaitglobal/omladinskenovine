import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Constants from 'expo-constants';

import Navigator from './navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000000",
  },
});
