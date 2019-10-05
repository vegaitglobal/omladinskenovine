import React from "react";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components";

const Container = styled.ScrollView`
  background: #000000;
  border-top-width: 5px;
  border-top-color: #ee4528;
`;

Container.Content = styled.View`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.View`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

MenuItem.Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

MenuItem.Underline = styled.View`
  ${props =>
    props.underline &&
    css`
      border-bottom-width: 5px;
      border-bottom-color: #ee4528;
    `}
`;

MenuItem.Text = styled.Text`
  color: white;
`;

const menuFactory = navigation => [
  {
    label: "Top Menu",
    children: [
      { label: "УСПЕШНИ МЛАДИ" },
      { label: "О НАМА" },
      { label: "КОНТАКТ", onPress: () => navigation.navigate("Contact") }
    ]
  },
  {
    label: "Main Menu",
    children: [
      { label: "НАСЛОВНА СТРАНА", onPress: () => navigation.navigate("Home") },
      { label: "ВЕСТИ" },
      { label: "МАГАЗИН" },
      { label: "ШКОЛСКИ КУТАК" },
      { label: "БЛОГ" },
      { label: "КУЛТУРА" }
    ]
  }
];

const renderMenu = (menuItem, i) => {
  return (
    <TouchableOpacity key={i} onPress={menuItem.onPress}>
      <MenuItem>
        <MenuItem.Wrapper>
          <MenuItem.Underline underline={!!menuItem.children}>
            <MenuItem.Text>{menuItem.label}</MenuItem.Text>
          </MenuItem.Underline>
        </MenuItem.Wrapper>

        {menuItem.children && menuItem.children.map(renderMenu)}
      </MenuItem>
    </TouchableOpacity>
  );
};

const Drawer = props => {
  const { items, navigation } = props;

  const menu = menuFactory(navigation);

  return (
    <Container>
      <Container.Content>{menu.map(renderMenu)}</Container.Content>
    </Container>
  );
};

export default Drawer;
