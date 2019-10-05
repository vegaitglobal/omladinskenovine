import * as Font from "expo-font";
import React, { Component } from "react";
import { Text } from "react-native";
import HomeScreen from "./pages/HomeScreen";

export default class App extends Component {
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
    return this.state.fontLoaded ? (
      <HomeScreen></HomeScreen>
    ) : (
      <Text>Loading</Text>
    );
  }
}
