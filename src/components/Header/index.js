import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import Search from "./Search";
import Social from "./Social";

const Container = styled.View`
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #000000;
`;

const Header = props => {
  const { navigation } = props;
  const { openDrawer } = navigation;

  const [isSearching, setIsSearching] = useState(false);

  const openSearch = () => setIsSearching(true);
  const closeSearch = () => setIsSearching(false);
  const handleSearch = search => {
    navigation.push("PostList", { search, label: "РЕЗУЛТАТИ ПРЕТРАГЕ" });
    closeSearch();
  };

  if (isSearching) {
    return (
      <Container>
        <Search onSearch={handleSearch} />
      </Container>
    );
  }

  return (
    <Container>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={openDrawer}
      >
        <Ionicons name="md-menu" size={35} color="white" />
      </TouchableOpacity>

      <Social />

      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={openSearch}
      >
        <Ionicons name="ios-search" size={30} color="white" />
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
