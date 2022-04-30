import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Lang} from './Lang';
import ScrollView from 'rn-faded-scrollview';
import RNRestart from 'react-native-restart';

export default class SetLang extends Component {
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
    };
  }
  componentDidMount() {
    this.getLang();
  }
  render() {
    return (
      <SafeAreaView>
        <Text
          style={{
            fontSize: 20,
            backgroundColor: 'orange',
            width: '100%',
            textAlign: 'center',
            padding: 10,
            color: '#000',
          }}>
          Select your Language
        </Text>
        <Image
          style={styles.backImage}
          source={require('../assets/image/language.png')}
        />
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
            {this.renderLanguageKeys()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  renderLanguageKeys() {
    return this.state.languageKeys.map((item) => {
      return (
        <>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: this.state.lang == item.key ? '#0099ff' : '#ccc',
              padding: 10,
              width: '80%',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: 'center',
            }}
            onPress={() => {
              this.setLang(item.key);
              RNRestart.Restart();
            }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        </>
      );
    });
  }
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
        Lang.setLanguage(lang);
        Actions.Home();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const styles = StyleSheet.create({
  backImage: {
    alignSelf: 'center',
    marginTop: 40,
    width: '40%',
    height: '20%',
  },
  timerScroll: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '70%',
    height: '50%',
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#eee',
    alignSelf: 'center',
  },
});
