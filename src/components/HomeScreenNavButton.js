import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class HomeScreenNavButton extends Component {
  render() {
    return (
      <TouchableOpacity>
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
