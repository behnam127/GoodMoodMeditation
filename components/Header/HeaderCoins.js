/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';

export default class HeaderCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.coinsImage}
          source={require('../../assets/image/coins.png')}
        />
        <Text style={styles.coinsNumber}>{this.props.coins}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  coinsImage: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  coinsNumber: {
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
});
