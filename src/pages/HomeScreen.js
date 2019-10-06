import { Linking } from "expo";
import React, { Component } from "react";
import {
  AsyncStorage,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import HomeScreenNavButton from "../components/HomeScreenNavButton";
import PostThumbnail from "../components/PostThumbnail";

const topItemsFactory = navigation => [
  {
    label: "УСПЕШНИ МЛАДИ",
    onPress: () => Linking.openURL("http://uspesnimladi.omladinskenovine.rs/")
  },
  { label: "О НАМА", onPress: () => navigation.navigate("About") },
  { label: "КОНТАКТ", onPress: () => navigation.navigate("Contact") }
];

const BOTTOM_ITEMS = [
  { label: "ШКОЛСКИ КУТАК", value: 4 },
  { label: "БЛОГ", value: 1 },
  { label: "КУЛТУРА", value: 8 }
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
      imagesLoaded: false,
      refreshing: false,
      connected: false,
      pageNumber: 1,
      pageSize: 5
    };
  }

  componentDidMount() {
    const preloadData = async () => {
      const posts = JSON.parse(await AsyncStorage.getItem("posts"));
      const categories = JSON.parse(await AsyncStorage.getItem("categories"));
      if (posts) {
        this.setState({ posts: posts, categories: categories });
      } else {
        this.loadData({});
      }
    };

    preloadData();
  }

  loadData = async ({ pageNumber = 1, pageSize = 5, posts = [] }) => {
    this.setState({ connected: this.props.connected });
    await this.getPosts(posts, pageNumber, pageSize);
    await this.getCategories();

    AsyncStorage.setItem("posts", JSON.stringify(this.state.posts));
    AsyncStorage.setItem("categories", JSON.stringify(this.state.categories));
  };

  onRefresh = async () => {
    this.setState({ refreshing: true, pageNumber: 1 });
    await this.loadData({
      pageNumber: 1,
      posts: []
    });
    this.setState({ refreshing: false });
  };

  navigateToPosts = categoryItem => {
    const { navigation } = this.props;

    navigation.push("PostList", {
      category_id: categoryItem.value
    });
  };

  navigate = routeName => {
    const { navigation } = this.props;

    navigation.navigate({
      routeName: routeName
    });
  };

  getPosts = async (prevPosts, pageNumber, pageSize) => {
    await fetch(
      `http://omladinskenovine.rs/wp-json/wp/v2/posts?page=${pageNumber}&per_page=${pageSize}`
    )
      .then(resp => resp.json())
      .then(async resp => {
        this.setState({ posts: [...prevPosts, ...resp] }, async () => {
          const withImg = await Promise.all(
            resp.map(async post => {
              post.title.rendered = post.title.rendered
                .replace("&#8222;", "„")
                .replace("&#8220;", '"')
                .replace("&#8211;", "-");
              let id = post.featured_media;
              return await fetch(
                `http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`
              )
                .then(resp => resp.json())
                .then(resp => ({
                  ...post,
                  image_url: resp.media_details.sizes.full.source_url
                }));
            })
          );

          const posts = [...prevPosts, ...withImg];

          this.setState({ posts: posts, imagesLoaded: true });
        });
      });
  };

  getCategories = async () => {
    await fetch(
      "http://omladinskenovine.rs/wp-json/wp/v2/categories?per_page=100"
    )
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ categories: resp });
      });
  };

  getImage = async id => {
    let url = null;

    await fetch(`http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        url = resp.source_url;
      });

    return url;
  };

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    let categories = this.state.categories.filter(cat =>
      item.categories.includes(cat.id)
    );
    const onReadMorePress = ({ post, categories }) =>
      navigation.push("Post", { post, categories });

    return (
      <PostThumbnail
        item={item}
        categories={categories}
        onReadMorePress={onReadMorePress}
      />
    );
  };

  determineLastItem = slideIndex => {
    if (slideIndex === this.state.posts.length - 1) {
      let pageNumber = this.state.pageNumber + 1;
      this.setState({ pageNumber: pageNumber });
      this.loadData({
        pageNumber,
        posts: this.state.posts
      });
    }
  };

  render() {
    const { navigation } = this.props;

    let width = Math.round(Dimensions.get("window").width);

    const topItems = topItemsFactory(navigation);

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/icons/logo.jpg")}
          ></Image>
        </View>
        <View style={styles.buttonsBar}>
          {topItems.map((item, i) => (
            <HomeScreenNavButton key={i} onPress={item.onPress}>
              {item.label}
            </HomeScreenNavButton>
          ))}
        </View>
        <View style={styles.posts}>
          <Carousel
            loop={false}
            autoplay={true}
            loopClonesPerSide={1}
            data={this.state.posts}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width}
            onBeforeSnapToItem={this.determineLastItem}
          ></Carousel>
        </View>
        <View style={styles.buttonsBar}>
          {BOTTOM_ITEMS.map((categoryItem, i) => (
            <HomeScreenNavButton
              key={i}
              onPress={() => this.navigateToPosts(categoryItem)}
            >
              {categoryItem.label}
            </HomeScreenNavButton>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  carouselItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    width: "100%"
  },
  buttonsBar: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    backgroundColor: "#0F1010",
    alignItems: "center",
    justifyContent: "space-around"
  },
  posts: {
    flex: 1,
    width: "100%"
  },
  logo: {
    width: "100%"
  },
  logoContainer: {
    width: "100%"
  }
});
