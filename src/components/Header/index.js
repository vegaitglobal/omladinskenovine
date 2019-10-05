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

const ICON_POSITION = (Layout.window.width / 2) - 46.5;

const Header = (props) => {
  const { openDrawer, navigation } = props;

  const _animatedOpacity = new Animated.Value(1);

  useEffect(() => {
    if (navigation.state.drawerMovementDirection === 'opening') {
      Animated.parallel([
        Animated.timing(
          _animatedOpacity,
          {
            toValue: 0,
            duration: 150,
          },
        )
      ]).start()
    }

    if (navigation.state.drawerMovementDirection === 'closing') {
      Animated.parallel([
        Animated.timing(
          _animatedOpacity,
          {
            toValue: 1,
            duration: 150,
          },
        )
      ]).start()
    }
  }, [navigation.state.drawerMovementDirection])

  return (
    <Container>
      <Animated.View style={{ opacity: _animatedOpacity }}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={openDrawer}>
          <Ionicons name="md-menu" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: _animatedOpacity }}>
        <Social />
      </Animated.View>

      <Animated.View style={{ opacity: _animatedOpacity }}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={openDrawer}>
          <Ionicons name="ios-search" size={30} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
};

export default Header;