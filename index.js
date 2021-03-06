/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('ReactNativeRouterFluxDemo', () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
AppRegistry.registerHeadlessTask('TimerPage', () =>
  require('./components/TimerPage.js'),
);
