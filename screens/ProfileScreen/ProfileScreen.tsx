import React, { FC, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image

} from "react-native";

import MapView, { MapMarker, Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "../../state/redux-hooks";
import UmobButton from "../../components/UmobButton";
import { updateIsLoggedIn } from "../../state/reducers/user";
import Iconsax from "../../components/IconSax";
import { avatar } from "../../config/images";

const ProfileScreen: FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.user);
  const TouchableItemRender = (
    title: string,
    iconName: string,
    onPress: void
  ) => (
    <View
      style={{
        height: 84,
        marginTop: 5,
        alignSelf: "stretch",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20
      }}>
      <TouchableOpacity
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={() => {
          onPress();
        }}>
        <Text
          style={{
            fontSize: 16,
            color: "#424242",
            fontWeight: "400",
            marginLeft: 5
          }}>
          {title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
          <Iconsax
            name={iconName}
            color="#757575"
            size={18}
            variant="Linear"
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const ItemRender = (
    title: string,
    content: any,
    renderSeparator: boolean,
    children?: any
  ) => (
    <>
      <View
        style={{
          height: 66,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          paddingVertical: 10,
          paddingHorizontal: 10
        }}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start"
          }}>
          <Text
            style={{
              fontSize: 16,
              color: "#424242",
              fontWeight: "400"
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 60,
            alignItems: "flex-end",
            justifyContent: "center"
          }}>
          <Text
            style={{
              fontSize: 16,
              color: "#757575",
              fontWeight: "400",
              textAlign: "right"
            }}>
            {content}
          </Text>
        </View>
      </View>
      {children}
      {renderSeparator && (
        <View
          style={{
            backgroundColor: "#BDBDBD40",
            height: 1,
            alignSelf: "stretch",
            marginHorizontal: 10
          }}
        />
      )}
    </>
  );
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
      <View style={styles.profileContainer}>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.avtarcontainerStyle} onPress={() => {
            alert("Upload a new Avatar");
          }}>
            <Image source={avatar} style={styles.avatarStyle} />
          </TouchableOpacity>
          {ItemRender("Full Name", userInfo?.name, true)}
          {ItemRender("Nick Name", userInfo?.nickname, true)}
          {ItemRender("Email", userInfo?.email, true)}
        </View>
        <View style={{ marginBottom: 40 }}>
          <UmobButton text={"Logout"} onPressButton={() => {
            dispatch(updateIsLoggedIn(false));
          }} />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  infoContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  avtarcontainerStyle: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 50
  },
  avatarStyle: {
    height: 130,
    width: 130
  }
});
export default ProfileScreen;
