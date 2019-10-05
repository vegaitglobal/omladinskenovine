import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import styled from "styled-components";
import { formatDate } from "../utils/Utils";
import { WebView } from "react-native-webview";
import AutoHeightWebView from "react-native-autoheight-webview";
import MyWebView from "react-native-webview-autoheight";
const customStyle =
  "<style>* {max-width: 100%;} body {font-family: sans-serif;} img {height: auto !important} </style>";

const styles = StyleSheet.create({
  a: {
    fontWeight: "300",
    color: "#FF3366"
  },
  p: {
    margin: 0,
    padding: 0
  },
  img: {
    margin: 0
  }
});

const variables = {
  colors: {
    primary: "#f25529",
    text: "#000",
    textSecondary: "#888888"
  }
};

const FeaturedImageArea = styled(View)`
  width: 100%;
  height: 200;
`;

const FeaturedImage = ({ id }) => {
  const [hasError, setErrors] = useState(false);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const res = await fetch(
      `http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`
    );
    res
      .json()
      .then(res => {
        setImg(res);
        setLoading(false);
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || img === null) {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#E8E8E8" }}
      ></View>
    );
  }

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={{
        uri: img.media_details.sizes.medium_large.source_url
      }}
    ></ImageBackground>
  );
};

const Date = ({ date }) => {
  return (
    <Text style={{ color: variables.colors.textSecondary }}>
      {formatDate(date)}
    </Text>
  );
};
const Content = styled(View)`
  padding: 15px;
  flex: 1;
  flex-direction: column;
`;

const Category = styled(Text)`
  color: ${variables.colors.primary};
  text-transform: uppercase;
`;

const Title = props => {
  const findTitleSize = size => {
    switch (size) {
      case 1:
        return 28;
      case 2:
        return 18;
      case 3:
        return 15;
      case 4:
        return 12;
      default:
        return 15;
    }
  };

  return (
    <Text style={{ fontSize: findTitleSize(props.size), paddingBottom: 2 }}>
      {props.children}
    </Text>
  );
};

const PostScreen = props => {
  const { navigation } = props;
  const { post } = navigation.state.params;

  if (post === null) {
    return <Text>Loading...</Text>;
  }

  console.log(post.content.rendered);
  return (
    <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
      <FeaturedImageArea>
        <FeaturedImage key={post.id} id={post.featured_media}></FeaturedImage>
      </FeaturedImageArea>
      <Content>
        <Title size={1}>{post.title.rendered}</Title>
        <Category>Categories...</Category>
        <Date date={post.date}></Date>

        <MyWebView
          source={{ html: customStyle + post.content.rendered }}
          width={Dimensions.get("window").width - 30}
        />
      </Content>
    </ScrollView>
  );
};

PostScreen.defaultProps = {
  post: null
};

export default PostScreen;
