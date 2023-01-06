/*import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SettingScreen = ({ navigation }) => {
  return (
    <View style={styles.setting}>
      <Text style={styles.text}>SettingScreen</Text>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  setting: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});*/
import * as React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Settings Screen
      </Text>
    </View>
  );
}
