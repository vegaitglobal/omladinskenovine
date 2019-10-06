import { ActivityIndicator, View, Text, FlatList, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { Image as CachedImage, CacheManager } from 'react-native-expo-image-cache';

// const fetchPosts = async (url) => await (await fetch(url)).json();
const fetchPostsWithImages = async url => {
  const posts = await (await fetch(url)).json();
  const withImg = await Promise.all(
    posts.map(async (post, i) => {
      post.title.rendered = post.title.rendered
        .replace("&#8222;", "„")
        .replace("&#8220;", '"')
        .replace("&#8211;", "-");
      let id = post.featured_media;
      let image = await (await fetch(
        `http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`
      )).json();
      return {
        ...post,
        image_url: image.media_details.sizes.full.source_url
      };
    })
  );

  return withImg;
};

const getAllCategoires = async () => {
  const categoryLink =
    "http://omladinskenovine.rs/wp-json/wp/v2/categories?per_page=100";
  const allCategories = await (await fetch(categoryLink)).json();
  return allCategories;
};

// const resolveCategories = async categoryIds => {
//   const allCategories = getAllCategoires();
//   const categories = allCategories.filter(category =>
//     categoryIds.includes(category.id)
//   );
//   return categories.map(category => category.name).join(", ");
// };

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
  color: #ee4528;
`;

const PostTitle = styled.Text`
  font-family: "RobotoSlab-Bold";
  text-align: center;
  padding: 10px 0;
  font-size: 25px;
`;

const SingleListPost = ({
  title: { rendered },
  categories: categoryIds,
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
    const filtered = allCategories.filter(category =>
      categoryIds.includes(category.id)
    );
    setCategories(filtered);
    setCategoriesString(filtered.map(c => c.name).join(", "));
  }, []);


  CacheManager
    .get(image_url)
    .getPath()
    .then((url) => {
      setImagePreview(url);
    });

  if (!imagePreview) {
    return null;
  }

  return (
    <SinglePostWrapper onPress={() => handleOnPress(categories)}>
      <BackgroundImage resizeMode="contain" preview={{ uri: imagePreview }} uri={image_url} />
      <Overlay>
        <PostDetails>
          <PostCategory>{categoriesString}</PostCategory>
          <PostTitle>{formattedTitle}</PostTitle>
        </PostDetails>
      </Overlay>
    </SinglePostWrapper>
  );
};

const PostListScreen = props => {
  const { navigation } = props;
  const { category_id, search } = navigation.state.params;

  const query = qs.stringify({
    search: search,
    categories: category_id
  });

  const url = `https://omladinskenovine.rs/wp-json/wp/v2/posts?${query}`;
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleOnPress = (post, categories) =>
    navigation.push("Post", { post, categories });

  const handleOnPress = (post) => navigation.push('Post', {post});

  useEffect(() => {
    const getPosts = async () => {
      getAllCategoires().then(setCategories);
      
      const cachedPosts = JSON.parse(await AsyncStorage.getItem(query));

      if (cachedPosts) {
        return setPosts(cachedPosts)
      }

      fetchPostsWithImages(url).then((posts) => {
        setPosts(posts);
        AsyncStorage.setItem(query, JSON.stringify(posts));
      });
    };

    getPosts();
    
  }, [navigation.state.params]);

  if (posts.length < 0 ) return <View><Text>Loading...</Text></View>

  return (
    <View style={{ height: "100%" }}>
      <ActivityIndicator
        size="large"
        style={{ top: "50%" }}
        animating={!posts.length}
      ></ActivityIndicator>
      <FlatList
        data={posts}
        renderItem={({ item: post }) => (
          <SingleListPost
            {...post}
            allCategories={categories}
            handleOnPress={categories => handleOnPress(post, categories)}
          />
        )}
      />
    </View>
  );
};

export default PostListScreen;
