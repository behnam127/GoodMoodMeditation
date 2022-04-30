/* eslint-disable react/self-closing-comp */
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
  ScrollView,
  Dimensions,
  View,
  Button,
  Alert,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';

import {create} from 'react-test-renderer';
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  RepeatMode,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
  ProgressComponent,
  getPosition,
  State,
} from 'react-native-track-player';

import {Actions} from 'react-native-router-flux';

import {
  AdEventType,
  BannerAdSize,
  BannerAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {Item} from 'native-base';

// const tracks = [
//   {
//     id: 1,
//     url: 'https://uncleb.ir/musics/music-in-nature/2.mp3',
//     title: 'Blues Beat',
//     artwork: 'https://uncleb.ir/musics/music-in-nature/2.jpeg',
//   },
//   {
//     id: 2,
//     url: 'https://uncleb.ir/musics/music-in-nature/3.mp3',
//     title: 'Blues Beat',
//     artwork: 'https://uncleb.ir/musics/music-in-nature/3.jpeg',
//   },
// ];

// seekTime = (seconds) => {
//   this.setState({timeElapsed: Moment.utc(seconds * 1000).format('m:ss')});
//   TrackPlayer.seekTo(seconds);
//   this.setState({
//     timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format(
//       'm:ss',
//     ),
//   });
// };
// setCurr = (seconds) => {
//   return Moment.utc(seconds * 1000).format('m:ss');
// };
// getS = async () => {
//   return await TrackPlayer.getState();
// };

// repeating(){
//   if (data.type === 'remote-pause') {
//     // The play button was pressed, we can forward this command to the player using
//     TrackPlayer.pause();
//   }

// }

const PlayerPage = (props) => {
  const playbackState = usePlaybackState();

  const tracks = [
    {
      id: 1,
      url: props.musicurl,
      title: props.title,
      artwork: props.picurl,
      musicduration: props.musicduration,
    },
  ];

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    // TrackPlayer.setRepeatMode(RepeatMode.Track);
    await TrackPlayer.play();
    await TrackPlayer.pause();

    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`Title: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log(`${duration - position} seconds left.`);
  };

  useEffect(() => {
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
    setUpTrackPlayer();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: props.picurl}}
        style={styles.backgroundImg}
        blurRadius={1.5}
      />
      <View style={styles.backgroundImgOpacity} />
      <View style={styles.AdsContainer}>
        <BannerAd
          unitId={'ca-app-pub-7969377773326924/2967883776'}
          size={BannerAdSize.MEDIUM_RECTANGLE}
        />
      </View>

      {/* <View style={styles.seekbarRow}>
        <Slider
          style={{
            height: 80,
            top: -15,
            position: 'absolute',
            width: '100%',
            //backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          minimumValue={0}
          //value={this.state.position}
          animationType="timing"
          maximumValue={props.duration}
          trackStyle={{width: Dimensions.get('screen').width - 50, height: 4}}
          thumbStyle={{height: 20, width: 20, backgroundColor: '#fff'}}
          thumbTouchSize={{width: 100, height: 40}}
          onSlidingComplete={(seconds) => {
            console.log(seconds);
            TrackPlayer.seekTo(`${duration - position} seconds left.`);
          }}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"></Slider>
        <View style={styles.durationContainer}>
          <Text style={[styles.durationText, {textAlign: 'left'}]}>
            {props.duration}
          </Text>
          <Text style={[styles.durationText, {textAlign: 'right'}]}>
            {Slider.maximumValue}
          </Text>
        </View>
      </View> */}
      <View style={styles.controllRow}>
        {/* <TouchableOpacity
          onPress={() => TrackPlayer.skipToPrevious()}
          style={styles.prvBtn}>
          <Image
            source={require('../assets/image/prv.png')}
            style={{width: '80%', height: '80%', tintColor: 'white'}}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => TrackPlayer.stop()}
          style={styles.stopBtn}>
          <Image
            source={require('../assets/image/stop.png')}
            style={{width: '80%', height: '80%', tintColor: 'white'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TrackPlayer.play()}
          style={styles.playBtn}>
          <Image
            source={require('../assets/image/play.png')}
            style={{
              width: '80%',
              height: '80%',
              tintColor: 'white',
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TrackPlayer.pause()}
          style={styles.puseBtn}>
          <Image
            source={require('../assets/image/pause.png')}
            style={{width: '80%', height: '80%', tintColor: 'white'}}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => TrackPlayer.skipToNext()}
          style={styles.frwBtn}>
          <Image
            source={require('../assets/image/frw.png')}
            style={{width: '80%', height: '80%', tintColor: 'white'}}
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={() => {
            TrackPlayer.removeUpcomingTracks();
            TrackPlayer.set;
          }}
          style={styles.loopBtn}>
          <Image
            source={require('../assets/image/loop.png')}
            style={{width: '80%', height: '80%', tintColor: 'white'}}
          />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.title}>
        Title: {props.title}
        {'\n'}
        {'\n'}Duration: {props.musicduration}
        {'\n'}
        {'\n'}Music By {props.musicby}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  backgroundImgOpacity: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  seekbarRow: {
    height: 100,
    width: '95%',
    //backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -50,
  },
  controllRow: {
    height: 200,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    //backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playBtn: {
    height: 80,
    width: 80,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 55,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    zIndex: 2,
  },
  prvBtn: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 30,
  },
  frwBtn: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 30,
  },
  puseBtn: {
    height: 30,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 30,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  stopBtn: {
    height: 30,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 30,
    marginRight: 95,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  loopBtn: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 30,
    position: 'absolute',
    bottom: 10,
    left: 35,
  },
  durationContainer: {
    flexDirection: 'row',
  },
  durationText: {
    flex: 0.5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
  },
  AdsContainer: {
    width: 300,
    height: 250,
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 20,
    bottom: 0,
  },
  titleContainer: {
    width: '100%',
    paddingLeft: 10,
    margin: 5,
  },
  title: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    //fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    position: 'relative',
    bottom: 20,
    //marginBottom: 15,
  },
});

export default PlayerPage;
