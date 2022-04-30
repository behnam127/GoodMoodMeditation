/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Sound from 'react-native-sound';
import ScrollView from 'rn-faded-scrollview';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {TimerPage} from './TimerPage';
import {Actions} from 'react-native-router-flux';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAdSize,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';

import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7969377773326924/4853570304';

class SetTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backImage}
          source={require('../assets/image/backg.png')}
        />
        <Text style={styles.setTimeTxt}>{Lang.howMuchTime}</Text>
        <View style={styles.timerScroll}>
          <ScrollView
            allowStartFade={true}
            allowEndFade={true}
            fadeSize={30}
            fadeColors={[
              'rgba(30, 30, 30, 0.03)',
              'rgba(30, 30, 30, 0.6)',
              'rgba(30, 30, 30, 0.9)',
            ]}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 1})}>
              <Text style={styles.timerText}>1 {Lang.miniute}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 2})}>
              <Text style={styles.timerText}>2 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 3})}>
              <Text style={styles.timerText}>3 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 4})}>
              <Text style={styles.timerText}>4 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 5})}>
              <Text style={styles.timerText}>5 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 6})}>
              <Text style={styles.timerText}>6 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 7})}>
              <Text style={styles.timerText}>7 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 8})}>
              <Text style={styles.timerText}>8 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.TimerPage({time: 60 * 9})}>
              <Text style={styles.timerText}>9 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 10})}>
              <Text style={styles.timerText}>10 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 11})}>
              <Text style={styles.timerText}>11 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 12})}>
              <Text style={styles.timerText}>12 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 13})}>
              <Text style={styles.timerText}>13 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 14})}>
              <Text style={styles.timerText}>14 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 15})}>
              <Text style={styles.timerText}>15 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 16})}>
              <Text style={styles.timerText}>16 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 17})}>
              <Text style={styles.timerText}>17 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 18})}>
              <Text style={styles.timerText}>18 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 19})}>
              <Text style={styles.timerText}>19 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 20})}>
              <Text style={styles.timerText}>20 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 21})}>
              <Text style={styles.timerText}>21 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 22})}>
              <Text style={styles.timerText}>22 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 23})}>
              <Text style={styles.timerText}>23 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 24})}>
              <Text style={styles.timerText}>24 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 25})}>
              <Text style={styles.timerText}>25 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 26})}>
              <Text style={styles.timerText}>26 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 27})}>
              <Text style={styles.timerText}>27 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 28})}>
              <Text style={styles.timerText}>28 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 29})}>
              <Text style={styles.timerText}>29 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 30})}>
              <Text style={styles.timerText}>30 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 31})}>
              <Text style={styles.timerText}>31 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 32})}>
              <Text style={styles.timerText}>32 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 33})}>
              <Text style={styles.timerText}>33 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 34})}>
              <Text style={styles.timerText}>34 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 35})}>
              <Text style={styles.timerText}>35 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 36})}>
              <Text style={styles.timerText}>36 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 37})}>
              <Text style={styles.timerText}>37 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 38})}>
              <Text style={styles.timerText}>38 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 39})}>
              <Text style={styles.timerText}>39 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 40})}>
              <Text style={styles.timerText}>40 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 41})}>
              <Text style={styles.timerText}>41 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 42})}>
              <Text style={styles.timerText}>42 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 43})}>
              <Text style={styles.timerText}>43 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 44})}>
              <Text style={styles.timerText}>44 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 45})}>
              <Text style={styles.timerText}>45 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 46})}>
              <Text style={styles.timerText}>46 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 47})}>
              <Text style={styles.timerText}>47 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 48})}>
              <Text style={styles.timerText}>48 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 49})}>
              <Text style={styles.timerText}>49 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 50})}>
              <Text style={styles.timerText}>50 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 51})}>
              <Text style={styles.timerText}>51 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 52})}>
              <Text style={styles.timerText}>52 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 53})}>
              <Text style={styles.timerText}>53 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 54})}>
              <Text style={styles.timerText}>54 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 55})}>
              <Text style={styles.timerText}>55 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 56})}>
              <Text style={styles.timerText}>56 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 57})}>
              <Text style={styles.timerText}>57 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 58})}>
              <Text style={styles.timerText}>58 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 59})}>
              <Text style={styles.timerText}>59 {Lang.minutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.TimerPage({time: 60 * 60})}>
              <Text style={styles.timerText}>60 {Lang.minutes}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            overflow: 'hidden',
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            elevation: 5,
          }}>
          {/* <BannerAd
            unitId={'ca-app-pub-7969377773326924/2010025327'}
            size={BannerAdSize.BANNER}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 80,
  },
  backImage: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 100,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  countDownTimer: {},
  timerScroll: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 230,
    height: 350,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#eee',
  },
  timerText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: '#fff',
    textShadowRadius: 10,
  },
  timerContainer: {
    marginTop: 80,
  },
  setTimeTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 30,
    padding: 20,
  },
});

export default SetTimer;
