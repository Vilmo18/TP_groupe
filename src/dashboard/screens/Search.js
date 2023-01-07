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
import { ProfitIndicator } from '../components';
import { question } from '../constants/Question_ang';

const Search = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [filtre, setFiltre] = useState([]);
  const [data, setData] = useState(search.question);
  const searchfilter = async (text) => {
    if (text) {
      const newdata = search.question.filter((item) => {
        const itemData = item.question
          ? item.question.toUpperCase()
          : ''.toUpperCase();
        const textdata = text.toUpperCase();
        return itemData.indexOf(textdata) > -1;
      });

      setFiltre(newdata);
    } else {
      setFiltre(data);
    }
    setInput(text);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {/* Backbutton with header */}
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
            Recherche
          </Text>
        </View>

        {/* search bar */}
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            paddingHorizontal: '2%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#999',
              borderRadius: 20,
              height: 50,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: 20,
            }}
          >
            <Icon name="search" color="#ddd" size={22} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              value={input}
              onChangeText={(text) => searchfilter(text)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View
          style={{ flex: 4, backgroundColor: '#fff', paddingHorizontal: '2%' }}
        >
          {/* copying vertical flatlist from dashboard */}
          <FlatList
            kkeyExtractor={(item, index) => {
              index.toString();
            }}
            data={filtre}
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
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                    source={require('../assets/icons/doute.png')}
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
                        color: '#2249DA',
                        fontSize: 8,
                      }}
                    >
                      {item.question}
                    </Text>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 8,
                      }}
                    >
                      {item.answer}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
