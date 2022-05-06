import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 500;

const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

export default class getName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: require('../../assets/image/home.png'),
    };
  }

  recognizeFromPicker(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  recognizeFromCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
  }

  renderImage(image) {
    return <Image style={{...styles.profileImage}} source={image} />;
  }

  imagePickerHandler() {
    Alert.alert('', 'How do you want to choose your profile pickture?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => this.recognizeFromCamera(),
      },
      {
        text: 'Gallery',
        onPress: () => this.recognizeFromPicker(),
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {this.state.image
            ? this.renderImage(this.state.image)
            : this.state.image}
        </View>
        <TouchableOpacity
          onPress={() => this.imagePickerHandler()}
          style={styles.editImageContainer}>
          <Image
            source={require('../../assets/image/cam.png')}
            style={styles.editProfileImage}
          />
        </TouchableOpacity>
        <TextInput
          keyboardType={'default'}
          placeholder={'what should I call you?'}
          style={styles.input}
          value={this.state.name}
          onChangeText={(name) => {
            this.setState({name});
            this.storeData();
          }}
        />
        <TouchableOpacity
          onPress={() => Actions.Register()}
          style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async storeData(image, name) {
    try {
      const image = this.state.image;
      const name = this.state.name;
      await AsyncStorage.setItem('@IMAGE', image);
      console.log('IMAGE-Value is: ' + image);
      await AsyncStorage.setItem('@NAME', name);
      console.log('NAME-Value is: ' + name);
    } catch (er) {
      console.log(er);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: screenWidth * 0.6,
    width: screenWidth * 0.6,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: '#e3e3e3',
    // backgroundColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editImageContainer: {
    height: screenWidth * 0.15,
    width: screenWidth * 0.15,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: '#e3e3e3',
    // backgroundColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: '-10%',
    marginRight: '-40%',
    backgroundColor: '#707070',
  },
  editProfileImage: {
    width: '100%',
    height: '100%',
    tintColor: '#ccc',
  },
  input: {
    backgroundColor: '#e6e6ff',
    width: '85%',
    margin: 10,
    marginTop: 50,
    borderRadius: 10,
    paddingLeft: 10,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#e6e6ff',
    borderWidth: 5,
  },
  nextText: {
    fontSize: 14,
    color: '#9900ff',
  },
});
