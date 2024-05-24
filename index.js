/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/configureStore';

const store = configureStore();
const RNRedux = () => {
  <Provider store={store}>
    <App />
  </Provider>;
};

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => RNRedux);
