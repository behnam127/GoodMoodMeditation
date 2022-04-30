/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PropTypes, Component, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  YellowBox,
} from 'react-native';
import {icon, config} from '@fortawesome/fontawesome-free';

import {Actions, Router, Scene, TabIcon} from 'react-native-router-flux';
import Home from './components/Home';
import About from './components/About';
import SetTimer from './components/SetTimer';
import MusicStore2 from './components/MusicStore2';
import NatureSounds from './components/NatureSounds';
import NatureSoundsBtn from './components/NatureSoundsBtn';
import TimerPage from './components/TimerPage';
import PlayerPage from './components/PlayerPage';
//import Shop from './components/Shop';
import Splash from './components/Splash';
import Helper from './components/lib/Helper';
import HeaderCoins from './components/Header/HeaderCoins';
import CounterPage from './components/ReduxStates/CounterPage';
import Counter from './components/ReduxStates/Counter';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import Firebase from '@react-native-firebase/app';

import Breathing from './components/Breathing';
import SetLang from './components/SetLang';

import Login from './components/Auth/login';

import {store} from './components/ReduxStates/Store';
import {Provider} from 'react-redux';

// import TrackPlayer from 'react-native-track-player';

function HomeIcon(props) {
  return (
    <View>
      <Image
        source={require('./assets/image/home.png')}
        style={styles.icons}
        tintColor={'#99ff33'}
      />
      {/* <Text>Tab1</Text> */}
    </View>
  );
}

function TimerIcon(props) {
  return (
    <View>
      <Image
        source={require('./assets/image/timer.png')}
        style={styles.icons}
        // tintColor={'green'}
      />
      {/* <Text>Tab1</Text> */}
    </View>
  );
}

function MusicIcon(props) {
  return (
    <View>
      <Image
        source={require('./assets/image/musicstore.png')}
        style={styles.icons}
        tintColor={'orange'}
      />
      {/* <Text>Tab1</Text> */}
    </View>
  );
}

function BreathingIcon(props) {
  return (
    <View>
      <Image
        source={require('./assets/image/breathing.png')}
        style={styles.icons}
        tintColor={'#ffcc00'}
      />
      {/* <Text>Tab1</Text> */}
    </View>
  );
}

// function ShopIcon(props) {
//   return (
//     <View>
//       <Image
//         source={require('./assets/image/bag.png')}
//         style={styles.icons}
//         tintColor={'#ff751a'}
//       />
//       {/* <Text>Tab1</Text> */}
//     </View>
//   );
// }

function SettingIcon(props) {
  return (
    <View>
      <Image
        source={require('./assets/image/settingbtn.png')}
        style={styles.icons}
        tintColor={'#adebad'}
      />
      {/* <Text>Tab1</Text> */}
    </View>
  );
}
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.disableYellowBox = true;
    Firebase.initializeApp(this);
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  render(props) {
    return (
      <Provider store={store}>
        <Router
          {...this.props}
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navTitle}>
          <Scene key="root" hideNavBar>
            <Scene
              key="root2"
              tabs={true}
              tabBarPosition="bottom"
              activeBackgroundColor="rgba(60,60,60,0.5)"
              inactiveBackgroundColor="rgba(20,20,20,0.5)"
              inactiveTintColor="#6E6E6E"
              activeTintColor={'white'}
              tabBarStyle={{
                backgroundColor: 'rgba(20,20,20,0.5)',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              tabStyle={{
                width: '100%',
                height: '100%',
                borderTopColor: 'grey',
                borderTopWidth: 2,
                justifyContent: 'center',
                alignContent: 'center',
                paddingBottom: 13,
              }}
              swipeEnabled={true}
              animationEnabled={false}
              panHandlers={null}>
              {/* <Scene
                key="Shop"
                component={Shop}
                title=" "
                icon={ShopIcon}
                hideNavBar
                titleStyle={styles.navTitle}
              /> */}
              <Scene
                key="music"
                component={MusicStore2}
                title=" "
                icon={MusicIcon}
                hideNavBar
                titleStyle={styles.navTitle}
              />
              <Scene
                key="breathing"
                component={Breathing}
                title=" "
                icon={BreathingIcon}
                hideNavBar
                titleStyle={styles.navTitle}
              />
              <Scene
                key="Home"
                title=" "
                component={Home}
                icon={HomeIcon}
                hideNavBar
                titleStyle={styles.navTitle}
              />
              <Scene
                key="SetTimer"
                component={SetTimer}
                title=" "
                icon={TimerIcon}
                hideNavBar
                titleStyle={styles.navTitle}
              />

              <Scene
                key="About"
                component={About}
                icon={SettingIcon}
                title=" "
                hideNavBar
              />
            </Scene>
            <Scene
              key="Splash"
              component={Splash}
              title=" "
              initial={true}
              hideNavBar
            />
            <Scene key="Login" component={Login} title=" " hideNavBar />
            <Scene
              key="SetLang"
              component={SetLang}
              title="SetLang"
              hideNavBar
            />
            <Scene
              key="CounterPage"
              component={CounterPage}
              title=" "
              hideNavBar
            />
            <Scene key="Counter" component={Counter} title=" " hideNavBar />
            <Scene
              key="PlayerPage"
              component={PlayerPage}
              title=" "
              hideNavBar
              clone
            />
            <Scene
              key="TimerPage"
              component={TimerPage}
              title="TimerPage"
              clone
            />
            <Scene key="SetTimer" component={SetTimer} title="SetTimer" clone />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: 36,
    height: 30,
    bottom: -13,
  },
});
