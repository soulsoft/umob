/**
 * @format
 * @flow strict-local
 */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from './styles';
import {
  ProfileIcon,
  HomeIcon,
  MapIcon,
} from '../../config/images';
import { Gameboy, Profile,Map } from "iconsax-react-native";

export interface TabBarItemProps {
  icon: string;
  title: string;
  focused: boolean;
}
const TabBarItem: FC<TabBarItemProps> = (props: TabBarItemProps) => {
  const {icon, title, focused} = props;

  const getIcon = () => {
    switch (icon) {
      case 'Home':
        return <Map size="22" color="#000000"/>;
      case 'Quiz':
        return <Gameboy size="22" color="#000000"/>;
      case 'Profile':
        return <Profile size="22" color="#000000"/>;

      default:
        //flipped them for debugging
        return HomeIcon;
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {getIcon()}
        <Text style={{color: '#000000',fontWeight: '500'}}>
          {title}
        </Text>
        {focused && (
          <View
            style={{
              height: 2,
              width: 60,
              backgroundColor: '#DAFC5A',
              marginTop: 3,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default TabBarItem;
