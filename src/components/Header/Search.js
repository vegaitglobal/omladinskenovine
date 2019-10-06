import styled from "styled-components";
import { View, Button } from "react-native";
import React, { useState } from "react";

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const TextInput = styled.TextInput`
  flex: 1;
  height: 33px;
  background: #ffffff;
  color: #000000;
  padding: 0 15px;
`;

const Search = props => {
  const { onSearch, onBlur } = props;

  const [search, setSearch] = useState("");

  const handleSearch = () => onSearch(search);

  return (
    <Container>
      <TextInput
        autoFocus={true}
        onChangeText={setSearch}
        value={search}
        onBlur={onBlur}
        onSubmitEditing={handleSearch}
        returnKeyType={"search"}
      />
      <Button
        style={{ backgroundColor: "#f25529" }}
        color="#f25529"
        title="Тражи"
        onPress={handleSearch}
      />
    </Container>
  );
};

export default Search;
