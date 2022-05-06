import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class AllPagesHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../../assets/image/home.png'),
    };
  }

  async getData() {
    try {
      const image = await AsyncStorage.getItem('@IMAGE');
      this.setState({image: image});
      return image != null ? JSON.parse(image) : null;
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
        <Text>AllPagesHeader</Text>
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
