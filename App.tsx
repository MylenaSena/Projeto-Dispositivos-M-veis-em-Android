import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,LogBox } from 'react-native';
import Login from './src/app/pages';
import Register from './src/app/pages/register';
import Inicio from './src/app/pages/inicio';
import { ExpoRoot } from 'expo-router';

LogBox.ignoreLogs([
  "Invalid prop `style` supplied to `React.Fragment`",
]);

export default function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}