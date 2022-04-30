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
  script,
  TouchableOpacityBase,
  Alert,
} from 'react-native';
import Sound from 'react-native-sound';
import ScrollView from 'rn-faded-scrollview';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import SetTimer from './SetTimer';
import ReactDOM from 'react-dom';
import {Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import KeepAwake from 'react-native-keep-awake';
import {Player} from '@react-native-community/audio-toolkit';
import BackgroundTimer from 'react-native-background-timer';

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

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7969377773326924/1952074790';

// module.exports = async (taskData) => {
//   this.setState({muteBell: false});
// };

class TimerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn: true,
      time: this.props.time,
      sec: this.props.time * 1000,
      muteBell: true,
      bellPlay: null,
    };
  }

  componentDidMount() {
    // KeepAwake.activate();

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

    this.bellring = new Sound('bell.mp3', null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      }
    });
    this.bellring.release();
  }

  TimeOut1 = BackgroundTimer.setTimeout(() => {
    console.log(this.state.sec);
    this.bellring.play();
    this.bellring.setNumberOfLoops(3);
    Alert.alert('You can open your eyes now..', '', [
      {
        text: 'Diss Miss the alarm!',
        onPress: () => {
          this.bellring.stop();
        },
      },
    ]);
  }, this.props.time * 1000);

  render() {
    var btn = this.state.btn;

    return (
      <View style={styles.container}>
        <KeepAwake />
        <Image
          style={styles.backImage}
          source={require('../assets/image/backg.png')}
        />

        <TouchableOpacity
          onPress={() => this.bellring.play()}
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignSelf: 'flex-start',
            padding: 5,
            marginTop: 20,
          }}>
          <Image
            style={{width: '100%', height: '100%', tintColor: '#fff'}}
            source={require('../assets/image/bell.png')}
          />
        </TouchableOpacity>

        <View style={styles.clock}>
          <CountdownCircleTimer
            isPlaying={btn}
            duration={this.state.time}
            onComplete={() => {
              // this.bellring.play();
              //this.setState({bellPlay: 'yes'});
              // this.bell.play();
              // this.bell.setNumberOfLoops(2);
            }}
            size={200}
            colors={[
              ['#24fc03', 0.4],
              ['#0320fc', 0.4],
              ['#fc03fc', 0.4],
            ]}>
            {({remainingTime, animatedColor}) => (
              <Animated.Text style={{color: animatedColor, fontSize: 70}}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>

        <Button
          style={styles.btn}
          onPress={() => {
            this.setState({btn: false, muteBell: true});
            BackgroundTimer.clearTimeout(this.TimeOut1);
            this.bellring.stop();
            Actions.pop();
          }}>
          {/* متوقف کردن تایمر  Stop/Go back*/}
          <Text style={{color: '#fff'}}>{Lang.stopTmer}</Text>
        </Button>
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
            unitId={'ca-app-pub-7969377773326924/7908971844'}
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
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 30,
    // justifyContent: 'center',
  },
  clock: {
    flexDirection: 'row',
    flex: 1,
    bottom: 150,
    position: 'absolute',
  },
  backImage: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 50,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  btn: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: '#000',
    shadowRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 50,
    position: 'absolute',
  },
  Text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 30,
    padding: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
  },
});

export default TimerPage;
