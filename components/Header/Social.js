import { MaterialCommunityIcons as IconBase } from '@expo/vector-icons';
import styled from 'styled-components';
import React from 'react';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(IconBase)`
  padding: 0 5px;
`;

const socialItems = [
  { iconName: 'facebook' },
  { iconName: 'twitter' },
  { iconName: 'linkedin' },
  { iconName: 'instagram' },
  { iconName: 'rss' },
]

const Social = () => {

  return (
    <Container>
      {
        socialItems.map(socialItem => (
          <Icon
            key={socialItem.iconName}
            name={socialItem.iconName}
            size={20}
            color="white"
          />
        ))
      }
    </Container>
  );
}

export default Social;
