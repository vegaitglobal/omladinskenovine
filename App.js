<<<<<<< HEAD
import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import Constants from "expo-constants";
=======

import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { Component } from "react";
import Constants from 'expo-constants';
import * as Font from "expo-font";
>>>>>>> 0960aac1c2d1a3fd1d91462bed835c292eefa411

import Navigator from "./navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Oswald: require("./assets/fonts/Oswald-Regular.ttf"),
      "RobotoSlab-Bold": require("./assets/fonts/RobotoSlab-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state; 
  
    if (!fontLoaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <Navigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000000"
  }
});

export default App;