import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import HomeScreenNavButton from "../components/HomeScreenNavButton";
import PostThumbnail from "../components/PostThumbnail";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
      imagesLoaded: false
    };

    this.getPosts = this.getPosts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.getPosts(5);
    this.getCategories();
  }

  async getPosts(number) {
    await fetch(
      `http://omladinskenovine.rs/wp-json/wp/v2/posts?per_page=${number}`
    )
      .then(resp => resp.json())
      .then(async resp => {
        this.setState({ posts: resp }, async () => {
          const withImg = await Promise.all(
            resp.map(async (post, i) => {
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

          this.setState({ posts: withImg, imagesLoaded: true });
        });
      });
  }

  async getCategories() {
    await fetch(
      "http://omladinskenovine.rs/wp-json/wp/v2/categories?per_page=100"
    )
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ categories: resp });
      });
  }

  async getImage(id) {
    let url = null;

    await fetch(`http://omladinskenovine.rs/wp-json/wp/v2/media/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        url = resp.source_url;
      });

    return url;
  }

  renderItem({ item, index }) {
    let categories = this.state.categories.filter(cat =>
      item.categories.includes(cat.id)
    );
    //categories = categories.map(cat => cat.id);
    return <PostThumbnail item={item} categories={categories}></PostThumbnail>;
  }

  render() {
    let width = Math.round(Dimensions.get("window").width);

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/icons/logo.jpg")}
          ></Image>
        </View>
        <View style={styles.buttonsBar}>
          <HomeScreenNavButton>УСПЕШНИ МЛАДИ</HomeScreenNavButton>
          <HomeScreenNavButton>О НАМА</HomeScreenNavButton>
          <HomeScreenNavButton>КОНТАКТ</HomeScreenNavButton>
        </View>
        <View style={styles.posts}>
          <Carousel
            loop={true}
            autoplay={true}
            data={this.state.posts}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width}
          ></Carousel>
        </View>
        <View style={styles.buttonsBar}>
          <HomeScreenNavButton>ШКОЛСКИ КУТАК</HomeScreenNavButton>
          <HomeScreenNavButton>БЛОГ</HomeScreenNavButton>
          <HomeScreenNavButton>КУЛТУРА</HomeScreenNavButton>
        </View>
      </View>
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
