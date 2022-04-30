import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Lang} from './Lang';

const {width, height} = Dimensions.get('window');
const circleWidth = width / 2;
export default function App() {
  const [inExDisplay, setInExDisplay] = useState('none');
  const [firstText, setFirstText] = useState('flex');
  const [btn1color, setbtn1color] = useState('#fff');
  const [btn2color, setbtn2color] = useState('#fff');
  const [btn3color, setbtn3color] = useState('#fff');
  const [btn4color, setbtn4color] = useState('#fff');
  const [timer, setTimer] = useState(3);
  const [timerDisplay, setTimerDisplay] = useState('none');

  const [firstBreath, setfirstBreath] = useState(20000);
  const [firstBreathDelay, setfirstBreathDelay] = useState(1);
  const [secondBreath, setsecondBreath] = useState(20000);
  const [secondBreathDelay, setsecondBreathDelay] = useState(1);

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity1 = useRef(new Animated.Value(1)).current;
  const textOpacity2 = useRef(new Animated.Value(0)).current;
  const textOpacity3 = useRef(new Animated.Value(0)).current;
  const textOpacity4 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    breathAnimation();
    getLang();
  });

  const getLang = async () => {
    try {
      let lang = await AsyncStorage.getItem('lang');
      if (lang === null) {
        await AsyncStorage.setItem('lang', 'en');
        this.setLang('en');
      } else {
        this.setLang(lang);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const breathAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity1, {
            delay: 100,
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity2, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity3, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity4, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: firstBreath,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(textOpacity1, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity2, {
            delay: 100,
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity3, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity4, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: firstBreathDelay,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(textOpacity1, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity2, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity3, {
            delay: 100,
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity4, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),

          Animated.timing(move, {
            toValue: 0,
            duration: secondBreath,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(textOpacity1, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity2, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity3, {
            delay: 100,
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity4, {
            delay: 100,
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 0,
            duration: secondBreathDelay,
            //delay: firstBreathDelay,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 9],
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              display: firstText,
              textAlign: 'center',
            }}>
            {Lang.selectBreathMethod}
          </Text>
        </View>

        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: textOpacity1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              display: inExDisplay,
            }}>
            {Lang.inhale}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: textOpacity2,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              display: inExDisplay,
            }}>
            {Lang.hold}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: textOpacity3,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              display: inExDisplay,
            }}>
            {Lang.exhale}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: textOpacity4,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              display: inExDisplay,
            }}>
            {Lang.hold}
          </Text>
        </Animated.View>

        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
          const rotation = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });
          return (
            <Animated.View
              key={item}
              style={{
                opacity: 0.1,
                backgroundColor: '#9900ff',
                width: circleWidth,
                height: circleWidth,
                borderRadius: circleWidth / 2,
                ...StyleSheet.absoluteFill,
                transform: [
                  {
                    rotateZ: rotation,
                  },
                  {translateX: translate},
                  {translateY: translate},
                ],
              }}></Animated.View>
          );
        })}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPressIn={() => {
            setfirstBreath(4000);
            setfirstBreathDelay(6000);
            setsecondBreath(4000);
            setsecondBreathDelay(6000);
          }}
          onPressOut={() => {
            setInExDisplay('flex');
            setbtn1color('#eee');
            setbtn2color('#fff');
            setbtn3color('#fff');
            setbtn4color('#fff');
            setFirstText('none');
            move.setValue(0);
            textOpacity1.setValue(1);
            textOpacity2.setValue(0);
            textOpacity3.setValue(0);
            textOpacity4.setValue(0);
            breathAnimation();
          }}
          style={{...styles.btn, backgroundColor: btn1color}}>
          <Image
            source={require('../assets/image/relaxing.png')}
            style={styles.btnImage}
            resizeMode="contain"></Image>
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
              paddingHorizontal: 20,
            }}>
            <Text style={styles.btnText1}>{Lang.relaxing}</Text>
            <Text style={styles.btnText}>{'4-6'}</Text>
          </View>
          <Text
            style={{
              ...styles.btnText,
              alignSelf: 'flex-end',
              height: '80%',
            }}>
            {'>'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => {
            setfirstBreath(4000);
            setfirstBreathDelay(7000);
            setsecondBreath(8000);
            setsecondBreathDelay(0);
          }}
          onPressOut={() => {
            setInExDisplay('flex');
            setbtn1color('#fff');
            setbtn2color('#eee');
            setbtn3color('#fff');
            setbtn4color('#fff');
            setFirstText('none');
            move.setValue(0);
            textOpacity1.setValue(1);
            textOpacity2.setValue(0);
            textOpacity3.setValue(0);
            textOpacity4.setValue(0);
            breathAnimation();
          }}
          style={{...styles.btn, backgroundColor: btn2color}}>
          <Image
            source={require('../assets/image/unwind.png')}
            style={styles.btnImage}
            resizeMode="contain"></Image>
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
              paddingHorizontal: 20,
            }}>
            <Text style={styles.btnText1}>{Lang.unwind}</Text>
            <Text style={styles.btnText}>{'4-7-8'}</Text>
          </View>
          <Text
            style={{
              ...styles.btnText,
              alignSelf: 'flex-end',
              height: '80%',
            }}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => {
            setfirstBreath(4000);
            setfirstBreathDelay(4000);
            setsecondBreath(4000);
            setsecondBreathDelay(4000);
          }}
          onPressOut={() => {
            setInExDisplay('flex');
            setbtn1color('#fff');
            setbtn2color('#fff');
            setbtn3color('#eee');
            setbtn4color('#fff');
            setFirstText('none');
            move.setValue(0);
            textOpacity1.setValue(1);
            textOpacity2.setValue(0);
            textOpacity3.setValue(0);
            textOpacity4.setValue(0);
            breathAnimation();
          }}
          style={{...styles.btn, backgroundColor: btn3color}}>
          <Image
            source={require('../assets/image/focus.png')}
            style={styles.btnImage}
            resizeMode="contain"></Image>
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
              paddingHorizontal: 20,
            }}>
            <Text style={styles.btnText1}>{Lang.focus}</Text>
            <Text style={styles.btnText}>{'4-4-4-4'}</Text>
          </View>
          <Text
            style={{
              ...styles.btnText,
              alignSelf: 'flex-end',
              height: '80%',
            }}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => {
            setfirstBreath(4000);
            setfirstBreathDelay(2000);
            setsecondBreath(4000);
            setsecondBreathDelay(2000);
          }}
          onPressOut={() => {
            setInExDisplay('flex');
            setbtn1color('#fff');
            setbtn2color('#fff');
            setbtn3color('#fff');
            setbtn4color('#eee');
            setFirstText('none');
            move.setValue(0);
            textOpacity1.setValue(1);
            textOpacity2.setValue(0);
            textOpacity3.setValue(0);
            textOpacity4.setValue(0);
            breathAnimation();
          }}
          style={{...styles.btn, backgroundColor: btn4color}}>
          <Image
            source={require('../assets/image/energize.png')}
            style={styles.btnImage}
            resizeMode="contain"></Image>
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
              paddingHorizontal: 20,
            }}>
            <Text style={styles.btnText1}>{Lang.energize}</Text>
            <Text style={styles.btnText}>{'4-2'}</Text>
          </View>
          <Text
            style={{
              ...styles.btnText,
              alignSelf: 'flex-end',
              height: '80%',
            }}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '35%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    left: width / 4,
    top: height / 14,
  },
  btnContainer: {
    width: '100%',
    height: '100%',
  },
  btn: {
    width: '90%',
    height: height / 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 3,
  },
  btnImage: {
    width: 40,
    height: 40,
  },
  btnText1: {
    fontWeight: '800',
    color: '#606060',
    fontSize: 16,
    alignSelf: 'baseline',
  },
  btnText: {
    fontWeight: '800',
    color: '#909090',
    alignSelf: 'baseline',
    fontSize: 16,
  },
});
