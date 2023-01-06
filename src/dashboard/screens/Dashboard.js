import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Touchable,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dummyData, indicateur, search } from '../constants';
import { ProfitIndicator, ActionCenter } from '../components';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Dashboard = () => {
  const data = indicateur;
  const [fontsLoaded] = useFonts({
    LemonLove: require('./assets/fonts/Roboto-Regular.ttf'),
    MilkyCoffee: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* Statusbar */}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      {/* Header section */}
      <View
        style={{ flex: 1.2, backgroundColor: 'blue', flexDirection: 'column' }}
      >
        <View
          style={{
            flexDirection: 'column',
            marginTop: hp('10%'),
            paddingHorizontal: '5%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Welcome message and name */}
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  fontFamily: 'LemonLove',
                  fontSize: 16,
                  color: '#fff',
                }}
              >
                Welcome Back
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#fff',
                  fontSize: 22,
                }}
              >
                Groupe
              </Text>
            </View>

            {/* Bell icon and profile pic */}
          </View>

          {/* amount  */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Amount */}
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 28,
                  fontFamily: 'MilkyCoffee',
                }}
              >
                19
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,25!5,0.3)',
                  fontFamily: 'Roboto-Regular-Italic',
                  fontSize: 14,
                }}
              >
                Happy
              </Text>
            </View>

            {/* profit loss indicator */}
          </View>
        </View>
      </View>
      {/* Body section */}
      <View
        style={{
          flex: 2.5,
          backgroundColor: '#fff',
          paddingHorizontal: wp('5%'),
        }}
      >
        {/* Action Center */}

        {/* My Assets */}
        <View style={{ flexDirection: 'column' }}>
          {/* Text and button */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                color: '#333',
                fontSize: 22,
              }}
            >
              Indicateurs de performances
            </Text>
            <TouchableOpacity onPress={() => console.log('see all')}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#2249DA',
                  fontSize: 20,
                }}
              ></Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal asset slider */}
          <FlatList
            keyExtractor={(item) => item.perform}
            data={indicateur.indic}
            renderItem={({ item }) => (
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'column',
                  height: hp('20%'),
                  width: wp('65%'),
                  borderWidth: 1,
                  borderColor: '#ddd',
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  marginRight: 10,
                  marginTop: 10,
                }}
              >
                {/* Coin and symbol */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingTop: 20,
                  }}
                >
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={item.image}
                  />
                  <Text
                    style={{
                      fontFamily: 'Roboto-Bold',
                      color: '#333',
                      fontSize: 18,
                    }}
                  >
                    {' '}
                    {item.perform}
                  </Text>
                </View>

                {/* coin and price indicator */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  {/* Coin Price */}

                  <View style={{ flexDirection: 'column' }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Bold',
                        color: '#333',
                        fontSize: 20,
                      }}
                    >
                      {' '}
                      {item.values}
                    </Text>
                  </View>

                  {/* indicator */}
                </View>
              </View>
            )}
            horizontal={true}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text
            style={{ fontFamily: 'Roboto-Bold', fontSize: 22, color: '#333' }}
          >
            Prediction
          </Text>

          <View
            style={{
              flex: 4,
              backgroundColor: '#fff',
              paddingHorizontal: '2%',
            }}
          >
            {/* copying vertical flatlist from dashboard */}
            <FlatList
              keyExtractor={(item) => item.jour}
              data={search.predire}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('12%'),
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 15,
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 15,
                  }}
                >
                  {/* Coin image ,coin name and symbol */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Coin image */}
                    <Image
                      style={{ height: 25, width: 25 }}
                      resizeMode="contain"
                      source={require('../assets/icons/predire.png')}
                    />

                    {/* Coin symbol */}
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 15,
                        }}
                      >
                        {item.resultat}
                      </Text>
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 15,
                        }}
                      >
                        {item.Pourcentage}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <Text>{'\n \n\n'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
