import qs from "query-string";
import React, { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import {
  AsyncStorage,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  CacheManager,
  Image as CachedImage
} from "react-native-expo-image-cache";
import styled from "styled-components";
import { formatDate } from "../utils/Utils";
const BackgroundImage = styled(CachedImage)`
  flex: 1;
  aspect-ratio: 1;
  width: 100%;
`;

const SinglePostWrapper = styled.TouchableOpacity`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5% 0 5%;
  justify-content: center;
  margin-bottom: 20px;
`;

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.85);
  width: 95%;
  padding: 30px 10px;
  flex-direction: row;
  justify-content: center;
`;

const PostDetails = styled.View``;

const PostCategory = styled.Text`
  font-family: "Oswald";
  text-align: center;
  font-size: 12;
  color: #ee4528;
`;

const PostDate = styled.Text`
  font-family: "Oswald";
  text-align: center;
  font-size: 12;
`;

const PostTitle = styled.Text`
  font-family: "RobotoSlab-Bold";
  text-align: center;
  padding: 10px 0;
  font-size: 25px;
`;
export const SingleListPost = ({
    title: { rendered },
    categories: categoryIds,
    date,
    allCategories,
    image_url,
    handleOnPress
  }) => {
    const [categoriesString, setCategoriesString] = useState("");
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
  
    const formattedTitle = rendered;
  
    useEffect(() => {
      //resolveCategories(categories).then(setCategories);
      const filtered = allCategories? allCategories.filter(category =>
        categoryIds.includes(category.id)
      ) : []
      setCategories(filtered);
      setCategoriesString(filtered.map(c => c.name).join(", "));
    }, []);
  
    CacheManager.get(image_url)
      .getPath()
      .then(url => {
        setImagePreview(url);
      });
  
    return (
      <SinglePostWrapper onPress={() => handleOnPress(categories)}>
        <BackgroundImage
          resizeMode="cover"
          preview={{ uri: imagePreview }}
          uri={image_url}
        />
        <Overlay>
          <PostDetails>
            <PostCategory>{categoriesString.toUpperCase()}</PostCategory>
            <PostDate>{formatDate(date)}</PostDate>
            <PostTitle>{formattedTitle.toUpperCase()}</PostTitle>
          </PostDetails>
        </Overlay>
      </SinglePostWrapper>
    );
  };