/**
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashStack/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/SigninScreen';
import QuizScreen from '../screens/QuizScreen';
import {useAppDispatch, useAppSelector} from '../state/redux-hooks';

import TabBarItem from '../components/TabBarItem';
import {
  ANDROID,
} from '../config/constants';

const noHeader = {
  headerShown: false,
  headerTransparent: true,
  headerShadowVisible: false,
  gestureEnabled: false,
};

const SplashStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const SplashStackScreens: FC = () => {
  console.log('splashStack');
  return (
    <SplashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SplashStack.Screen
        name="splashScreen"
        component={SplashScreen}
        options={noHeader}
      />
    </SplashStack.Navigator>
  );
};

const HomeStackScreens: FC = () => {
  console.log('HomeStack');
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={noHeader}
      />
    </HomeStack.Navigator>
  );
};


const AuthStackScreens: FC = () => {
  console.log('HomeStack');
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name={'AuthScreen'}
        component={AuthScreen}
        options={noHeader}
      />
    </HomeStack.Navigator>
  );
};

const BottomNavScreens = ({navigation}: any) => (
  //console.log(navigation);
  <TabStack.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        height: Platform.OS === ANDROID ? 62 : 80,
        backgroundColor: 'black',
        elevation: 2,
        borderWidth: 0,
        borderTopWidth: 1,
      },
    }}>
    <TabStack.Screen
      name={'HOME_SCREEN'}
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarItem icon="Home" focused={focused} title="Explore" />
        ),
        headerShown: false,
      }}
    />
    <TabStack.Screen
      name={'QUIZ_SCREEN'}
      component={QuizScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarItem icon="Quiz" focused={focused} title="Quiz" />
        ),
        headerShown: false,
        unmountOnBlur: true,
      }}
    />
    <TabStack.Screen
      name={'PROFILE_SCREEN'}
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarItem icon="Profile" focused={focused} title="Profile" />
        ),
        headerShown: false,
      }}
    />
  </TabStack.Navigator>
);


const RootStackScreens: FC = () => {

  const { isSplashScreen} = useAppSelector(state => state.configuration);
  const { isUserLoggedIn} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  if (isSplashScreen) {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="splashStack"
          component={SplashStackScreens}
          options={noHeader}
        />
      </RootStack.Navigator>
    );
  }

  if (isUserLoggedIn) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <RootStack.Screen
          name={'BOTTOM_NAV_STACK'}
          component={BottomNavScreens}
        />
        <RootStack.Screen name={'HOME_STACK'} component={HomeStackScreens} />
      </RootStack.Navigator>
    );
  } else {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <RootStack.Screen name={'AUTH_STACK'} component={AuthStackScreens} />
      </RootStack.Navigator>
    );

  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <RootStack.Screen
        name={INACTIVE_ACCOUNT_STACK}
        component={InactiveAccountScreens}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreens;
