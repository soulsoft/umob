import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import RootStackScreens from './navigation';
import {persistor, store} from './state/store/index';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <RootStackScreens />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
