import React from "react";
import { ImageBackground, ScrollView, Text, Dimensions } from "react-native";
import styled from "styled-components";
import { formatDate } from "../utils/Utils";
import HTML from "react-native-render-html";

const variables = {
  colors: {
    primary: "#f25529",
    text: "#000",
    textSecondary: "#888888"
  }
};

const FeaturedImageArea = styled.View`
  width: 100%;
  height: 200;
`;

const Date = ({ date }) => {
  return (
    <Text
      style={{
        color: variables.colors.textSecondary,
        fontSize: 10,
        paddingBottom: 20
      }}
    >
      {formatDate(date)}
    </Text>
  );
};
const Content = styled.View`
  padding: 15px;
  flex: 1;
  flex-direction: column;
`;

const Category = styled(Text)`
  color: ${variables.colors.primary};
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 2;
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
    <Text
      style={{
        fontSize: findTitleSize(props.size),
        paddingBottom: 2,
        fontFamily: "RobotoSlab-Bold",
        lineHeight: 30
      }}
    >
      {props.children}
    </Text>
  );
};

const PostScreen = props => {
  const { navigation } = props;
  const { post, categories } = navigation.state.params;

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
      <FeaturedImageArea>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: post.image_url
          }}
        ></ImageBackground>
      </FeaturedImageArea>
      <Content>
        <Title size={1}>{post.title.rendered}</Title>
        <Category>{categories.map(c => c.name).join(", ")}</Category>
        <Date date={post.date}></Date>

        <HTML
          html={post.content.rendered}
          baseFontStyle={{ fontSize: 14 }}
          tagsStyles={{
            p: { textAlign: "justify" },
            img: {
              width: Dimensions.get("window").width - 30,
              height: 200,
              marginTop: 10,
              marginBottom: 10
            },
            iframe: {
              maxWidth: "100%",
              marginTop: 10
            }
          }}
          classesStyles={{ "wp-caption-text": { maxWidth: "100%" } }}
          imagesInitialDimensions={{
            width: Dimensions.get("window").width - 30,
            height: 200
          }}
        />
      </Content>
    </ScrollView>
  );
};

export default PostScreen;
