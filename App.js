import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";
import * as Font from "expo-font";
import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import Navigator from "./src/navigation";
import { INTERNET_CONNECTION_ISSUE_MESSAGE } from "./src/utils/Consts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isConnected: false
    };

    NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
      if (!state.isConnected) {
        Toast.show(INTERNET_CONNECTION_ISSUE_MESSAGE);
      }
    });
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
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <Navigator />
      </View>
    );
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
