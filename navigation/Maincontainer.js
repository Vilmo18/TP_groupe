/*import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Tab=createBotto

const Maincontainer = () => {
  return (
    <SafeAreaView>
      <Text>Maincontainer</Text>
    </SafeAreaView>
  );
};

export default Maincontainer;

const styles = StyleSheet.create({});
*/
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screen/HomeScreen';
import DetailsScreen from './screen/DetailsScreen';
import SettingsScreen from './screen/SettingsScreen';

//Screen names
const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === detailsName) {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
