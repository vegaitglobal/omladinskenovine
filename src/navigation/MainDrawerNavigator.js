import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../pages/HomeScreen';
import PostListScreen from '../pages/PostListScreen';
import PostScreen from '../pages/PostScreen';
import ContactScreen from '../pages/ContactScreen';
import AboutScreen from '../pages/AboutScreen';

import Drawer from '../components/Drawer/Drawer';
import Header from '../components/Header';

const drawerNavigatior = createDrawerNavigator({
  Home: {
    screen: ContactScreen,
  },
  // "post list": PostListScreen,
  // "post": PostScreen,
  Contact: {
    screen: ContactScreen,
  }
  // "about": AboutScreen,
}, {
  drawerWidth: 250,
  drawerBackgroundColor: '#00a1a1',
  contentComponent: Drawer,
});

const stackNavigator = createStackNavigator(
  { 
    Drawer: {
      screen: drawerNavigatior,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header
            openDrawer={navigation.openDrawer}
            navigateHome={() => navigation.navigate("home")}
            navigation={navigation}
          />
        )
      }),
    }, 
  }
);

export default stackNavigator;