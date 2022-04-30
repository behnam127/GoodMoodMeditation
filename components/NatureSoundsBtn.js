/* eslint-disable prettier/prettier */
/* eslint-disable new-parens */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import {
  requireNativeComponent,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Image, SafeAreaView} from 'react-native';

/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {bold} from 'chalk';
import {color} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
// import soundUrl from './NatureSounds';

class NatureSoundsBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconcolor: '#000',
    };
  }

  render() {
    var natureBtnImg = this.props.natureBtnImg;
    var NatureSoundsText = this.props.NatureSoundsText;
    var soundurl = this.props.soundurl;

    return (
      <SafeAreaView style={styles.rows}>
        <TouchableOpacity
          underlayColor="#989898"
          style={styles.natureSoundsbtn}>
          <Image
            source={natureBtnImg}
            style={{
              tintColor: this.state.iconcolor,
              ...styles.playImg,
            }}></Image>
        </TouchableOpacity>
        <Text style={styles.natureSoundsbtnTxt}>{NatureSoundsText}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  playImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  natureContainer: {
    backgroundColor: '#181818',
    width: '100%',
    height: '100%',
    color: '#fff',
  },

  natureSoundsbtn: {
    backgroundColor: '#808080',
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    borderRadius: 10,
    padding: 8,
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
});

export default NatureSoundsBtn;
