import {ToastAndroid, Platform, Alert} from 'react-native';

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    alert(msg);
  }
}
function notifyMessageWithTitle(title: string, msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, msg);
  }
}

function notifyAlertWithTitle(title: string, msg: string) {
  Alert.alert(title, msg);
}

export {notifyMessage, notifyMessageWithTitle, notifyAlertWithTitle};
