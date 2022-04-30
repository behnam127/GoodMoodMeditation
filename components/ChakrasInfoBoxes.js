/* eslint-disable prettier/prettier */
import {Left} from 'native-base';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Lang} from './Lang';
import {AsyncStorage, async} from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const boxHeight = height * 0.65;

class ChakrasInfoBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var gif = this.props.gif;
    var key = this.props.key;
    var chakrasInfoTxt = this.props.chakrasInfoTxt;

    return (
      <View style={styles.scroll2boxes}>
        <Image source={gif} style={styles.chakrasInfoImg} />
        <Text style={styles.chakrasInfotext}>{chakrasInfoTxt}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll2boxes: {
    width: boxHeight / 2,
    height: boxHeight,
    backgroundColor: '#000',
    position: 'relative',
    marginRight: 2,
    marginLeft: 3,
    borderRadius: 10,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  chakrasInfoImg: {
    borderRadius: 10,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  chakrasInfotext: {
    color: '#fff',
    position: 'absolute',
    marginTop: boxHeight * 0.5,
    marginLeft: 10,
    padding: 10,
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 10,
  },
});

export default ChakrasInfoBoxes;
