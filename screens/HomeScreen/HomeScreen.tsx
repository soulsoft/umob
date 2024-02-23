import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text, ActivityIndicator, StyleSheet

} from "react-native";

import MapView, { MapMarker, Marker } from "react-native-maps";
import {useAppDispatch, useAppSelector} from '../../state/redux-hooks';

const HomeScreen: FC = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.user);
  const {providers} = useAppSelector(state => state.providers);

  useEffect(() => {
    //dispatch(fetchProviderss());
  }, []);


  const markerRef = useRef<MapMarker>(null);
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

        <MapView
          onMapLoaded={()=>{
            setIsLoading(false);
          }}
          initialRegion={{
            latitude: 51.9225,
            longitude: 4.4792,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{
            flex:1,
            marginTop:30,
            width: 400,
            height: 300,
          }}
        >{providers.map(vehicle => (
          <Marker
            ref={markerRef}
            tracksViewChanges={false}
            key={vehicle.vehicle_id}
            coordinate={{
              latitude: vehicle.lat,
              longitude: vehicle.lon,
            }}
            title={'Check | Max range: '+ (vehicle.current_range_meters/1000) + 'KM'}
          ><View
            style={{alignItems: 'center',
              justifyContent: 'center', backgroundColor: "black",borderRadius:20, width:30, height:30, padding: 10, borderColor: 'white'}}>
              <View style={{width:10, height:10,
                position: 'absolute',
                top: -1,
                right: 15,
                borderRadius: 10,
                backgroundColor: vehicle.is_reserved ?'#D96363': 'green',
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
            </View>
            <Text style={{color: 'white',textAlign: 'center', fontSize:9, fontWeight: '900',alignSelf: 'stretch'}}>C</Text>
          </View></Marker>
        ))}</MapView>
      {isLoading && (<View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>)}
    </SafeAreaView>
  );
};

export default HomeScreen;
