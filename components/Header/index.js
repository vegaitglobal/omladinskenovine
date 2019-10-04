import React from 'react';

import { View, Text, TouchableHighlight } from 'react-native';

const Header = (props) => {
  const { openDrawer } = props;

  return (
    <View>
      <TouchableHighlight onPress={openDrawer}>
        <Text>Header</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Header;