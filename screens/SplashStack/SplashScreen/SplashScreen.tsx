/**
 * @format
 * @flow strict-local
 */

import React, { FC, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useAppDispatch } from '../../../state/redux-hooks';
import { SplashLogo } from '../../../config/images';
import styles from './styles';
import { updateIsSplashScreen } from "../../../state/reducers/configuration";
import { fetchProviderss } from "../../../state/reducers/providers";



const SplashScreen: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProviderss());
    setTimeout(()=>{
      dispatch(updateIsSplashScreen(false));
    }, 2000)

  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.container}>
        <SvgXml style={styles.splashLogoStyle} xml={SplashLogo.toString() } width={200} height={60}/>
        <Text style={{ color: '#ffffff', fontSize:25,alignSelf: 'center'}}>Quiz</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
