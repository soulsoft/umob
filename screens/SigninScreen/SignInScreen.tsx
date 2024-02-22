/**
 * @format
 * @flow strict-local
 */

import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import  { firebase } from "@react-native-firebase/firestore";

import { useAppDispatch } from '../../state/redux-hooks';

// import styles from './styles';
import { updateIsLoggedIn, updateUserInfos
} from "../../state/reducers/user";
import UmobButton from "../../components/UmobButton";
import { SvgXml } from "react-native-svg";
import { SplashLogo } from "../../config/images";


const SignInScreen: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const db = firebase.firestore();

  const [signup, setSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');


  useEffect(() => {

  }, []);

  const addUser = async (userInfo) => {
    try {
      await db.collection('user').doc(userInfo.uid).set({
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
      });
      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
      }}><View style={styles.mainContainer}>
      {!signup && <View style={{marginBottom:20,backgroundColor: '#000000', height:100, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius:100,alignSelf: 'center'}}>
          <SvgXml  xml={SplashLogo.toString() } width={80} height={30}/>
          <Text style={{color: '#ffffff', fontSize:15,fontWeight: 'bold'}}>Quiz</Text>
        </View>}
        <Text style={{ color: 'black', fontSize:25}}>{!signup ? 'Login to your Umob Quiz Account': 'Signup to Umob Quiz'}</Text>
        <Text style={{textAlign: 'left',fontSize: 14, color: 'grey',marginVertical:20,}}>{!signup ? 'Welcome back! Please log in to access your account. Enter your username and password below to continue.': 'Welcome to our app! Create an account to get started.'}</Text>
        <Text style={{ color: 'black', fontSize:14}} >E-Mail</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderRadius: 8,
            borderColor: 'grey',
            marginVertical: 10,
          }}
          onChangeText={(value)=>{setEmail(value)}}
          value={email}
        />
        <Text style={{ color: 'black', fontSize:14}}>Password</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderRadius: 8,
            borderColor: 'grey',
            marginVertical: 10,
          }}
          onChangeText={(value)=>{setPassword(value)}}
          value={password}
          secureTextEntry
        />
      {signup && <><Text style={{ color: 'black', fontSize:14}} >Full name</Text>
      <TextInput
        style={{
          borderWidth: 0.5,
          borderRadius: 8,
          borderColor: 'grey',
          marginVertical: 10,
        }}
        onChangeText={(value)=>{setName(value)}}
        value={name}
      />
      <Text style={{ color: 'black', fontSize:14}} >Nickname</Text>
      <TextInput
        style={{
          borderWidth: 0.5,
          borderRadius: 8,
          borderColor: 'grey',
          marginVertical: 10,
        }}
        onChangeText={(value)=>{setNickname(value)}}
        value={nickname}
      />
      <UmobButton
        text={'Signup'}
        onPressButton={() => {
          auth()
            .createUserWithEmailAndPassword(
              email,
              password,
            )
            .then((user) => {

              console.log(JSON.stringify(user))
              const userInfo = {
                uid:user.user.uid,
                email: email,
                name: name,
                nickname: nickname};
              addUser(userInfo).then(()=>{
                alert('User account created & signed in!');
                dispatch(updateUserInfos(userInfo));
                dispatch(updateIsLoggedIn(true));
              });
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
              }

              console.error(error);
            });
        }}
      />
      <Text style={{color: 'black' , marginTop:10, textAlign: 'center'}} onPress={
        () => {
          setSignup(false);
        }
      }>Already have an account? Log In</Text></>}
      {!signup && <><View style={styles.buttonContainer}>
          <UmobButton
            text={'Login'}
            disabled={false}
            onPressButton={() => {
              auth()
                .signInWithEmailAndPassword(
                  email,
                  password,
                )
                .then((userInfo) => {
                  dispatch(updateUserInfos(userInfo.user));
                  dispatch(updateIsLoggedIn(true));

                })
                .catch(error => {
                  if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                  }

                  if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                  }

                  console.error(error);
                });
            }}
          />
          <Text style={{color: 'black' , marginTop:10,}} onPress={
            () => {
              setSignup(true);
            }
          }>I don't have an account</Text>
        </View></>}
        </View>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textCounter: {marginTop: 20, color: '#000000'},
  textEditor: {
    height: 300,
    backgroundColor: '#ffffff81',
    borderWidth: 0.5,
    borderRadius: 5,
    color: '#000000',
  },
  mainContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default SignInScreen;
