import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PostListScreen from './pages/PostListScreen';

export default function App() {
  return (
    <PostListScreen category="1" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
