import { Linking } from "expo";
import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class ContactScreen extends Component {
  sendMail = () => Linking.openURL(`mailto:urednik@omladinskenovine.rs`);

  call = () => Linking.openURL(`tel:+381637711765`);

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                "http://omladinskenovine.rs/wp-content/uploads/facebook.com-1922342_755087504510296_1039571794_n.jpg"
            }}
          ></Image>
        </View>

        <View style={styles.mainTextContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>КОНТАКТ</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>
              Знате младе људе из вашег окружења за које мислите да заслужују да
              се о њима пише? Контактирајте са нама на
              urednik@omladinskenovine.rs и наш тим ће радо писати о њима.
            </Text>
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={this.sendMail}>
            <MaterialIcons name="email" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.call}>
            <MaterialIcons name="call" size={50} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1.75
  },
  textContainer: {
    textAlign: "justify"
  },
  title: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#000000",
    marginBottom: 10
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "RobotoSlab-Bold"
  },
  mainTextContainer: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "center",
    padding: 15
  },
  icons: {
    marginTop: 15,
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  icon: {
    fontSize: 20
  }
});
