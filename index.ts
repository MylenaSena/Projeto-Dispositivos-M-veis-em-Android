import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

LogBox.ignoreLogs([
  "Invalid prop `style` supplied to `React.Fragment`",
]);

registerRootComponent(App);
