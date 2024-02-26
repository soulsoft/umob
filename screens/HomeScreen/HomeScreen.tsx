import React, { FC, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text, ActivityIndicator, StyleSheet

} from "react-native";

import MapView, { MapMarker, Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "../../state/redux-hooks";

const HomeScreen: FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.user);
  const { provider1, provider2, provider3 } = useAppSelector(state => state.providers);


  const markerRef = useRef<MapMarker>(null);
  const markerRef2 = useRef<MapMarker>(null);
  const markerRef3 = useRef<MapMarker>(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <MapView
        onMapLoaded={() => {
          setIsLoading(false);
        }}
        initialRegion={{
          latitude: 52.1326,
          longitude: 5.2913,
          latitudeDelta: 2.5,
          longitudeDelta: 2.5
        }}
        style={{
          flex: 1,
          marginTop: 30,
          width: 400,
          height: 300
        }}
      >
        {provider1.map(vehicle => (
          <Marker
            ref={markerRef}
            tracksViewChanges={false}
            key={vehicle?.vehicle_id}
            coordinate={{
              latitude: vehicle?.lat,
              longitude: vehicle?.lon
            }}
            pinColor={"#000000"}
            title={"Check | Max range: " + (vehicle.current_range_meters / 1000) + "KM"}
          >
          </Marker>
        ))}
        {
          provider2.map(bike => (
            <Marker
              ref={markerRef2}
              tracksViewChanges={false}
              key={bike?.bike_id}
              coordinate={{
                latitude: bike?.lat,
                longitude: bike?.lon
              }}
              pinColor={"#80f701"}
              title={"Cykl Bike"}
            ></Marker>))}
        {
          provider3.map(bike => (
            <Marker
              ref={markerRef3}
              tracksViewChanges={false}
              key={bike?.bike_id}
              coordinate={{
                latitude: bike?.lat,
                longitude: bike?.lon
              }}
              pinColor={"#a35c00"}
              title={"Donkey Bike"}
            ></Marker>))}
      </MapView>
      {isLoading && (<View style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>)}
    </SafeAreaView>
  );
};

export default HomeScreen;
