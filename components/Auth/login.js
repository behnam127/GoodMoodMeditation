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
      verifyCode: '',
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
      UserName: null,
      Password: null,
      Mobile: null,
      token: '',
    };
  }

  componentDidMount() {
    //this.timerInterval();
    this.requestOtp();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  timerInterval() {
    this.interval = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1,
        timerText: '(' + (this.state.timer - 1) + ' s)',
      });
      if (this.state.timer == 0) {
        clearInterval(this.interval);
        this.setState({
          resendButtonDisable: false,
          timerText: '',
          resendOpacity: 1,
        });
      }
    }, 1000);
  }

  resendCode() {
    clearInterval(this.interval);
    this.setState({
      resendButtonDisable: true,
      resendOpacity: 0.5,
      timer: 60,
      timerText: '(60 s)',
      loading: false,
    });
    // when request => ok
    this.timerInterval();
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
          {/* <Text style={styles.signupText}>Registering</Text> */}
          <Text style={styles.header}>
            {`Enter the Code that we've send you`}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{width: '100%', height: 50, backgroundColor: '#ccc'}}
            value={this.state.verifyCode}
            onCodeChanged={(verifyCode) => {
              this.setState({verifyCode});
            }}></Input>
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
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({
                resendButtonDisable: true,
                resendOpacity: 1,
                timerText: '',
                loading: true,
                btnDisable: true,
                message: '',
                displayMessage: 'none',
              });
              this.otpVerify();
            }}>
            <Text style={styles.btntext}>Verify</Text>
            <Spinner
              isVisible={this.state.loading}
              color="#ccc"
              size={25}
              type="Circle"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.alreadyText}>{`\nDidn't recieve code?\n`}</Text>

        <TouchableOpacity
          disabled={this.state.resendButtonDisable}
          style={{
            opacity: this.state.resendOpacity,
            marginTop: 0,
          }}
          onPress={() => {
            this.resendCode();
            this.requestOtp();
            this.setState({displayMessage: 'none', displayErrMessage: 'none'});
          }}>
          <Text
            style={[
              styles.resendText,
              {
                display: this.state.resendloading ? 'none' : 'flex',
              },
            ]}>
            Resend Code {this.state.timerText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  requestOtp() {
    this.setState({loading: true});

    axios
      .post('https://raygansms.com/CheckSendCode.ashx', {
        UserName: 'behnam',
        Password: '12345678',
        Mobile: '09353226202',
        Code: 'GooD MooD Meditation',
      })
      .then((response) => {
        // alert(response.status);
        console.log(response);

        if (!response.hasError) {
          console.log('no error');
          this.setState({
            // token: response.data.result.token,
            btnDisable: false,
            loading: false,
          });
          //alert(response);
          //Actions.SetTimer();
        } else if (response.hasError) {
          this.setState({
            message: response.data.message[0].text,
            loading: false,
            btnDisable: false,
            displayMessage: 'none',
            displayErrMessage: 'flex',
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error);
        if (error.response.status == 422) {
          console.log(error.response);
          this.setState({
            message: error.response.data.message,
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
    top: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '95%',
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
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#e6e6e6',
    width: '92%',
    height: 50,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#000',
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
