import qs from "query-string";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  CacheManager,
  Image as CachedImage
} from "react-native-expo-image-cache";
import ContentLoader, { Rect } from "react-content-loader/native";
import styled from "styled-components";

// const fetchPosts = async (url) => await (await fetch(url)).json();
const fetchPostsWithImages = async url => {
  const posts = await (await fetch(url)).json();
  const withImg = (await Promise.all(
    posts.map(async (post, i) => {
      post.title.rendered = post.title.rendered
        .replace("&#8222;", "„")
        .replace("&#8220;", '"')
        .replace("&#8211;", "-");
      let id = post.featured_media;
      let image = await (await fetch(
        `http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`
      )).json();

      if (image.data && image.data.status > 400) {
        return null;
      }

      return {
        ...post,
        image_url: image.media_details.sizes.full.source_url
      };
    })
  )).filter(x => x !== null);

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
  margin-bottom: 20px;
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
          <PostCategory>{categoriesString}</PostCategory>
          <PostTitle>{formattedTitle}</PostTitle>
        </PostDetails>
      </Overlay>
    </SinglePostWrapper>
  );
};

const SkeletonWrapper = styled(View)`
  position: relative;
  width: 90%;
  height: 310;
  display: flex;
  background-color: #f2f2f2;
  flex-direction: column;
  align-items: center;
  margin: 0 5% 20px 5%;
  justify-content: center;
`;

// Loader
const SkeletonCard = () => (
  <SkeletonWrapper>
    <Overlay>
      <ContentLoader
        height={120}
        width={240}
        speed={1}
        primaryColor="#f9f9f9"
        secondaryColor="#dddbdb"
      >
        <Rect x="110" y="34" rx="3" ry="3" width="68" height="6" />
        <Rect x="44" y="57" rx="3" ry="3" width="244" height="14" />
        <Rect x="44" y="79" rx="3" ry="3" width="240" height="14" />
      </ContentLoader>
    </Overlay>
  </SkeletonWrapper>
);

const PostListScreen = props => {
  const { navigation } = props;
  const { category_id, search, label } = navigation.state.params;

  const query = qs.stringify({
    search: search,
    categories: category_id
  });

  const url = `https://omladinskenovine.rs/wp-json/wp/v2/posts?${query}`;
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState(null);

  const handleOnPress = (post, categories) =>
    navigation.push("Post", { post, categories });

  useEffect(() => {
    const getPosts = async () => {
      getAllCategoires().then(setCategories);

      const cachedPosts = JSON.parse(await AsyncStorage.getItem(query));

      if (cachedPosts) {
        return setPosts(cachedPosts);
      }

      fetchPostsWithImages(url).then(posts => {
        setPosts(posts);
        AsyncStorage.setItem(query, JSON.stringify(posts));
      });
    };

    getPosts();
  }, [navigation.state.params]);

  const isLoading = !posts || !categories;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{label}</Text>
        </View>

        <View style={{ alignSelf: "stretch" }}>
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={item => item}
            renderItem={() => <SkeletonCard />}
          ></FlatList>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{label}</Text>
      </View>
      <View>
        <FlatList
          data={posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item: post }) => (
            <SingleListPost
              {...post}
              allCategories={categories}
              handleOnPress={categories => handleOnPress(post, categories)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#000000"
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "RobotoSlab-Bold"
  }
});
