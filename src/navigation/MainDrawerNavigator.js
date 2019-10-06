import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header";
import AboutScreen from "../pages/AboutScreen";
import ContactScreen from "../pages/ContactScreen";
import HomeScreen from "../pages/HomeScreen";
import PostListScreen from "../pages/PostListScreen";
import PostScreen from "../pages/PostScreen";

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Contact: {
      screen: ContactScreen
    },
    PostList: {
      screen: PostListScreen
    },
    Post: {
      screen: PostScreen
    },
    About: {
      screen: AboutScreen
    }
  },
  {
    headerMode: "none"
  }
);

const drawerNavigatior = createDrawerNavigator(
  {
    stack: StackNavigator
  },
  {
    drawerWidth: 250,
    drawerBackgroundColor: "#00a1a1",
    contentComponent: Drawer
  }
);

const stackNavigator = createStackNavigator({
  Drawer: {
    screen: drawerNavigatior,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  }
});

export default stackNavigator;
