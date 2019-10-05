import styled, { css } from 'styled-components';
import React from 'react';
import { NavigationActions } from 'react-navigation';

import { View, Text, TouchableOpacity } from 'react-native';

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
  ${props => props.underline && css`
    border-bottom-width: 5px;
    border-bottom-color: #ee4528;
  `}
`;

MenuItem.Text = styled.Text`
  color: white;
`;


const menu = [
  {
    label: "TOP MENU",
    children: [
      { label: "USPESNI MLADI" },
      { label: "O NAME" },
      {
        label: "KONTAKT",
        screen: "Contact"
      },
    ],
  },
  {
    label: "MAIN MENU",
    children: [
      { label: "NASLOVNA STRANA" },
      { label: "VESTI" },
      { label: "MAGAZIN" },
      { label: "SKOLSKI KUTAK" },
      { label: "BLOG" },
      { label: "KULTURA" },
    ],
  },
]

const renderMenu = (menuItem) => (
  <TouchableOpacity onPress={() => NavigationActions.navigate(`${menuItem.screen}`)}>
    <MenuItem>
      <MenuItem.Wrapper>
        <MenuItem.Underline underline={!!menuItem.children}>
          <MenuItem.Text>
            {menuItem.label}
          </MenuItem.Text>
        </MenuItem.Underline>
      </MenuItem.Wrapper>

      {menuItem.children && menuItem.children.map(renderMenu)}
    </MenuItem>
  </TouchableOpacity>
);


const Drawer = (props) => {
  const { items, navigation } = props;

  return (
    <Container>
      <Container.Content>
        {menu.map(renderMenu)}
      </Container.Content>
    </Container>
  );
}

export default Drawer;
