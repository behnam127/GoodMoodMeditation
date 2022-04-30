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
import Counter from './Counter';
import HeaderCoins from '../Header/HeaderCoins';
import {connect} from 'react-redux';

class CounterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Provider store={store}> */}
        <HeaderCoins coins={this.props.coins} />
        <Counter coins={this.props.coins} />
        {/* </Provider> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage);

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
