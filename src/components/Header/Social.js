import { MaterialCommunityIcons as IconBase } from "@expo/vector-icons";
import { Linking } from "expo";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

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
  { iconName: "facebook", link: "fb://facewebmodal/f?href=OmladinskeNovine" },
  { iconName: "twitter", link: "twitter://user?screen_name=omladinske" },
  { iconName: "linkedin", link: "linkedin://company/omladinske-novine" },
  {
    iconName: "instagram",
    link: "instagram://user?username=omladinske_novine"
  },
  { iconName: "rss", link: "http://omladinskenovine.rs/feed/" }
];

const Social = () => {
  const handlePress = link => () => Linking.openURL(link);

  return (
    <Container>
      {socialItems.map((socialItem, i) => (
        <TouchableOpacity key={i} onPress={handlePress(socialItem.link)}>
          <Icon
            key={socialItem.iconName}
            name={socialItem.iconName}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default Social;
