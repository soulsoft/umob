import React, {FC, useEffect, useState, useRef, Fragment} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../state/redux-hooks';

const HomeScreen: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.user);
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View>
        <Text>Welcome screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
