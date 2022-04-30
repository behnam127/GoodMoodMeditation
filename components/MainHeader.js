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
} from 'react-native';
import {connect} from 'react-redux';
import {create} from 'react-test-renderer';
import HeaderCoins from './Header/HeaderCoins';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.headercontainer}>
        <View style={styles.imgContainer}>
          {/* <HeaderCoins coins={this.props.coins} /> */}
          <Image
            source={require('../assets/image/med.png')}
            style={styles.headerimage}
            resizeMode="contain"
          />
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

const styles = StyleSheet.create({
  headerimage: {
    height: 200,
    width: 300,
    alignSelf: 'center',
  },
  imgContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 200,
    borderBottomRightRadius: 200,
    backgroundColor: '#fff',
    shadowRadius: 15,
    shadowColor: '#fff',
    elevation: 10,
  },
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
