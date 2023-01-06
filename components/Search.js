import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Search() {
  // Declaration des variables
  const [input, setInput] = useState('');
  const [filtre, setFiltre] = useState([]);
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [resul, setResul] = useState('Pret');

  const fetchpost = async () => {
    //const api = 'https://dummyjson.com/comments';
    const api = 'https://jsonplaceholder.typicode.com/posts';
    fetch(api)
      .then((Response) => Response.json())
      .then((data) => {
        setData(data), setFiltre(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    /*axios.get('http://localhost:1000/').then((res) => {
      setResul(res.data);
    });*/
  };

  useEffect(() => {
    setIsloading(true);
    fetchpost();

    return () => {};
  }, []);

  const searchfilter = async (text) => {
    if (text) {
      const newdata = data.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
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

  const ItemView = ({ item }) => {
    return (
      <Text>
        {item.id}
        {'- '}
        {item.title.toUpperCase()}
      </Text>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ width: '100%', height: 10, backgroundColor: 'black' }} />
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView>
        <Text style={styles.text}>Question</Text>
        <TextInput
          placeholder="Ask"
          value={input}
          onChangeText={(text) => searchfilter(text)}
          style={styles.barre}
          underlineColorAndroid="transparent"
        />
        {<Text> {input}</Text>}
        {isloading ? (
          <Text>Chargement</Text>
        ) : (
          <FlatList
            data={filtre}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  barre: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    marginLeft: 12,
    marginVertical: 5,
  },
});
