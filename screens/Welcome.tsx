import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const Welcome: React.FC<Props> = (props) => (
  <View style={styles.container}>
    <Text style={{ fontSize: 30 }}> Welcome </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Welcome;
