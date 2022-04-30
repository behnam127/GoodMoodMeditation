/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {PropTypes, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  useState,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
  Button,
  NativeModules,
} from 'react-native';
import Modal from 'react-native-modal';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAdSize,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Helper from '../components/lib/Helper';
import {Lang} from './Lang';
import {Actions} from 'react-native-router-flux';
import RNRestart from 'react-native-restart';
import HeaderCoins from './Header/HeaderCoins';
import {Store} from './ReduxStates/Store';
import {createStore} from 'redux';
import {connect} from 'react-redux';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isV: false,
      lang: null,
      languageKeys: [
        {key: 'en', title: 'English'},
        {key: 'fa', title: 'فارسی - Persian'},
        {key: 'ar', title: 'Arabic(comming soon)'},
        {key: 'fr', title: 'French(comming soon)'},
        {key: 'sp', title: 'Spanish(comming soon)'},
        {key: 'ge', title: 'German(comming soon)'},
        {key: 'it', title: 'Italian(comming soon)'},
        {key: 'in', title: 'Indian(comming soon)'},
        {key: 'ch', title: 'Chinese(comming soon)'},
        {key: 'ja', title: 'Japanese(comming soon)'},
        {key: 'ko', title: 'Korean(comming soon)'},
      ],
    };
  }

  componentDidMount() {
    this.getLang();
    //this.renderLanguageKeys();

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
    const {count} = this.props;
    return (
      <SafeAreaView style={StyleSheet.container}>
        {/* <HeaderCoins coins={this.props.coins} /> */}
        <Modal
          backdropColor={'rgba(0,0,0,0.9)'}
          backdropTransitionInTiming={2}
          isVisible={this.state.isV}>
          <View style={{flex: 1}}>
            <Text style={styles.modalTitle}>Selet your Language :</Text>
            <ScrollView>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  this.setLang('en');
                  this.setState({isV: false});
                  // Actions.SetLang();
                  // NativeModules.DevSettings.reload();
                  RNRestart.Restart();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/en.png')}
                />
                <Text>English</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  this.setLang('fa');
                  this.setState({isV: false});
                  // Actions.SetLang();
                  // NativeModules.DevSettings.reload();
                  RNRestart.Restart();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/fa.png')}
                />
                <Text>فارسی - Persian</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('ar');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/ar.png')}
                />
                <Text>Arabic(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('fr');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/fr.png')}
                />
                <Text>French(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('sp');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/sp.png')}
                />
                <Text>Spanish(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('ge');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/ge.png')}
                />
                <Text>German(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('it');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/it.png')}
                />
                <Text>Italian(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('in');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/in.png')}
                />
                <Text>Indian(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('ch');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/ch.png')}
                />
                <Text>Chinese(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('ja');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/ja.png')}
                />
                <Text>Japanese(Comming Soon)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // this.setLang('ko');
                  // this.setState({isV: false});
                  // NativeModules.DevSettings.reload();
                }}>
                <Image
                  style={styles.modalBtnFlag}
                  source={require('../assets/image/flags/ko.png')}
                />
                <Text>Korean(Comming Soon)</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCanselBtn}
              onPress={() => this.setState({isV: false})}>
              <Text>Cansel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Image
          source={require('../assets/image/setting.jpg')}
          style={styles.headerimg}
        />
        <View style={styles.divider}></View>

        <ScrollView style={styles.scroll}>
          {/* <Text>{t('wtopic')}</Text> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.setState({isV: true})}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/language.png')}
                style={styles.icons}
              />
              <Text style={styles.txt}>{Lang.language}</Text>
              {/* {this.renderLanguageKeys()} */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Linking.openURL('https://uncleb.ir');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/aboutus.jpg')}
                style={styles.icons}
              />
              <Text style={styles.txt}>{Lang.about}</Text>
              {/* {this.renderLanguageKeys()} */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Linking.openURL('https://instagram.com/meditation_waves');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/insta.png')}
                style={styles.icons}
              />
              {/* اینستاگرام */}
              <Text style={styles.txt}>{Lang.insta}</Text>
              {/* {this.renderLanguageKeys()} */}
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Linking.openURL('https://facebook.com/intelligencewaves');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/facebook.webp')}
                style={styles.icons}
              />
              <Text style={styles.txt}>Facebook</Text>
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.btn}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/Twitter.png')}
                style={styles.icons}
              />
              <Text style={styles.txt}>Twitter</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              Share.share({
                title: 'Share Our App',
                message: 'https://uncleb.ir',
                // or
                // url: ,
              })
            }>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/share.png')}
                style={styles.icons}
              />
              {/* این اپ را با دوستان خود به اشتراک بگذارید */}
              <Text style={styles.txt}>{Lang.share}</Text>
              {/* {this.renderLanguageKeys()} */}
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => Actions.CounterPage()}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/coins.png')}
                style={styles.icons}
              />
              <Text style={styles.txt}>Make some money</Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowColor: '#000',
            elevation: 5,
          }}>
          {/* <BannerAd
            unitId={'ca-app-pub-7969377773326924/2967883776'}
            size={BannerAdSize.LARGE_BANNER}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
  // renderLanguageKeys() {
  //   return this.state.languageKeys.map((item) => {
  //     return (

  //     );
  //   });
  // }

  async setLang(language) {
    try {
      await AsyncStorage.setItem('lang', language);
      Lang.setLanguage(language);
      this.setState({lang: language});
    } catch (error) {
      console.log(error);
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  headerimg: {
    height: 200,
    width: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  divider: {
    width: '90%',
    height: 2,
    backgroundColor: '#909090',
    margin: 10,
  },
  scroll: {
    height: '60%',
    width: '100%',
  },
  btn: {
    width: '100%',
    height: 40,
    margin: 5,
  },
  icons: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  txt: {
    bottom: 0,
    left: 10,
    // position: 'absolute',
    color: '#707070',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalTitle: {
    color: '#fff',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  modalBtn: {
    height: 30,
    backgroundColor: 'rgba(200,200,200,0.8)',
    margin: 10,
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
  },
  modalBtnFlag: {
    width: 40,
    height: 20,
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  modalCanselBtn: {
    marginLeft: 20,
    width: 65,
    height: 40,
    backgroundColor: 'rgba(250,250,250,0.8)',
    padding: 10,
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
});
