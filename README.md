# Assignment Test App README

## Overview

This README provides an overview of the architecture and functionality of the Assignment Test App. This app is developed
using React Native and integrates various APIs to consume bike and vehicle provider data. The app generates quiz
questions based on the retrieved data to engage users in an interactive learning experience. It utilizes Firebase
services for backend functionalities including storage and authentication. The architecture incorporates popular
libraries such as React Navigation, React Redux, Redux Thunk, and Redux Logger for seamless navigation, state
management, and middleware functionalities. Additionally, it utilizes React Native Maps to visualize data on a map
interface, aiding users in exploring the data before initiating the quiz. Local data storage is facilitated by React
Native Async Storage and Redux Persist for seamless user experience across sessions.

## Architecture

### Components:

1. **React Native**: V 0.73.4

2. **Firebase**: Utilized for backend services including authentication, storage, and database functionalities.

3. **React Navigation**: Used for seamless navigation between different screens and components within the application.

4. **React Redux**: Employed for efficient state management, ensuring a predictable state container across the
   application.

5. **Redux Thunk & Logger Middleware**: Middleware enabling asynchronous actions and providing enhanced debugging
   capabilities.

6. **React Native Maps**: Integrated for displaying providers data on map interface, allowing users to explore
   geographical information of all providers.

7. **React Native Async Storage / AsyncStorage**: Utilized for storing data locally on the device, ensuring persistence
   of user preferences and application state.

8. **Redux Persist**: Integrated to enable seamless data persistence across app sessions, enhancing user experience by
   retaining application state.

### Functionality:

1. **API Integration**: The app integrates with bike and vehicle provider APIs to fetch relevant data for generating
   quiz questions.

2. **Quiz Generation**: Based on the retrieved data, the app generates quiz questions to engage users and facilitate
   learning about bike and vehicle providers.

3. **Firebase Authentication**: Firebase Authentication is employed to enable secure user authentication and access
   control.

4. **Firebase Storage**: Utilized for storing and retrieving static assets such as images or files.

5. **React Native Maps Integration**: Data fetched from APIs is visualized on a map interface using React Native Maps,
   enabling users to explore geographical information interactively.

6. **Local Data Storage**: User preferences and application state are stored locally using React Native Async Storage
   and Redux Persist, ensuring a seamless user experience across sessions.

## Installation and Setup

To install and run the Assignment Test App locally, follow these steps:

1. Clone the repository from [GitHub](https://github.com/your/repository).
2. Navigate to the project directory.
3. Run `yarn install` to install project dependencies.
4. Set up Firebase project and configure Firebase credentials in the app.
5. Run `yarn start` to start the Metro Server.
6. Hit `a` to choose launching the app on an Android emulator or device.

## Usage

Once the app is running, users can:

- Authenticate using Firebase Authentication.
- Explore bike and vehicle provider data on the map interface.
- Initiate quiz sessions to test their knowledge based on the retrieved data.

## If I had more time, here are the things I would change:

- Address the performance issue related to the heavy set of stored data by either reducing the amount of saved data or
  storing data in an SQLite database.
- Update provider pins with the right ones and optimize pin grouping to resolve performance issues on Google Maps.
- Finish implementing the Profile Screen functionality, enabling users to modify their information and upload avatars.
- Adding filters buttons on the Map, so user can navigate easly and filter what he want to see on the map.
- Implement functionality to save user scores and history on Firebase.
- Develop a backend using Node.js or Nest.js.
- Integrate Lottie animations.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
