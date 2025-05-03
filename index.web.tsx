// index.web.tsx
import { AppRegistry } from 'react-native';
import App from './src/App';
import { Platform } from 'react-native';
import appConfig from "./app.json"
const name = appConfig.name
AppRegistry.registerComponent(name, () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(name, {
    rootTag: document.getElementById('root'),
  });
}
