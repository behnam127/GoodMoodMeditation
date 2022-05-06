import React, {Component} from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class LoginOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phoneOrEmail: this.props.passedPhoneOrEmail,
      timer: 60,
      timerText: '(60 s)',
      resendButtonDisable: true,
      loading: false,
      resendloading: false,
      resendOpacity: 0.5,
      message: '',
      displayMessage: 'none',
      displayErrMessage: 'none',
      Mobile: null,
      token: '',
    };
  }

  storeTokenData = async (TokenValue) => {
    try {
      await AsyncStorage.setItem('@Token_ID', TokenValue);
    } catch (er) {
      console.log(er);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            {`Enter your Username and Password`}
          </Text>
        </View>
        <Text
          style={{
            color: 'green',
            backgroundColor: '#ccffe6',
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
            display: this.state.displayMessage,
          }}>
          {this.state.message}
        </Text>
        <Text
          style={{
            color: 'red',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
            display: this.state.displayErrMessage,
          }}>
          {this.state.message}
        </Text>
        <TextInput
          placeholder={'Username'}
          style={styles.input}
          value={this.state.username}
          onChangeText={(username) => {
            this.setState({username});
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={'Password'}
          style={styles.input}
          value={this.state.password}
          onChangeText={(password) => {
            this.setState({password});
          }}
        />
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (!this.state.username) {
                this.setState({
                  displayErrMessage: 'flex',
                  message: 'Username is empty!',
                });
              } else if (!this.state.password) {
                this.setState({
                  displayErrMessage: 'flex',
                  message: 'Enter password please!',
                });
              } else {
                this.requestOtp();
                this.setState({
                  loading: true,
                  btnDisable: true,
                  message: '',
                  displayMessage: 'none',
                });
              }
            }}>
            <Text style={styles.btntext}>Submit</Text>
            <Spinner
              isVisible={this.state.loading}
              color="#ccc"
              size={25}
              type="Circle"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  requestOtp() {
    this.setState({loading: true});

    axios
      .post('https://uncleb.ir/wp-json/jwt-auth/v1/token', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);

        if (!response.hasError) {
          console.log('no error');
          this.setState({
            // token: response.data.result.token,
            btnDisable: false,
            loading: false,
          });
        } else if (response.hasError) {
          this.setState({
            message: response.data.data.message[0].text,
            loading: false,
            btnDisable: false,
            displayMessage: 'none',
            displayErrMessage: 'flex',
          });
        }
      })
      .catch((error) => {
        console.log(error.response);

        if (error) {
          console.log(error.data);
          this.setState({
            message:
              'Somthing went wrong. check your username and password or network connection!',
            loading: false,
            btnDisable: false,
            displayMessage: 'none',
            displayErrMessage: 'flex',
          });
        }
      });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: '10%',
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  header: {
    color: '#000',
    alignSelf: 'flex-start',
    lineHeight: 30,
    marginBottom: 30,
    marginTop: 30,
  },
  signupText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#e6e6ff',
    width: '100%',
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#a64dff',
    paddingVertical: 20,
    width: '90%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 10,
    flexDirection: 'row',
  },

  btntext: {
    fontSize: 20,
    color: '#fff',
    marginEnd: 10,
  },
  alreadyText: {
    color: '#000',
    marginTop: 30,
  },
  resendText: {
    fontSize: 20,
    color: '#000',
  },
});
