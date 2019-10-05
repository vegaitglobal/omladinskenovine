import { Animated, TouchableOpacity, View, Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import React, { useEffect } from 'react';

import { Layout } from '../../utils';

import Social from './Social';

const Container = styled.View`
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #000000;
`;

const Header = (props) => {
  const { navigation } = props;
  const { openDrawer } = navigation; 

  return (
    <Container>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={openDrawer}>
        <Ionicons name="md-menu" size={35} color="white" />
      </TouchableOpacity>

      <Social />

      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={openDrawer}>
        <Ionicons name="ios-search" size={30} color="white" />
      </TouchableOpacity>
    </Container>
  );
};

export default Header;