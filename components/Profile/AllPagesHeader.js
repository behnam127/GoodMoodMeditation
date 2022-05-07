import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class AllPagesHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../../assets/image/home.png'),
      name:'',
    };
  }

  async getData() {
    try {
      const name = await AsyncStorage.getItem('@NAME');
      this.setState({name: name});
      console.log('geting @NAME data in allPagesHeader page');
      return name != null ? JSON.parse(name) : null;
      
    } catch (e) {
      // error reading value
    }
  }


  componentDidMount() {
    this.getData();
  }

  renderHeader(image) {
    <TouchableOpacity
      onPress={() => this.imagePickerHandler()}
      style={styles.editImageContainer}>
      <Image source={image} style={styles.editProfileImage} />
    </TouchableOpacity>;
  }
  render() {
    return (
      <View style={{height: 100, width: '100%'}}>
        {this.state.image
          ? this.renderHeader(this.state.image)
          : this.state.image}
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    top: 0,
    left: 0,
  },
  editProfileImage: {
    width: '100%',
    height: '100%',
    tintColor: '#ccc',
  },
});
