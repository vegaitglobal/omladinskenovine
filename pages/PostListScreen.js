import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const fetchPosts = async (url) => await (await fetch(url)).json();

const BackgroundImage = styled.Image`
  flex: 1;
  aspect-ratio: 1;
  width: 100%;
`;

const PostListWrapper = styled.FlatList`

`;

const Overlay = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  top: 50%;
`;

const SinglePostWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5% 0 5%;
`;



const SingleListPost = ({ title }) => {
  return (
    <SinglePostWrapper>
      <BackgroundImage resizeMode="contain" source={{uri: 'http://lorempixel.com/output/abstract-q-c-640-480-1.jpg'}} />
      <Overlay>
        <Text>{title.rendered}</Text> 
      </Overlay>
    </SinglePostWrapper>
  )
}

const PostListScreen = ({ category }) => {
  const url = `https://omladinskenovine.rs/wp-json/wp/v2/posts?filter[cat]=${category}`;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(url).then(setPosts)
  }, []);
  
  if (posts.length < 0 ) return <View><Text>HOooe</Text></View>

  return (
    <View style={{ height: '100%' }}>
      <PostListWrapper data={posts} renderItem={({ item: post }) => <SingleListPost {...post} />} />
    </View>
  )
  
  
}


export default PostListScreen;