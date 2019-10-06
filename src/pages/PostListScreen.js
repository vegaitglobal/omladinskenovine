import { View, Text, FlatList, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { Image as CachedImage, CacheManager } from 'react-native-expo-image-cache';

// const fetchPosts = async (url) => await (await fetch(url)).json();
const fetchPostsWithImages = async (url) => {
  const posts = await (await fetch(url)).json();
  const withImg = await Promise.all(
    posts.map(async (post, i) => {
      let id = post.featured_media;
      let image = await (await fetch(`http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`)).json();
      return {
        ...post,
        imageUrl: image.media_details.sizes.full.source_url
      }
    })
  );

  return withImg;
}

const resolveCategories = async (categoryIds) => {
  const categoryLink = "http://omladinskenovine.rs/wp-json/wp/v2/categories?per_page=100";
  const allCategories = await (await fetch(categoryLink)).json();
  const categories = allCategories.filter(category => categoryIds.includes(category.id));
  return categories.map(category => category.name).join(", ");
}

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
`;

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.85);
  width: 95%;
  padding: 30px 10px;
`;

const PostDetails = styled.View``;

const PostCategory = styled.Text`
    font-family: "Oswald";
    text-align: center;
    font-size: 12;
    color: #EE4528;
`;

const PostTitle = styled.Text`
    font-family: "RobotoSlab-Bold";
    text-align: center;
    padding: 10px 0;
    font-size: 25px;
`;

const SingleListPost = ({ title: { rendered }, categories: categoryIds, imageUrl, handleOnPress }) => {
  const [categories, setCategories] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const formattedTitle = rendered
                          .replace("&#8222;", "„")
                          .replace("&#8220;", '"');

  useEffect(() => {
    resolveCategories(categoryIds).then(setCategories)
  }, []);


  CacheManager
    .get(imageUrl)
    .getPath()
    .then((url) => {
      setImagePreview(url);
    });

  if (!imagePreview) {
    return null;
  }

  return (
    <SinglePostWrapper onPress={handleOnPress}>
      <BackgroundImage resizeMode="contain" preview={{ uri: imagePreview }} uri={imageUrl} />
      <Overlay>
        <PostDetails>
          <PostCategory>{categories}</PostCategory>
          <PostTitle>{formattedTitle}</PostTitle> 
        </PostDetails>
      </Overlay>
    </SinglePostWrapper>
  )
}

const PostListScreen = (props) => {
  const { navigation } = props;
  const { category_id, search } = navigation.state.params;

  const query = qs.stringify({
    'search': search,
    'filter[cat]': category_id,
  });

  const url = `https://omladinskenovine.rs/wp-json/wp/v2/posts?${query}`;
  const [posts, setPosts] = useState([]);

  const handleOnPress = (post) => navigation.push('Post', {post});

  useEffect(() => {
    const getPosts = async () => {
      const cachedPosts = JSON.parse(await AsyncStorage.getItem(query));

      if (cachedPosts) {
        return setPosts(cachedPosts)
      }

      return fetchPostsWithImages(url).then((posts) => {
        setPosts(posts);
        AsyncStorage.setItem(query, JSON.stringify(posts));
      });
    };

    getPosts();
    
  }, [navigation.state.params]);

  if (posts.length < 0 ) return <View><Text>Loading...</Text></View>

  return (
    <View style={{ height: '100%' }}>
      <FlatList data={posts} renderItem={({ item: post }) => <SingleListPost {...post} handleOnPress={() => handleOnPress(post)}/>} />
    </View>
  )
    
}

export default PostListScreen;