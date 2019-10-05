import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class HomeScreenNavButton extends Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.navButton}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    fontSize: 20,
    fontFamily: "Oswald",
    textAlign: "center",
    color: "#FFFFFF"
  }
});
