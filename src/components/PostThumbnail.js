import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../utils/Utils";

export default class PostThumbnail extends Component {
  render() {
    const { onReadMorePress, item } = this.props;
    let categories = this.props.categories.map(cat => cat.name);
    let categoriesString = categories.join(", ").toUpperCase();

    const title = item.title.rendered
      .toUpperCase()
      .replace("&#8222;", "„")
      .replace("&#8220;", '"');

    const date = formatDate(item.date);

    const handleReadMorePress = () => {
      onReadMorePress({ post: item, categories: this.props.categories });
    };

    return (
      <View style={styles.carouselItem}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: item.image_url }}
        ></Image>
        <View style={styles.overlay}>
          <Text style={styles.categories}>{categoriesString}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={handleReadMorePress}
            style={styles.readMore}
          >
            <Text style={styles.readText}>ПРОЧИТАЈ ВИШЕ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    width: "100%"
  },
  img: {
    width: "100%",
    flex: 1
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    width: "90%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 10
  },
  categories: {
    fontFamily: "Oswald",
    color: "#EE4528",
    fontSize: 12
  },
  date: {
    fontFamily: "Oswald",
    fontSize: 12
  },
  title: {
    fontFamily: "RobotoSlab-Bold",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25
  },
  readMore: {
    backgroundColor: "#EE4528",
    paddingHorizontal: 30,
    paddingVertical: 7
  },
  readText: {
    fontFamily: "Oswald",
    color: "#FFFFFF"
  }
});
