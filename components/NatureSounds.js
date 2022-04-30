/* eslint-disable prettier/prettier */
import {
  requireNativeComponent,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Platform,
  AlertIOS,
  Dimensions,
} from 'react-native';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import NatureSoundsBtn from './NatureSoundsBtn';
import Sound from 'react-native-sound';
import Spinner from 'react-native-spinkit';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  AdEventType,
  BannerAdSize,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';

import {Lang} from './Lang';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7969377773326924/2227406969';
const {width} = Dimensions.get('window');
const NatureSoundBtnWidth = width * 0.195;

class NatureSounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rain1Iconcolor: '#505050',
      rain2Iconcolor: '#505050',
      rain3Iconcolor: '#505050',
      rain4Iconcolor: '#505050',
      rain_rumbles1Iconcolor: '#505050',
      rain_rumbles2Iconcolor: '#505050',
      birds1Iconcolor: '#505050',
      birds2Iconcolor: '#505050',
      fire1Iconcolor: '#505050',
      fire2Iconcolor: '#505050',
      wave1Iconcolor: '#505050',
      wave2Iconcolor: '#505050',
      wave3Iconcolor: '#505050',
      wave4Iconcolor: '#505050',
      wind1Iconcolor: '#505050',
      wind2Iconcolor: '#505050',
      waterfall1Iconcolor: '#505050',
      waterfall2Iconcolor: '#505050',
      singingbowlIconcolor: '#505050',
      nightIconcolor: '#505050',
      //loadingGif: "rgba(0,0,0,0.0)",
      //visible: false,
      rain1Loader: false,
      rain2Loader: false,
      rain3Loader: false,
      rain4Loader: false,
      rain_rumbles1Loader: false,
      rain_rumbles2Loader: false,
      birds1Loader: false,
      birds2Loader: false,
      fire1Loader: false,
      fire2Loader: false,
      wave1Loader: false,
      wave2Loader: false,
      wave3Loader: false,
      wave4Loader: false,
      wind1Loader: false,
      wind2Loader: false,
      waterfall1Loader: false,
      waterfall2Loader: false,
      singingbowlLoader: false,
      nightLoader: false,
    };
  }
  componentDidMount() {
    this.rain1 = null;
    this.rain2 = null;
    this.rain3 = null;
    this.rain4 = null;
    this.birds1 = null;
    this.birds2 = null;
    this.rain_rumbles1 = null;
    this.rain_rumbles2 = null;
    this.wave1 = null;
    this.wave2 = null;
    this.wave3 = null;
    this.wave4 = null;
    this.waterfall1 = null;
    this.waterfall2 = null;
    this.fire1 = null;
    this.fire2 = null;
    this.wind1 = null;
    this.wind2 = null;
    this.singingbowl = null;
    this.night = null;
  }

  // UNSAFE_componentWillMount(){
  //   setInterval(() => {
  //     this.setState({
  //       loadingGif: !this.state.loadingGif
  //     });
  //   }, 1000);
  // }

  async rain1Changer() {
    if (!this.rain1) {
      this.setState({rain1Iconcolor: '#000', rain1Loader: true});

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }

      this.rain1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain1.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain1.isLoaded()) {
          this.setState({rain1Loader: false});
          clearInterval(this.rain1interval);
          this.rain1.play();
          this.rain1.setNumberOfLoops(1000);
          this.setState({rain1Iconcolor: '#00f'});
        }
      }, 1000);

      this.rain1.release();
    } else {
      if (this.rain1.isPlaying()) {
        this.setState({rain1Iconcolor: '#000'});
        this.rain1.stop();
      } else {
        this.rain1.play();
        this.rain1.setNumberOfLoops(1000);
        if (this.rain1.isLoaded()) {
          this.setState({rain1Iconcolor: '#00f'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async rain2Changer() {
    if (!this.rain2) {
      this.setState({rain2Iconcolor: '#000', rain2Loader: true});

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.rain2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain2.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain2.isLoaded()) {
          this.setState({rain2Loader: false});
          clearInterval(this.rain2interval);
          this.rain2.play();
          this.rain2.setNumberOfLoops(1000);
          this.setState({rain2Iconcolor: '#00f'});
        }
      }, 1000);
      this.rain2.release();
    } else {
      if (this.rain2.isPlaying()) {
        this.setState({rain2Iconcolor: '#000'});
        this.rain2.stop();
      } else {
        this.rain2.play();
        this.rain2.setNumberOfLoops(1000);
        if (this.rain2.isLoaded()) {
          this.setState({rain2Iconcolor: '#00f'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async rain3Changer() {
    if (!this.rain3) {
      this.setState({rain3Iconcolor: '#000', rain3Loader: true});

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.rain3 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain3.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain3interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain3.isLoaded()) {
          this.setState({rain3Loader: false});
          clearInterval(this.rain3interval);
          this.rain3.play();
          this.rain3.setNumberOfLoops(1000);
          this.setState({rain3Iconcolor: '#00f'});
        }
      }, 1000);
      this.rain3.release();
    } else {
      if (this.rain3.isPlaying()) {
        this.setState({rain3Iconcolor: '#000'});
        this.rain3.stop();
      } else {
        this.rain3.play();
        this.rain3.setNumberOfLoops(1000);
        if (this.rain3.isLoaded()) {
          this.setState({rain3Iconcolor: '#00f'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async rain4Changer() {
    if (!this.rain4) {
      this.setState({rain4Iconcolor: '#000', rain4Loader: true});

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.rain4 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain4.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain4interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain4.isLoaded()) {
          this.setState({rain4Loader: false});
          clearInterval(this.rain4interval);
          this.rain4.play();
          this.rain4.setNumberOfLoops(1000);
          this.setState({rain4Iconcolor: '#00f'});
        }
      }, 1000);
      this.rain4.release();
    } else {
      if (this.rain4.isPlaying()) {
        this.setState({rain4Iconcolor: '#000'});
        this.rain4.stop();
      } else {
        this.rain4.play();
        this.rain4.setNumberOfLoops(1000);
        if (this.rain4.isLoaded()) {
          this.setState({rain4Iconcolor: '#00f'});
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async rain_rumbles1Changer() {
    if (!this.rain_rumbles1) {
      this.setState({
        rain_rumbles1Iconcolor: '#000',
        rain_rumbles1Loader: true,
      });

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.rain_rumbles1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain_rumbles1.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain_rumbles1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain_rumbles1.isLoaded()) {
          this.setState({rain_rumbles1Loader: false});
          clearInterval(this.rain_rumbles1interval);
          this.rain_rumbles1.play();
          this.rain_rumbles1.setNumberOfLoops(1000);
          this.setState({rain_rumbles1Iconcolor: '#adf8ff'});
        }
      }, 1000);
      this.rain_rumbles1.release();
    } else {
      if (this.rain_rumbles1.isPlaying()) {
        this.setState({rain_rumbles1Iconcolor: '#000'});
        this.rain_rumbles1.stop();
      } else {
        this.rain_rumbles1.play();
        this.rain_rumbles1.setNumberOfLoops(1000);
        if (this.rain_rumbles1.isLoaded()) {
          this.setState({rain_rumbles1Iconcolor: '#adf8ff'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async rain_rumbles2Changer() {
    if (!this.rain_rumbles2) {
      this.setState({
        rain_rumbles2Iconcolor: '#000',
        rain_rumbles2Loader: true,
      });
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.rain_rumbles2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/rain_rumbles2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.rain_rumbles2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.rain_rumbles2.isLoaded()) {
          this.setState({rain_rumbles2Loader: false});
          clearInterval(this.rain_rumbles2interval);
          this.rain_rumbles2.play();
          this.rain_rumbles2.setNumberOfLoops(1000);
          this.setState({rain_rumbles2Iconcolor: '#adf8ff'});
        }
      }, 1000);
      this.rain_rumbles2.release();
    } else {
      if (this.rain_rumbles2.isPlaying()) {
        this.setState({rain_rumbles2Iconcolor: '#000'});
        this.rain_rumbles2.stop();
      } else {
        this.rain_rumbles2.play();
        this.rain_rumbles2.setNumberOfLoops(1000);
        if (this.rain_rumbles2.isLoaded()) {
          this.setState({rain_rumbles2Iconcolor: '#adf8ff'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async birds1Changer() {
    if (!this.birds1) {
      this.setState({birds1Iconcolor: '#000', birds1Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.birds1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/birds1.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.birds1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.birds1.isLoaded()) {
          this.setState({birds1Loader: false});
          clearInterval(this.birds1interval);
          this.birds1.play();
          this.birds1.setNumberOfLoops(1000);
          this.setState({birds1Iconcolor: '#a6ff00'});
        }
      }, 1000);
      this.birds1.release();
    } else {
      if (this.birds1.isPlaying()) {
        this.setState({birds1Iconcolor: '#000'});
        this.birds1.stop();
      } else {
        this.birds1.play();
        this.birds1.setNumberOfLoops(1000);
        if (this.birds1.isLoaded()) {
          this.setState({birds1Iconcolor: '#a6ff00'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async birds2Changer() {
    if (!this.birds2) {
      this.setState({birds2Iconcolor: '#000', birds2Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.birds2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/birds2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.birds2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.birds2.isLoaded()) {
          this.setState({birds2Loader: false});
          clearInterval(this.birds2interval);
          this.birds2.play();
          this.birds2.setNumberOfLoops(1000);
          this.setState({birds2Iconcolor: '#a6ff00'});
        }
      }, 1000);
      this.birds2.release();
    } else {
      if (this.birds2.isPlaying()) {
        this.setState({birds2Iconcolor: '#000'});
        this.birds2.stop();
      } else {
        this.birds2.play();
        this.birds2.setNumberOfLoops(1000);
        if (this.birds2.isLoaded()) {
          this.setState({birds2Iconcolor: '#a6ff00'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async fire1Changer() {
    if (!this.fire1) {
      this.setState({fire1Iconcolor: '#000', fire1Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.fire1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/fire1.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.fire1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.fire1.isLoaded()) {
          this.setState({fire1Loader: false});
          clearInterval(this.fire1interval);
          this.fire1.play();
          this.fire1.setNumberOfLoops(1000);
          this.setState({fire1Iconcolor: '#ff8400'});
        }
      }, 1000);
      this.fire1.release();
    } else {
      if (this.fire1.isPlaying()) {
        this.setState({fire1Iconcolor: '#000'});
        this.fire1.stop();
      } else {
        this.fire1.play();
        this.fire1.setNumberOfLoops(1000);
        if (this.fire1.isLoaded()) {
          this.setState({fire1Iconcolor: '#ff8400'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async fire2Changer() {
    if (!this.fire2) {
      this.setState({fire2Iconcolor: '#000', fire2Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.fire2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/fire2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.fire2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.fire2.isLoaded()) {
          this.setState({fire2Loader: false});
          clearInterval(this.fire2interval);
          this.fire2.play();
          this.fire2.setNumberOfLoops(1000);
          this.setState({fire2Iconcolor: '#ff8400'});
        }
      }, 1000);
      this.fire2.release();
    } else {
      if (this.fire2.isPlaying()) {
        this.setState({fire2Iconcolor: '#000'});
        this.fire2.stop();
      } else {
        this.fire2.play();
        this.fire2.setNumberOfLoops(1000);
        if (this.fire2.isLoaded()) {
          this.setState({fire2Iconcolor: '#ff8400'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async waterfall1Changer() {
    if (!this.waterfall1) {
      this.setState({waterfall1Iconcolor: '#000', waterfall1Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.waterfall1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/waterfall1.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.waterfall1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.waterfall1.isLoaded()) {
          this.setState({waterfall1Loader: false});
          clearInterval(this.waterfall1interval);
          this.waterfall1.play();
          this.waterfall1.setNumberOfLoops(1000);
          this.setState({waterfall1Iconcolor: '#00c8ff'});
        }
      }, 1000);
      this.waterfall1.release();
    } else {
      if (this.waterfall1.isPlaying()) {
        this.setState({waterfall1Iconcolor: '#000'});
        this.waterfall1.stop();
      } else {
        this.waterfall1.play();
        this.waterfall1.setNumberOfLoops(1000);
        if (this.waterfall1.isLoaded()) {
          this.setState({waterfall1Iconcolor: '#00c8ff'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async waterfall2Changer() {
    if (!this.waterfall2) {
      this.setState({waterfall2Iconcolor: '#000', waterfall2Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.waterfall2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/waterfall2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.waterfall2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.waterfall2.isLoaded()) {
          this.setState({waterfall2Loader: false});
          clearInterval(this.waterfall2interval);
          this.waterfall2.play();
          this.waterfall2.setNumberOfLoops(1000);
          this.setState({waterfall2Iconcolor: '#00c8ff'});
        }
      }, 1000);
      this.waterfall2.release();
    } else {
      if (this.waterfall2.isPlaying()) {
        this.setState({waterfall2Iconcolor: '#000'});
        this.waterfall2.stop();
      } else {
        this.waterfall2.play();
        this.waterfall2.setNumberOfLoops(1000);
        if (this.waterfall2.isLoaded()) {
          this.setState({waterfall2Iconcolor: '#00c8ff'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wave1Changer() {
    if (!this.wave1) {
      this.setState({wave1Iconcolor: '#000', wave1Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wave1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wave1.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wave1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wave1.isLoaded()) {
          this.setState({wave1Loader: false});
          clearInterval(this.wave1interval);
          this.wave1.play();
          this.wave1.setNumberOfLoops(1000);
          this.setState({wave1Iconcolor: '#00ffbb'});
        }
      }, 1000);
      this.wave1.release();
    } else {
      if (this.wave1.isPlaying()) {
        this.setState({wave1Iconcolor: '#000'});
        this.wave1.stop();
      } else {
        this.wave1.play();
        this.wave1.setNumberOfLoops(1000);
        if (this.wave1.isLoaded()) {
          this.setState({wave1Iconcolor: '#00ffbb'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wave2Changer() {
    if (!this.wave2) {
      this.setState({wave2Iconcolor: '#000', wave2Loader: true});

      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wave2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wave2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wave2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wave2.isLoaded()) {
          this.setState({wave2Loader: false});
          clearInterval(this.wave2interval);
          this.wave2.play();
          this.wave2.setNumberOfLoops(1000);
          this.setState({wave2Iconcolor: '#00ffbb'});
        }
      }, 1000);
      this.wave2.release();
    } else {
      if (this.wave2.isPlaying()) {
        this.setState({wave2Iconcolor: '#000'});
        this.wave2.stop();
      } else {
        this.wave2.play();
        this.wave2.setNumberOfLoops(1000);
        if (this.wave2.isLoaded()) {
          this.setState({wave2Iconcolor: '#00ffbb'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wave3Changer() {
    if (!this.wave3) {
      this.setState({wave3Iconcolor: '#000', wave3Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wave3 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wave3.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wave3interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wave3.isLoaded()) {
          this.setState({wave3Loader: false});
          clearInterval(this.wave3interval);
          this.wave3.play();
          this.wave3.setNumberOfLoops(1000);
          this.setState({wave3Iconcolor: '#00ffbb'});
        }
      }, 1000);
      this.wave3.release();
    } else {
      if (this.wave3.isPlaying()) {
        this.setState({wave3Iconcolor: '#000'});
        this.wave3.stop();
      } else {
        this.wave3.play();
        this.wave3.setNumberOfLoops(1000);
        if (this.wave3.isLoaded()) {
          this.setState({wave3Iconcolor: '#00ffbb'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wave4Changer() {
    if (!this.wave4) {
      this.setState({wave4Iconcolor: '#000', wave4Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wave4 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wave4.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wave4interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wave4.isLoaded()) {
          this.setState({wave4Loader: false});
          clearInterval(this.wave4interval);
          this.wave4.play();
          this.wave4.setNumberOfLoops(1000);
          this.setState({wave4Iconcolor: '#00ffbb'});
        }
      }, 1000);
      this.wave4.release();
    } else {
      if (this.wave4.isPlaying()) {
        this.setState({wave4Iconcolor: '#000'});
        this.wave4.stop();
      } else {
        this.wave4.play();
        this.wave4.setNumberOfLoops(1000);
        if (this.wave4.isLoaded()) {
          this.setState({wave4Iconcolor: '#00ffbb'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wind1Changer() {
    if (!this.wind1) {
      this.setState({wind1Iconcolor: '#000', wind1Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wind1 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wind1.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wind1interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wind1.isLoaded()) {
          this.setState({wind1Loader: false});
          clearInterval(this.wind1interval);
          this.wind1.play();
          this.wind1.setNumberOfLoops(1000);
          this.setState({wind1Iconcolor: '#d4d3cd'});
        }
      }, 1000);
      this.wind1.release();
    } else {
      if (this.wind1.isPlaying()) {
        this.setState({wind1Iconcolor: '#000'});
        this.wind1.stop();
      } else {
        this.wind1.play();
        this.wind1.setNumberOfLoops(1000);
        if (this.wind1.isLoaded()) {
          this.setState({wind1Iconcolor: '#d4d3cd'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async wind2Changer() {
    if (!this.wind2) {
      this.setState({wind2Iconcolor: '#000', wind2Loader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.wind2 = await new Sound(
        'https://uncleb.ir/meditaionwaves/wind2.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.wind2interval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.wind2.isLoaded()) {
          this.setState({wind2Loader: false});
          clearInterval(this.wind2interval);
          this.wind2.play();
          this.wind2.setNumberOfLoops(1000);
          this.setState({wind2Iconcolor: '#d4d3cd'});
        }
      }, 1000);
      this.wind2.release();
    } else {
      if (this.wind2.isPlaying()) {
        this.setState({wind2Iconcolor: '#000'});
        this.wind2.stop();
      } else {
        this.wind2.play();
        this.wind2.setNumberOfLoops(1000);
        if (this.wind2.isLoaded()) {
          this.setState({wind2Iconcolor: '#d4d3cd'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async singingbowlChanger() {
    if (!this.singingbowl) {
      this.setState({singingbowlIconcolor: '#000', singingbowlLoader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.singingbowl = await new Sound(
        'https://uncleb.ir/meditaionwaves/singingbowl.mp4',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.singingbowlinterval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.singingbowl.isLoaded()) {
          this.setState({singingbowlLoader: false});
          clearInterval(this.singingbowlinterval);
          this.singingbowl.play();
          this.singingbowl.setNumberOfLoops(1000);
          this.setState({singingbowlIconcolor: '#cfa900'});
        }
      }, 1000);
      this.singingbowl.release();
    } else {
      if (this.singingbowl.isPlaying()) {
        this.setState({singingbowlIconcolor: '#000'});
        this.singingbowl.stop();
      } else {
        this.singingbowl.play();
        this.singingbowl.setNumberOfLoops(1000);
        if (this.singingbowl.isLoaded()) {
          this.setState({singingbowlIconcolor: '#cfa900'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  async nightChanger() {
    if (!this.night) {
      this.setState({nightIconcolor: '#000', nightLoader: true});
      if (Platform.OS === 'android') {
        ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(Lang.downloadingSounds);
      }
      this.night = await new Sound(
        'https://uncleb.ir/meditaionwaves/night.mp3',
        null,
        (e) => {
          if (e) {
            console.log('error loading track:', e);
            ToastAndroid.show(Lang.ErrorLoadingSound, ToastAndroid.LONG);
          }
        },
      );
      this.nightinterval = await setInterval(() => {
        console.log('timerrrrrrr');
        if (this.night.isLoaded()) {
          this.setState({nightLoader: false});
          clearInterval(this.nightinterval);
          this.night.play();
          this.night.setNumberOfLoops(1000);
          this.setState({nightIconcolor: '#ffffcc'});
        }
      }, 1000);
      this.night.release();
    } else {
      if (this.night.isPlaying()) {
        this.setState({nightIconcolor: '#000'});
        this.night.stop();
      } else {
        this.night.play();
        this.night.setNumberOfLoops(1000);
        if (this.night.isLoaded()) {
          this.setState({nightIconcolor: '#ffffcc'});
        } else {
          this.setState({loadingGif: true});
          if (Platform.OS === 'android') {
            ToastAndroid.show(Lang.downloadingSounds, ToastAndroid.LONG);
          } else {
            AlertIOS.alert(Lang.downloadingSounds);
          }
        }
      }
    }
  }

  // loading(){
  //   if(this.state.loadingGif){
  //     return <Image
  //     source={require('./../assets/image/spiner.gif')}
  //     style={{
  //       position: 'absolute',
  //       justifyContent: 'center',
  //       alignSelf: 'center',
  //       height: 60,
  //       width: 60,
  //       zIndex: 10,
  //       marginTop: 100,
  //     }}
  //   />
  //   }
  // }

  render() {
    //const { loadingGif } = this.state;
    return (
      <SafeAreaView>
        <View
          style={styles.natureSoundsRowContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain1.png')}
                style={{
                  tintColor: this.state.rain1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
              {/* <Image
                source={require('../assets/image/nature-icon/spiner.gif')}
                
                style={{
                  tintColor: this.state.loadingGif,
                  ...styles.playImg,...{position: 'absolute',alignSelf:'center'}
                }}
              /> */}
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain2.webp')}
                style={{
                  tintColor: this.state.rain2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain3Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain3.png')}
                style={{
                  tintColor: this.state.rain3Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain3Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain</Text> */}
          </View>

          <View style={{marginTop: 10, alignItems: 'center'}}>
            {/* <BannerAd
                unitId={'ca-app-pub-7969377773326924/2227406969'}
                size={BannerAdSize.BANNER}
              /> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain4Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain4.jpg')}
                style={{
                  tintColor: this.state.rain4Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain4Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain</Text> */}
          </View>
        </View>

        <View
          style={styles.natureSoundsRowContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginTop: 10, alignItems: 'center'}}>
            {/* <BannerAd
              unitId={'ca-app-pub-7969377773326924/2227406969'}
              size={BannerAdSize.BANNER}
            /> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.birds1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/birds1.png')}
                style={{
                  tintColor: this.state.birds1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.birds1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Birds</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.birds2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/birds2.png')}
                style={{
                  tintColor: this.state.birds2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.birds2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Birds</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.waterfall1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/waterfall1.png')}
                style={{
                  tintColor: this.state.waterfall1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.waterfall1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Waterfall</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.waterfall2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/waterfall2.png')}
                style={{
                  tintColor: this.state.waterfall2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.waterfall2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Waterfall</Text> */}
          </View>
        </View>

        <View
          style={styles.natureSoundsRowContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.fire1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/fire1.jpg')}
                style={{
                  tintColor: this.state.fire1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.fire1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Fire</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.fire2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/fire2.png')}
                style={{
                  tintColor: this.state.fire2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.fire2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Fire</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain_rumbles1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain_thunder1.png')}
                style={{
                  tintColor: this.state.rain_rumbles1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain_rumbles1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain and Rumbles</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.rain_rumbles2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/rain_thunder2.png')}
                style={{
                  tintColor: this.state.rain_rumbles2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.rain_rumbles2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Rain and Rumbles</Text> */}
          </View>
        </View>

        <View
          style={styles.natureSoundsRowContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wave1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wave1.png')}
                style={{
                  tintColor: this.state.wave1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wave1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wave</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wave2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wave2.webp')}
                style={{
                  tintColor: this.state.wave2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wave2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wave</Text> */}
          </View>

          <View style={{marginTop: 10, alignItems: 'center'}}>
            {/* <BannerAd
              unitId={'ca-app-pub-7969377773326924/2227406969'}
              size={BannerAdSize.BANNER}
            /> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wave3Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wave3.png')}
                style={{
                  tintColor: this.state.wave3Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wave3Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wave</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wave4Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wave4.png')}
                style={{
                  tintColor: this.state.wave4Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wave4Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wave</Text> */}
          </View>
        </View>

        <View
          style={styles.natureSoundsRowContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wind1Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wind1.png')}
                style={{
                  tintColor: this.state.wind1Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wind1Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wind</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.wind2Changer();
              }}>
              <Image
                source={require('../assets/image/nature-icon/wind2.jpg')}
                style={{
                  tintColor: this.state.wind2Iconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.wind2Loader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Wind</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.singingbowlChanger();
              }}>
              <Image
                source={require('../assets/image/nature-icon/singingbowl.png')}
                style={{
                  tintColor: this.state.singingbowlIconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.singingbowlLoader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>Singingbowl</Text> */}
          </View>

          <View style={styles.rows}>
            <TouchableOpacity
              underlayColor="#989898"
              style={styles.natureSoundsbtn}
              onPress={() => {
                this.nightChanger();
              }}>
              <Image
                source={require('../assets/image/nature-icon/night.png')}
                style={{
                  tintColor: this.state.nightIconcolor,
                  ...styles.playImg,
                }}
              />
              <Spinner
                isVisible={this.state.nightLoader}
                color="#ccccff"
                size={55}
                type="Circle"
                style={styles.spinner}
              />
            </TouchableOpacity>
            {/* <Text style={styles.natureSoundsbtnTxt}>night</Text> */}
          </View>
        </View>

        <View style={{marginTop: 10, alignItems: 'center'}}>
          {/* <BannerAd
              unitId={'ca-app-pub-7969377773326924/2227406969'}
              size={BannerAdSize.BANNER}
            /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#303030',
  },

  NatureSoundsContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#000',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wavesBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  playImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  playBG: {
    width: 240,
    height: 200,
    marginLeft: -80,
    top: -18,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  seekbar: {
    width: '70%',
    height: 30,
    position: 'absolute',
    left: 70,
    top: 60,
  },
  weaveName: {
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
    marginLeft: 90,
    textShadowColor: '#fff',
    textShadowRadius: 20,
    textShadowOffset: {width: -1, height: 1},
  },

  natureSoundsRowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  natureContainer: {
    backgroundColor: '#181818',
    width: '100%',
    height: '100%',
    color: '#fff',
  },

  natureSoundsbtn: {
    backgroundColor: '#909090',
    width: NatureSoundBtnWidth,
    height: NatureSoundBtnWidth,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  natureSoundsRows: {
    height: 130,
    borderBottomColor: '#303030',
    borderBottomWidth: 2,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    flexDirection: 'row',
    color: '#fff',
  },
  natureSoundsbtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default NatureSounds;
