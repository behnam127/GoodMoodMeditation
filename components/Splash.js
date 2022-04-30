/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {PropTypes, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  BackHandler,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {create} from 'react-test-renderer';
import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {connect} from 'react-redux';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: null,
      languageKeys: [
        {key: 'en', title: 'English'},
        {key: 'fa', title: 'Farsi'},
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
      coins: '',
    };
  }

  componentDidMount() {
    //this.setLang();
    this.getLang();
    this.getCoinsStorage();
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/image/splash.png')}
            style={styles.splashimage}
          />
          <Text style={styles.splashText}>GooD MooD Meditation</Text>
          {/* {this.renderLanguageKeys()} */}
          <Image
            source={require('../assets/image/spiner.gif')}
            style={styles.spinerimage}></Image>
        </View>
      </View>
    );
  }

  getCoinsStorage = async () => {
    try {
      const coinsValue = await AsyncStorage.getItem('@Coins_ID');
      this.setState({coins: coinsValue});
      this.props.onCoinsUpdate(coinsValue ? coinsValue : 0);
      console.log('Get Coins is: ' + this.state.coins);
      return coinsValue;
    } catch (e) {
      console.log(e);
    }
  };

  async setLang(language) {
    try {
      await AsyncStorage.setItem('lang', language);
      Lang.setLanguage(language);
      this.setState({lang: language});
      console.log('language is: ' + language);
    } catch (error) {
      console.log(error);
    }
  }

  async getLang() {
    try {
      let lang = await AsyncStorage.getItem('lang');

      if (lang === null) {
        // await AsyncStorage.setItem('lang', 'en');
        // this.setLang('en');
        Actions.SetLang();
      } else {
        this.setLang(lang);
        Lang.setLanguage(lang);
        Actions.Home();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCoinsUpdate: (coins) =>
      dispatch({type: 'UPDATE_COIN_STORAGE', payload: coins}),
  };
}

function mapStateToProps(state) {
  return {
    coins: state.coins,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  splashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imgContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  splashimage: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginTop: '30%',
  },
  splashText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  spinerimage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: '30%',
  },
});
