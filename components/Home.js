/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {
  PropTypes,
  Component,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Button,
  Alert,
  Text,
  BackHandler,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';

import {create} from 'react-test-renderer';
// import {InstagramMedia, instagramMediaParser} from 'react-instagram-media';

import WavesScroll from './WavesScroll';
import ChakrasInfo from './ChakrasInfo';
import ChakrasCleaning from './ChakrasCleaning';
import MainHeader from './MainHeader';

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

import {Lang} from './Lang';
import {AsyncStorage, async} from '@react-native-async-storage/async-storage';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-7969377773326924/1067747857';
// const insterstitial = InterstitialAd.createForAdRequest(adUnitId,{
// })

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      coins: this.props.coinspassed,
    };
  }
  componentDidMount() {
    this.setState({});
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    return true;
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          style={styles.mainscroll}
          showsVerticalScrollIndicator={false}>
          <MainHeader />
          <Text style={styles.scrollTitle}>{Lang.meditationNatureSounds}</Text>
          <WavesScroll />
          {/* <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: 20,
              backgroundColor: '#063340',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <BannerAd
              unitId={'ca-app-pub-7969377773326924/4252211134'}
              size={BannerAdSize.BANNER}
            />
          </View> */}
          <ChakrasCleaning />
          {/* <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: 20,
              backgroundColor: '#063340',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <BannerAd
              unitId={'ca-app-pub-7969377773326924/6372722416'}
              size={BannerAdSize.BANNER}
            />
          </View> */}
          <ChakrasInfo />
          {/* <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: 20,
              backgroundColor: '#063340',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <BannerAd
              unitId={'ca-app-pub-7969377773326924/7274740549'}
              size={BannerAdSize.BANNER}
            />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  mainscroll: {
    width: '100%',
    backgroundColor: '#f9f9ff',
  },
  scrollTitle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9900cc',
    fontFamily: 'timesnewroman',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontFamily: 'IranianSans',
  },
  // instaWeb:{
  //   height:900,
  //   width:'100%',
  //   margin:10,
  // },
});
