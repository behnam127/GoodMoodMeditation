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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  AdEventType,
  BannerAdSize,
  BannerAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';

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

import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopHeader: [],
      shopSecond: [],
      musicurl: null,
      picurl: null,
      title: null,
      musicduration: null,
      palypuse: '../assets/image/play.png',
      lang: this.props.lang,
    };
  }

  componentDidUpdate() {}

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

    this.getDataShopHeader();
    this.getDataShopSecond();
  }

  getDataShopHeader() {
    axios.get(`https://uncleb.ir/shop/stones/shopHeader.json`).then((res1) => {
      this.setState({shopHeader: res1.data});
    });
  }

  getDataShopSecond() {
    axios
      .get(`https://uncleb.ir/shop/accessories/shopSecond.json`)
      .then((res2) => {
        this.setState({shopSecond: res2.data});
      });
  }

  renderShopHeader({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://uncleb.ir/shoppage');
        }}
        key={item.id}
        style={styles.listItem1}>
        <Image style={styles.listImageTop} source={{uri: item.picurl}}></Image>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            borderRadius: 15,
            flexDirection: 'column',
          }}>
          <View style={styles.headerNameTop}>
            {/* <Text style={{color: '#fff', margin: 5}}>{item.title}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderShopSecond({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://uncleb.ir/shoppage');
        }}
        key={item.id}
        style={styles.listItem1}>
        <Image style={styles.listImageTop} source={{uri: item.picurl}}></Image>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            borderRadius: 15,
            flexDirection: 'column',
          }}>
          <View style={styles.headerNameTop}>
            {/* <Text style={{color: '#fff', margin: 5}}>{item.title}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{height: '100%', width: '100%', backgroundColor: '#000'}}>
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
          <Text style={styles.headerTitle}>{Lang.shop}</Text>
          <Text style={styles.listItemTitle}>{Lang.rafStones}</Text>
          <FlatList
            style={{height: 270}}
            data={this.state.shopHeader}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderShopHeader.bind(this)}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.listItemTitle}>{Lang.sevenChakras}</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://uncleb.ir/shoppage');
            }}
            style={styles.listItem1}>
            <Image
              style={styles.listImageTop}
              source={{uri: 'https://uncleb.ir/shop/accessories/7-chakra.jpg'}}
            />
          </TouchableOpacity>
          <Text style={styles.listItemTitle}>{Lang.baft}</Text>
          <FlatList
            style={{height: 270}}
            data={this.state.shopSecond}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderShopSecond.bind(this)}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listItem1: {
    height: 250,
    width: 300,
    margin: 10,
    marginBottom: 10,
    padding: 2,
    backgroundColor: 'rgba(10, 10, 10,0.6)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  listItem2: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 10,
  },
  listItem3: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 10,
  },
  listItem4: {
    height: 100,
    width: 320,
    margin: 10,
    padding: 2,
    backgroundColor: 'rgba(10, 10, 10,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 10,
  },
  headerTitle: {
    color: '#b3a61e',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    margin: 20,
    alignSelf: 'center',
    bottom: 0,
  },
  listItemTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    margin: 20,
    //alignSelf: 'center',
    bottom: 0,
  },
  headerNameTop: {
    padding: 10,
    borderRadius: 15,
    fontSize: 12,
    //margin: 0,
    fontWeight: '400',
    color: '#fff',
    //position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    height: '60%',
    zIndex: 3,
    bottom: -200,
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
    backgroundColor: '#000',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    zIndex: 4,
  },
});
