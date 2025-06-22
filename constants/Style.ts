import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const commonStyle = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenPadding: {
    paddingHorizontal: 26,
  },
});

export default commonStyle;
