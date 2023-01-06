import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { dummyData, search } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
const Prediction = () => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {/* backbutton */}
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-left" size={23} color="#333" />
        </TouchableOpacity>

        {/* header Text */}
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            fontFamily: 'Roboto-Bold',
            fontSize: 18,
            color: '#333',
          }}
        >
          Prediction
        </Text>
      </View>
      <View
        style={{ flex: 4, backgroundColor: '#fff', paddingHorizontal: '2%' }}
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
                  style={{ height: '65%' }}
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
                      fontSize: 10,
                    }}
                  >
                    {item.resultat}
                  </Text>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 10,
                    }}
                  >
                    {item.Pourcentage}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Prediction;

const styles = StyleSheet.create({});
