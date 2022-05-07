import React, {Component} from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      BEHnamAuthKey: 'BehnamPSH127',
      btnDisable: false,
      loading: false,
      message: '',
      displayMessage: 'none',
      displayErrMessage: 'none',
      token: '',
    };
  }

  // storeEmail = async (EmailValue) => {
  //   try {
  //     const EmailValue = this.state.email;
  //     await AsyncStorage.setItem('@EMAIL_ID', EmailValue);
  //     console.log('Email-Value is: ' + EmailValue);
  //   } catch (er) {
  //     console.log(er);
  //   }
  // };

  renderInputs = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.renderInputsScrollview}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TextInput
          autoCapitalize="none"
          keyboardType={'email-address'}
          placeholder={'Email'}
          style={styles.input}
          value={this.state.email}
          onChangeText={(email) => {
            this.setState({email});
          }}
        />
        <TextInput
          keyboardType={'default'}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'Password'}
          style={styles.input}
          value={this.state.password}
          onChangeText={(password) => {
            this.setState({password});
          }}
        />
        <TextInput
          keyboardType={'default'}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'Enter Password again'}
          style={styles.input}
          value={this.state.password2}
          onChangeText={(password2) => {
            this.setState({password2});
          }}
        />

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            disabled={this.state.btnDisable}
            onPress={() => {
              if (this.state.password == this.state.password2) {
                if (this.state.password.length >= 6) {
                  if (!this.state.email) {
                    this.setState({
                      displayErrMessage: 'flex',
                      message: 'Email is empty!',
                    });
                  } else if (!this.state.password) {
                    this.setState({
                      displayErrMessage: 'flex',
                      message: 'Enter password please!',
                    });
                  } else {
                    this.requestRegister();
                    this.setState({
                      loading: true,
                      btnDisable: true,
                      message: '',
                      displayMessage: 'none',
                    });
                  }
                } else {
                  this.setState({
                    displayErrMessage: 'flex',
                    message:
                      'Password not match. please re-enter your password!',
                  });
                }
              } else {
                this.setState({
                  displayErrMessage: 'flex',
                  message: 'Password must be atlist 6 character',
                });
              }
            }}>
            <Text style={styles.btntext}>SignUp</Text>
            <Spinner
              isVisible={this.state.loading}
              color="#ccc"
              size={25}
              type="Circle"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => Actions.Login()}
          style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>
            Already have an account? LogIn..
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={
              styles.header
            }>{`Enter your E-mail and Password to SignUP!`}</Text>
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
        {Platform.OS === 'android' ? (
          this.renderInputs()
        ) : (
          <KeyboardAvoidingView behavior="padding">
            {this.renderInputs()}
          </KeyboardAvoidingView>
        )}
        <TouchableOpacity
          onPress={() => Actions.getName()}
          style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Actions.Splash()}
          style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  requestRegister() {
    this.setState({
      loading: true,
      btnDisable: true,
      displayErrMessage: 'none',
      displayMessage: 'none',
    });

    axios
      .post(
        'https://uncleb.ir/?rest_route=/simple-jwt-login/v1/users&email=' +
          this.state.email +
          '&password=' +
          this.state.password +
          '&BEHnamAuthKey=' +
          this.state.BEHnamAuthKey,
        {},
      )
      .then((response) => {
        console.log(response);
        this.setState({
          message: 'success!',
          loading: false,
          btnDisable: false,
          displayMessage: 'flex',
          displayErrMessage: 'none',
        });
        this.storeEmail();
      })
      .catch((error) => {
        console.log(error.response);

        console.log(error.response.data.data.message);

        this.setState({
          message: error.response.data.data.message,
          loading: false,
          btnDisable: false,
          displayMessage: 'none',
          displayErrMessage: 'flex',
        });
        this.messageHandler();
      });
  }

  messageHandler() {
    switch (this.state.message) {
      case 'Invalid email address.':
        this.setState({message: 'ایمیل وارد شده اشتباه است!'});
      //   case 'User already exists.':
      //     this.setState({message: 'این ایمیل قبلا استفاده شده!'});
      default:
        this.state.message;
    }
    return this.state.message;
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
    marginTop: 0,
  },
  signupText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  renderInputsScrollview: {
    width: '100%',
    marginBottom: '15%',
  },
  input: {
    backgroundColor: '#e6e6ff',
    width: '95%',
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
    marginTop: 25,
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
  loginBtn: {
    marginTop: 30,
  },
  loginBtnText: {
    fontSize: 13,
    color: 'blue',
  },
  skipBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
    marginBottom: 60,
    borderRadius: 10,
    borderColor: '#e6e6ff',
    borderWidth: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skipText: {
    fontSize: 14,
    color: '#9900ff',
  },
  backBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 10,
    marginBottom: 60,
    borderRadius: 10,
    borderColor: '#e6e6ff',
    borderWidth: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backText: {
    fontSize: 14,
    color: '#ff471a',
  },
});
