import { Linking } from "expo";
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
  padding-left: 16px;
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
  font-size: 18px;
  font-family: "Oswald";
`;

const menuFactory = navigation => [
  {
    label: "МЕНИ",
    children: [
      { label: "НАСЛОВНА СТРАНА", onPress: () => navigation.navigate("Home") },
      {
        label: "ШКОЛСКИ КУТАК",
        onPress: () => navigation.push("PostList", { category_id: 517 })
      },
      {
        label: "УСПЕШНИ МЛАДИ",
        onPress: () =>
          Linking.openURL("http://uspesnimladi.omladinskenovine.rs/")
      },

      { label: "О НАМА", onPress: () => navigation.navigate("About") },
      { label: "КОНТАКТ", onPress: () => navigation.navigate("Contact") }
    ]
  },
  {
    label: "ВЕСТИ",
    children: [
      {
        label: "СТИПЕНДИЈЕ",
        onPress: () => navigation.push("PostList", { category_id: 168 })
      },
      {
        label: "ПРАКСЕ",
        onPress: () => navigation.push("PostList", { category_id: 523 })
      },
      {
        label: "КОНКУРСИ",
        onPress: () => navigation.push("PostList", { category_id: 167 })
      },
      {
        label: "ЖИВОТ ВАН ФАКСА",
        onPress: () => navigation.push("PostList", { category_id: 522 })
      }
    ]
  },
  {
    label: "МАГАЗИН",
    onPress: () => navigation.push("PostList", { category_id: 518 }),
    children: [
      {
        label: "КУЛТУРА",
        onPress: () => navigation.push("PostList", { category_id: 6 })
      },
      {
        label: "ПРИЧЕ СА ПУТОВАЊА",
        onPress: () => navigation.push("PostList", { category_id: 166 })
      },
      {
        label: "ЗАНИМЉИВОСТИ",
        onPress: () => navigation.push("PostList", { category_id: 8 })
      },
      {
        label: "БЛОГ",
        onPress: () => navigation.push("PostList", { category_id: 1 })
      }
    ]
  }
];

const renderMenu = (menuItem, i) => {
  return (
    <TouchableOpacity
      key={i}
      onPress={menuItem.onPress}
      style={{ marginTop: menuItem.children && 15 }}
    >
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
