/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import HeaderCoins from '../Header/HeaderCoins';
import {connect, Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsNumber: this.props.coins,
    };
  }

  storeCoins = (coinsValue) => {
    try {
      AsyncStorage.setItem('@Coins_ID', JSON.stringify(coinsValue));
      console.log('coinsValue: ' + coinsValue);
    } catch (er) {
      console.log(er);
    }
  };

  render() {
    const {coins, onIncrement, onDecrement} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text>
          Your balance is {this.props.coins}{' '}
          {this.props.coins >= 1 ? 'coins' : 'coin'}
        </Text>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            this.props.onIncrement();
            this.storeCoins(this.props.coins + 1);
            console.log('this is new coins: ' + this.props.coins);
          }}>
          <Text>+1 Coin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            this.props.onDecrement();
            this.storeCoins(this.props.coins - 1);
          }}>
          <Text>-1 Coin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={() => Actions.pop()}>
          <Text>‌Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  Btn: {
    width: 200,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
