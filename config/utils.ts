import { ToastAndroid, Platform, Alert } from "react-native";


// Function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // const R = 6371e3; // Earth radius in meters
  const R = 6371; // Earth radius in kilometers
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};


// Function to find maximum distance between two bikes
const findMaxMinDistance = (data, getMaxDistance) => {
  let maxDistance = Number.MAX_VALUE;
  let minDistance = 0;
  let Result = 0;
  let bike1, bike2;

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const distance = calculateDistance(data[i].lat, data[i].lon, data[j].lat, data[j].lon);
      if (getMaxDistance) {
        if (distance > maxDistance) {
          maxDistance = distance;
          bike1 = data[i];
          bike2 = data[j];
        }
        Result = maxDistance;
      } else {
        if (distance < minDistance) {
          minDistance = distance;
          bike1 = data[i];
          bike2 = data[j];
        }
        Result = minDistance;
      }
    }
  }


  return { Result, bike1, bike2 };
};

function notifyMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    alert(msg);
  }
}

function notifyMessageWithTitle(title: string, msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, msg);
  }
}

function notifyAlertWithTitle(title: string, msg: string) {
  Alert.alert(title, msg);
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { notifyMessage, notifyMessageWithTitle, notifyAlertWithTitle, findMaxMinDistance, getRandomNumber };
