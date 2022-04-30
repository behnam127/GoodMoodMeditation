/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Linking,
  BackHandler,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  InterstitialAd,
  AdEventType,
  BannerAdSize,
  BannerAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import Spinner from 'react-native-spinkit';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

import axios from 'axios';
import App from '../App';
import {Actions} from 'react-native-router-flux';
import PlayerPage from './PlayerPage';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Sound from 'react-native-sound';
import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCoins from './Header/HeaderCoins';
import {connect} from 'react-redux';
import Slider from '@react-native-community/slider';

//import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-7969377773326924/5455435995';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function Appbtn() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }

      // if (type === 'closed') {
      //   alert('you cant use this section if you skip the video!');
      //   Actions.pop();
      // }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (loaded) {
    rewarded.show();
    rewarded.load();
    console.log(
      'not show 0101010010010010100000101111110101010100101010100101010101',
    );
  } else {
    return null;
  }

  return (
    <TouchableOpacity
      title="Show Rewarded Ad"
      style={styles.btn}
      onPress={() => {
        rewarded.show();
        rewarded.load();
      }}
    />
  );
}

const {width, height} = Dimensions.get('window');
const sliderWidth = width - 120;

class MusicStore2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOnes: [],
      MusicInNature: [],
      RelaxationMusic: [],
      Mantra: [],
      musicurl: null,
      picurl: null,
      title: null,
      musicSecDuration: null,
      musicMinDuration: null,
      musicby: null,
      musicID: null,
      musicurl2: null,
      picurl2: null,
      title2: null,
      musicSecDuration2: null,
      musicMinDuration2: null,
      musicby2: null,
      musicID2: null,
      btnDisable: false,

      displayPlayer: 'none',
      playerLoader: false,
      playDisplay: 'none',
      pauseDisplay: 'none',

      emptyHeart: 'flex',
      heartLike: 'none',
    };
  }

  loadAds() {
    if (rewarded.loaded) {
      rewarded.show();
    } else {
      rewarded.load();
    }
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.player = null;

    this.getLang();

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

    this.getDataNewOnes();
    this.getDataMusicInNature();
    this.getDataRelaxationMusic();
    this.getDataMantra();
  }

  // async sliderinterval() {
  //   await setInterval(() => {
  //     console.log('Slider timerrrrrrr');
  //     if (this.state.musicSecDuration2 > 0) {
  //       this.setState({
  //         musicSecDuration2: musicSecDuration2 - 1,
  //       });
  //       if (musicSecDuration2 == 0) {
  //         this.setState({
  //           musicSecDuration2: 59,
  //           musicMinDuration2: musicMinDuration2 - 1,
  //         });
  //       }
  //     }
  //   }, 1000);
  // }

  async playerAction() {
    this.setState({
      displayPlayer: 'flex',
      musicurl2: this.state.musicurl,
      picurl2: this.state.picurl,
      title2: this.state.title,
      musicSecDuration2: this.state.musicSecDuration,
      musicMinDuration2: this.state.musicMinDuration,
      musicby2: this.state.musicby,
      musicID2: this.state.musicID,
    });
    if (!this.player) {
      this.setState({
        playDisplay: 'none',
        pauseDisplay: 'none',
        playerLoader: true,
        btnDisable: true,
      });

      this.player = await new Sound(this.state.musicurl, null, (e) => {
        if (e) {
          console.log('error loading track:', e);
          ToastAndroid.show('Error !', ToastAndroid.LONG);
        }
      });
      this.playerinterval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.player.isLoaded()) {
          this.setState({
            playDisplay: 'none',
            pauseDisplay: 'flex',
            playerLoader: false,
            btnDisable: false,
          });
          clearInterval(this.playerinterval);
          this.player.play();
        }
      }, 1000);

      this.player.release();
      //this.sliderInterval();
    } else if (this.player.isPlaying() || this.player.isLoaded()) {
      this.player.stop();
      this.player.reset();
      this.player = await new Sound(this.state.musicurl, null, (e) => {
        if (e) {
          console.log('error loading track:', e);
          ToastAndroid.show('Error !', ToastAndroid.LONG);
        }
      });
      this.setState({
        playDisplay: 'none',
        pauseDisplay: 'none',
        playerLoader: true,
        btnDisable: true,
      });
      this.playerinterval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.player.isLoaded()) {
          this.setState({
            playDisplay: 'none',
            pauseDisplay: 'flex',
            playerLoader: false,
            btnDisable: false,
          });
          clearInterval(this.playerinterval);
          this.player.play();
        }
      }, 1000);
      this.player.release();
    } else {
      this.player.stop();
    }
  }

  async getLang() {
    try {
      let lang = await AsyncStorage.getItem('lang');
      if (lang === null) {
        await AsyncStorage.setItem('lang', 'en');
        this.setLang('en');
      } else {
        this.setLang(lang);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getDataNewOnes() {
    axios.get(`https://uncleb.ir/musics/new-ones/newones.json`).then((res1) => {
      this.setState({newOnes: res1.data});
    });
    this.interval = setInterval(
      () =>
        axios
          .get(`https://uncleb.ir/musics/new-ones/newones.json`)
          .then((res1) => {
            this.setState({newOnes: res1.data});
          }),
      300000,
    );
  }

  getDataMusicInNature() {
    axios
      .get(`https://uncleb.ir/musics/music-in-nature/music-in-nature.json`)
      .then((res2) => {
        this.setState({MusicInNature: res2.data});
      });
    this.interval = setInterval(
      () =>
        axios
          .get(`https://uncleb.ir/musics/music-in-nature/music-in-nature.json`)
          .then((res2) => {
            this.setState({MusicInNature: res2.data});
          }),
      300000,
    );
  }

  getDataRelaxationMusic() {
    axios
      .get(`https://uncleb.ir/musics/relaxation-music/relaxationmusic.json`)
      .then((res3) => {
        this.setState({RelaxationMusic: res3.data});
      });
    this.interval = setInterval(
      () =>
        axios
          .get(`https://uncleb.ir/musics/relaxation-music/relaxationmusic.json`)
          .then((res3) => {
            this.setState({RelaxationMusic: res3.data});
          }),
      300000,
    );
  }

  getDataMantra() {
    axios.get(`https://uncleb.ir/musics/mantras/mantras.json`).then((res4) => {
      this.setState({Mantra: res4.data});
    });
    this.interval = setInterval(
      () =>
        axios
          .get(`https://uncleb.ir/musics/mantras/mantras.json`)
          .then((res4) => {
            this.setState({Mantra: res4.data});
          }),
      300000,
    );
  }

  renderNewOnes({item}) {
    return (
      <TouchableOpacity
        disabled={this.state.btnDisable}
        onPress={() => {
          this.playerAction();
          this.loadAds();
        }}
        onPressIn={() => {
          this.setState({
            musicurl: item.musicurl,
            picurl: item.picurl,
            title: item.title,
            musicSecDuration: item.secduration,
            musicMinDuration: item.minduration,
            musicby: item.musicby,
            musicID: item.id,
          });
        }}
        key={item.id}
        style={styles.listItem1}>
        <Image style={styles.listImageTop} source={{uri: item.picurl}} />
        {/* <TouchableOpacity
          onPress={() =>
            this.setState({
              emptyHeart: this.state.emptyHeart == 'none' ? 'flex' : 'none',
              heartLike: this.state.heartLike == 'none' ? 'flex' : 'none',
            })
          }
          style={{position: 'absolute', height: 80, width: 20, zIndex: 15}}>
          <Image
            source={require('../assets/image/heartlike.png')}
            style={{height: 20, width: 20, margin: 10, resizeMode: 'contain'}}
            display={this.state.heartLike}
          />
          <Image
            source={require('../assets/image/emptyheart.png')}
            style={{height: 20, width: 20, margin: 10, resizeMode: 'contain'}}
            display={this.state.emptyHeart}
          />
        </TouchableOpacity> */}

        <View style={styles.playPauseContainer}>
          <Spinner
            isVisible={this.state.playerLoader}
            color="#ccc"
            size={100}
            type="Pulse"
            style={styles.spinner}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '75%',
            borderRadius: 15,
            flexDirection: 'column',
          }}>
          <View style={styles.headerNameTop}>
            <Text style={{color: '#fff', margin: 5}}>
              {Lang.musicTitle}: {item.title}
              {'\n'}
              {'\n'}
              {Lang.musicDuration}: {item.minduration}:{item.secduration}
              {'\n'}
              {'\n'}
              {Lang.musicBy}: {item.musicby}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderMusicInNature({item}) {
    console.log(item);
    return (
      <TouchableOpacity
        disabled={this.state.btnDisable}
        onPress={() => {
          this.playerAction();
          this.loadAds();
        }}
        onPressIn={() => {
          this.setState({
            musicurl: item.musicurl,
            picurl: item.picurl,
            title: item.title,
            musicSecDuration: item.secduration,
            musicMinDuration: item.minduration,
            musicby: item.musicby,
            musicID: item.id,
          });
        }}
        key={item.id}
        style={styles.listItem2}
        blurRadius={90}>
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 20,
            position: 'absolute',
            zIndex: 4,
          }}>
          {/* <BannerAd
            style={{zIndex: 4}}
            unitId={item.tabliq}
            size={BannerAdSize.LARGE_BANNER}
          /> */}
          <Text style={{position: 'absolute', color: '#fff', zIndex: -1}}>
            {item.adsloading}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>
          <Image style={styles.listImage} source={{uri: item.picurl}}></Image>
          <View
            style={{
              position: 'absolute',
              width: '57%',
              height: '100%',
              borderRadius: 15,
              marginLeft: 125,
            }}>
            <Text style={styles.headerName}>
              {Lang.musicTitle}: {item.title}
              {'\n'}
              {Lang.musicDuration}: {item.minduration}:{item.secduration}
              {'\n'}
              {Lang.musicBy}: {item.musicby}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderRelaxationMusic({item}) {
    console.log(item);
    return (
      <TouchableOpacity
        disabled={this.state.btnDisable}
        onPress={() => {
          this.playerAction();
          this.loadAds();
        }}
        onPressIn={() => {
          this.setState({
            musicurl: item.musicurl,
            picurl: item.picurl,
            title: item.title,
            musicSecDuration: item.secduration,
            musicMinDuration: item.minduration,
            musicby: item.musicby,
            musicID: item.id,
          });
        }}
        key={item.id}
        style={styles.listItem3}
        blurRadius={90}>
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 20,
            position: 'absolute',
            zIndex: 4,
          }}>
          {/* <BannerAd unitId={item.tabliq} size={BannerAdSize.LARGE_BANNER} /> */}
          <Text style={{position: 'absolute', color: '#fff', zIndex: -1}}>
            {item.adsloading}
          </Text>
        </View>

        <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
          <Image style={styles.listImage} source={{uri: item.picurl}}></Image>
          <View
            style={{
              position: 'absolute',
              width: '57%',
              height: '100%',
              borderRadius: 15,
              marginLeft: 125,
            }}>
            <Text style={styles.headerName}>
              {Lang.musicTitle}: {item.title}
              {'\n'}
              {Lang.musicDuration}: {item.minduration}:{item.secduration}
              {'\n'}
              {Lang.musicBy}: {item.musicby}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderMantra({item}) {
    // console.log(item);
    return (
      <TouchableOpacity
        disabled={this.state.btnDisable}
        onPress={() => {
          this.playerAction();
          this.loadAds();
        }}
        onPressIn={() => {
          this.setState({
            musicurl: item.musicurl,
            picurl: item.picurl,
            title: item.title,
            musicSecDuration: item.secduration,
            musicMinDuration: item.minduration,
            musicby: item.musicby,
            musicID: item.id,
          });
        }}
        key={item.id}
        style={styles.listItem3}
        blurRadius={90}>
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 20,
            position: 'absolute',
            zIndex: 4,
          }}>
          {/* <BannerAd unitId={item.tabliq} size={BannerAdSize.LARGE_BANNER} /> */}
          <Text style={{position: 'absolute', color: '#fff', zIndex: -1}}>
            {item.adsloading}
          </Text>
        </View>

        <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
          <Image style={styles.listImage} source={{uri: item.picurl}}></Image>
          <View
            style={{
              position: 'absolute',
              width: '57%',
              height: '100%',
              borderRadius: 15,
              marginLeft: 125,
            }}>
            <Text style={styles.headerName}>
              {Lang.musicTitle}: {item.title}
              {'\n'}
              {Lang.musicDuration}: {item.minduration}:{item.secduration}
              {'\n'}
              {Lang.musicBy}: {item.musicby}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* <Image
          source={require('../assets/image/backg.png')}
          style={{
            resizeMode: 'cover',
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
        /> */}

        <ScrollView>
          {/* <Appbtn /> */}
          <Text style={styles.listItemTitle}>{Lang.new}</Text>
          <FlatList
            style={{height: 270}}
            data={this.state.newOnes}
            inverted={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderNewOnes.bind(this)}
            keyExtractor={(item) => item.id}
          />
          {/* <HeaderCoins coins={this.props.coins} /> */}
          <Text style={styles.listItemTitle}>{Lang.natureMusic}</Text>
          <FlatList
            style={{height: 130}}
            data={this.state.MusicInNature}
            inverted={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderMusicInNature.bind(this)}
            keyExtractor={(item) => item.id}
          />

          <Text style={styles.listItemTitle}>{Lang.relaxationMusic}</Text>
          <FlatList
            style={{height: 130}}
            data={this.state.RelaxationMusic}
            inverted={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderRelaxationMusic.bind(this)}
            keyExtractor={(item) => item.id}
          />

          <Text style={styles.listItemTitle}>{Lang.mantra}</Text>
          <FlatList
            style={{height: 130}}
            data={this.state.Mantra}
            inverted={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderMantra.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <View
          style={{
            ...styles.bottomPlayerContainer,
            display: this.state.displayPlayer,
          }}>
          <Image
            style={styles.bottomPlayerImage}
            source={{uri: this.state.picurl2}}
          />
          <View style={styles.playPauseContainer}>
            <Spinner
              isVisible={this.state.playerLoader}
              color="#ccc"
              size={40}
              type="Pulse"
              style={styles.spinner}
            />
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: this.state.playDisplay,
              }}
              onPress={() => {
                this.player.play();
                this.setState({playDisplay: 'none', pauseDisplay: 'flex'});
              }}>
              <Image
                style={{...styles.playBtn, display: this.state.playDisplay}}
                source={require('../assets/image/play.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: this.state.pauseDisplay,
              }}
              onPress={() => {
                this.player.pause();
                this.setState({playDisplay: 'flex', pauseDisplay: 'none'});
              }}>
              <Image
                style={{
                  ...styles.pauseBtn,
                  display: this.state.pauseDisplay,
                }}
                source={require('../assets/image/pause.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: sliderWidth}}>
            {/* <Slider
              style={styles.slider}
              maximumTrackTintColor={'#fff'}
              minimumTrackTintColor={'aqua'}
              thumbTintColor={'lightblue'}
            /> */}

            <Text style={styles.bottomPlayerText}>
              {this.state.musicMinDuration2}:{this.state.musicSecDuration2}
            </Text>
            <Text style={styles.bottomPlayerText}>{this.state.title2}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch({type: 'COINS_INCREMENT'}),
    onDecrement: () => dispatch({type: 'COINS_DECREMENT'}),
  };
}

function mapStateToProps(state) {
  return {
    coins: state.coins,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicStore2);

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ccccff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    zIndex: 4,
  },
  btn: {
    display: 'none',
  },
  listItem1: {
    height: 250,
    width: 300,
    margin: 10,
    marginBottom: 10,
    padding: 2,
    // backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    // shadowColor: '#000',
    // elevation: 10,
  },
  listItem2: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    // backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    // shadowColor: '#000',
    // elevation: 10,
  },
  listItem3: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    // backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    // shadowColor: '#000',
    // elevation: 10,
  },
  listItem4: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    // backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    // shadowColor: '#000',
    // elevation: 10,
  },
  listItemTitle: {
    color: '#9900cc',
    fontSize: 18,
    marginBottom: 10,
    margin: 20,
    alignSelf: 'center',
    width: '85%',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    padding: 3,
  },
  headerNameTop: {
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
    fontSize: 12,
    margin: 0,
    fontWeight: '400',
    color: '#fff',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: '105%',
    height: '70%',
    zIndex: 3,
  },
  headerName: {
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: 190,
    height: 96,
    zIndex: 3,
  },
  listImageTop: {
    backgroundColor: '#505050',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 2,
  },
  listImage: {
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '40%',
    height: '100%',
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    zIndex: 2,
  },

  text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  spinner: {
    position: 'absolute',
    top: 10,
    left: 5,
    zIndex: 10,
    bottom: 25,
  },
  playPauseContainer: {
    width: 50,
    height: '100%',
  },
  playBtn: {
    width: '70%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    tintColor: '#fff',
    top: 0,
  },
  pauseBtn: {
    width: '70%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    tintColor: '#fff',
    top: 0,
  },
  bottomPlayerContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#202020',
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  bottomPlayerImage: {
    height: 60,
    width: 60,
  },
  bottomPlayerText: {
    color: '#fff',
    marginLeft: 5,
  },
  slider: {
    width: '100%',
    height: 15,
    paddingVertical: 5,
  },
});
