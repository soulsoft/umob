import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

// import FlashMessage from 'react-native-flash-message';
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
    {/*<FlashMessage position="top" />*/}
  </Provider>
);

export default App;
