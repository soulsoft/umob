/**
 * @format
 * @flow strict-local
 */
import React, { FC } from "react";
import { View, Text } from "react-native";

export interface CustoMarkerProps {
  icon: string;
  text: string;
  vehicle: any;
}

const CustomMarker: FC<CustoMarkerProps> = (props: CustoMarkerProps) => {
  const { icon, text, vehicle } = props;

  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
      borderRadius: 20,
      width: 30,
      height: 30,
      padding: 10,
      borderColor: "white"
    }}>
      <View style={{
        width: 10,
        height: 10,
        position: "absolute",
        top: -1,
        right: 15,
        borderRadius: 10,
        backgroundColor: vehicle.is_reserved ? "#D96363" : "green",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
      </View>
      <Text style={{
        color: "white",
        textAlign: "center",
        fontSize: 9,
        fontWeight: "900",
        alignSelf: "stretch"
      }}>{text}</Text>
    </View>
  );
};

export default CustomMarker;
