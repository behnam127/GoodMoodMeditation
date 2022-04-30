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
  StatusBar,
  ImageBackground,
  FlatList,
  boxdata,
} from 'react-native';
import ChakrasInfoBoxes from './ChakrasInfoBoxes';

import {Lang} from './Lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChakrasInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView>
        {/* اطلاعات 13 چاکرای اصلی و فرعی  13 Chakras Info*/}
        <Text style={styles.scrollTitle}>{Lang.chakrasInfo}</Text>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[
            {
              key: 'ch1',
              gif: require('../assets/image/chakrasInfoGif/1.gif'),
              chakrasInfoTxt: Lang.chakrasInfo1,
            },
            {
              key: 'ch2',
              gif: require('../assets/image/chakrasInfoGif/2.gif'),
              chakrasInfoTxt: Lang.chakrasInfo2,
            },
            {
              key: 'ch3',
              gif: require('../assets/image/chakrasInfoGif/3.gif'),
              chakrasInfoTxt: Lang.chakrasInfo3,
            },
            {
              key: 'ch4',
              gif: require('../assets/image/chakrasInfoGif/4.gif'),
              chakrasInfoTxt: Lang.chakrasInfo4,
            },
            {
              key: 'ch5',
              gif: require('../assets/image/chakrasInfoGif/5.gif'),
              chakrasInfoTxt: Lang.chakrasInfo5,
            },
            {
              key: 'ch6',
              gif: require('../assets/image/chakrasInfoGif/6.gif'),
              chakrasInfoTxt: Lang.chakrasInfo6,
            },
            {
              key: 'ch7',
              gif: require('../assets/image/chakrasInfoGif/7.gif'),
              chakrasInfoTxt: Lang.chakrasInfo7,
            },
            {
              key: 'ch8',
              gif: require('../assets/image/chakrasInfoGif/8.gif'),
              chakrasInfoTxt: Lang.chakrasInfo8,
            },
            {
              key: 'ch9',
              gif: require('../assets/image/chakrasInfoGif/9.gif'),
              chakrasInfoTxt: Lang.chakrasInfo9,
            },
            {
              key: 'ch10',
              gif: require('../assets/image/chakrasInfoGif/10.gif'),
              chakrasInfoTxt: Lang.chakrasInfo10,
            },
            {
              key: 'ch11',
              gif: require('../assets/image/chakrasInfoGif/11.gif'),
              chakrasInfoTxt: Lang.chakrasInfo11,
            },
            {
              key: 'ch12',
              gif: require('../assets/image/chakrasInfoGif/12.gif'),
              chakrasInfoTxt: Lang.chakrasInfo12,
            },
            {
              key: 'ch13',
              gif: require('../assets/image/chakrasInfoGif/13.gif'),
              chakrasInfoTxt: Lang.chakrasInfo13,
            },
          ]}
          renderItem={({item}) => (
            <ChakrasInfoBoxes
              gif={item.gif}
              chakrasInfoTxt={item.chakrasInfoTxt}
            />
          )}
          keyExtractor={(item) => item.key.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollTitle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9900cc',
    fontFamily: 'timesnewroman',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
