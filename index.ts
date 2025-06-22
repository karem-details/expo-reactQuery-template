import { registerRootComponent } from 'expo';
import moment from 'moment';
import 'moment/locale/ar'; // without this line it didn't work
import { I18nManager } from 'react-native';
import App from './App';
moment.locale(I18nManager.isRTL ? 'ar' : 'en');

registerRootComponent(App);
