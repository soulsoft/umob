import { Platform, StyleSheet } from 'react-native'
import { Height } from '../../config/constants';


const getRightAlignment = () => {
  if (Platform.OS === 'ios') {
    return 10
  }
  if (Platform.OS === 'android') {
    console.log("!@#", Height)
    if (Height <= 700) {
      return 6
    }
    return 12
  }
}

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    paddingTop: 4,
  },
})
