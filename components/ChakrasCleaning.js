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
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {create} from 'react-test-renderer';
import {WebView} from 'react-native-webview';
import {Content} from 'native-base';
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
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-7969377773326924/6644007547';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function AppBtn() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      style={{width: 100, height: 50, backgroundColor: '#000'}}
      title="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
  );
}

export default class ChakrasCleaning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlIframe: null,
      margin7: 0,
      youtubeheight: 0,
    };
  }
  loadAds() {
    if (interstitial.loaded) {
      interstitial.show();
    } else {
      interstitial.load();
    }
  }
  render() {
    return (
      <>
        <Text style={styles.title}>{Lang.sevenChakrasMantra}</Text>
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
          <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled
            style={{
              ...styles.youtubeWebView,
              ...{height: this.state.youtubeheight, backgroundColor: '#404040'},
            }}
            source={{
              html: this.state.htmlIframe,
            }}
            automaticallyAdjustContentInsets={false}
          />
        </View>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <View
            style={{
              ...styles.btnContainer,
              ...{flexDirection: 'row', justifyContent: 'center'},
            }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();

                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/DXzWGmMz0Dw?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/pCPv9LbH" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/throat.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{...styles.btn, ...{paddingTop: 12}}}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/30i-ze1fysQ?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/qgn8JWQN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/thirdEye.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/84tqM81_XgM?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/VBIzPben" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/solar.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.btnContainer,
              ...{
                marginTop: this.state.margin7,
                alignSelf: 'center',
              },
            }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/idoa6Q_RdAw?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/d5ijtd8W" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/crown.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/0oR9KbyziKE?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/M6EeQsff" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/heart.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{flexDirection: 'row', width: '100%', alignContent: 'center'}}>
          <View
            style={{
              ...styles.btnContainer,
              ...{flexDirection: 'row', justifyContent: 'center'},
            }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/EdZbK62mj3Y?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/woEF3vld" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/root.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.loadAds();
                this.setState({
                  margin7: 20,
                  youtubeheight: 190,
                  //https://www.youtube.com/embed/oc79MKiWgM4?list=PLsuCfYXzi5DJwqWqjqfqHSDqZSUTopgaW
                  htmlIframe: `<iframe width="100%" height="500" src="https://www.namasha.com/v/L88ExOwy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                });
              }}>
              <Image
                source={require('../assets/image/sacral.png')}
                style={styles.btnImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <YouTube
          // videoId="ph5lKkhVcHo" // The YouTube video ID
          playlistId="ph5lKkhVcHo"
          play // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={(e) => this.setState({isReady: true})}
          onChangeState={(e) => this.setState({status: e.state})}
          onChangeQuality={(e) => this.setState({quality: e.quality})}
          onError={(e) => this.setState({error: e.error})}
          style={{alignSelf: 'center', width: 300, height: 190}}
        /> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  chakrasimg: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    marginBottom: 15,
    resizeMode: 'stretch',
  },
  btn: {
    width: 170,
    height: 170,
    // backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    // borderRadius: 50,
    marginLeft: 8,
    marginRight: 8,
    shadowColor: '#000',
    elevation: 7,
    shadowRadius: 10,
  },
  btnContainer: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  btnImage: {
    resizeMode: 'stretch',
    width: '70%',
    height: '100%',
    borderRadius: 5,
  },
  title: {
    margin: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#9900cc',
    fontSize: 19,
    fontFamily: 'timesnewroman',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  youtubeWebView: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
