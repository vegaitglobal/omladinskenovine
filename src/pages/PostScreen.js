import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import HTMLView from "react-native-htmlview";
import styled from "styled-components";
import { formatDate } from "../utils/Utils";

const styles = StyleSheet.create({
  a: {
    fontWeight: "300",
    color: "#FF3366" // make links coloured pink
  }
});

const variables = {
  colors: {
    primary: "orange",
    text: "black"
  }
};

const FeaturedImage = styled(View)`
  width: 100%;
  height: 200;
`;
const Content = styled(View)`
  padding: 3% 4% 20% 4%;
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
  const { post, categories } = navigation.state.params;

  if (post === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
      <FeaturedImage>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: post.image_url
          }}
        ></ImageBackground>
      </FeaturedImage>

      <Content>
        <Title size={1}>{post.title.rendered}</Title>
        <Category>{categories.map(c => c.name).join(", ")}</Category>

        <Text style={{ marginBottom: 5 }}>{formatDate(post.date)}</Text>
        <HTMLView value={post.content.rendered} stylesheet={styles} />
      </Content>
    </ScrollView>
  );
};

PostScreen.defaultProps = {
  post: null
};

export default PostScreen;
