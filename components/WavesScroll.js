/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {PropTypes, Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Actions, Router, Scene} from 'react-native-router-flux';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  AdEventType,
  RewardedAdEventType,
  RewardedAd,
  BannerAdSize,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';

import NatureSounds from '../components/NatureSounds';

import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/5224354917';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// function ShowAdd() {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const eventListener = rewarded.onAdEvent((type, error, reward) => {
//       if (type === RewardedAdEventType.LOADED) {
//         setLoaded(true);
//       }

//       if (type === RewardedAdEventType.EARNED_REWARD) {
//         console.log('User earned reward of ', reward);
//       }
//       if (type === AdEventType.CLOSED) {
//         console.log("ad closed");
//         setLoaded(false);

//         //reload ad
//         rewarded.load();
//       }
//     });

//     // Start loading the rewarded ad straight away
//     rewarded.load();

//     // Unsubscribe from events on unmount
//     return () => {
//       eventListener();
//     };
//   }, []);

//   // No advert ready to show yet
//   if (!loaded) {
//     return null;
//   }

//   return (
//     <Button
//       title="Show Interstitial"
//       onPress={() => {
//         rewarded.show();
//       }}
//       style={{width:0}}
//     />
//   );
// }

export default class WavesScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   admob()
  // .setRequestConfiguration({
  //   // Update all future requests suitable for parental guidance
  //   maxAdContentRating: MaxAdContentRating.PG,

  //   // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //   tagForChildDirectedTreatment: true,

  //   // Indicates that you want the ad request to be handled in a
  //   // manner suitable for users under the age of consent.
  //   tagForUnderAgeOfConsent: true,
  // })
  // .then(() => {
  //   // Request config successfully set!
  // });

  // }

  render() {
    return (
      <>
        <NatureSounds />
      </>
    );
  }
}

const styles = StyleSheet.create({
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fcfefc',
    justifyContent: 'center',
  },
  scrollTitle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#04D010',
    fontFamily: 'timesnewroman',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontFamily: 'IranianSans',
  },
  scroll1: {
    height: 200,
    backgroundColor: '#fff',
    width: '100%',
    alignContent: 'center',
    marginTop: 15,
  },
  scroll1boxes: {
    width: 250,
    height: 180,
    // backgroundColor: '#95afd6',
    position: 'relative',
    marginRight: 2,
    marginLeft: 3,
    borderRadius: 30,
    shadowRadius: 10,
    shadowColor: '#00BCD4',
    shadowOpacity: 0.5,
    elevation: 3,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  boxtop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 0,
  },
  boxTopTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'timesnewroman',
    textShadowColor: '#fff',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  scroll1boxesText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  boxtopimg: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  backImg: {
    width: '106%',
    height: '106%',
    alignSelf: 'center',
    position: 'absolute',
  },
  waveFrequence: {
    width: '105%',
    resizeMode: 'stretch',
    height: 20,
    alignSelf: 'center',
  },
});
