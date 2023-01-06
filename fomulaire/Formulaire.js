import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
import { LetterOnly, MinimumAge } from './regex';

let Form = t.form.Form;

// here we are: define your domain model
const UserForm = t.struct({
  jour: LetterOnly,
  Aliment: LetterOnly,
  nombre: t.Number,
  quantite_eau: t.Number,
  quantite_autre: t.Number,
  fruit_legume: t.Boolean,
  toilette: t.Number,
  probleme_sante: LetterOnly,
});

const options = {
  fields: {
    jour: {
      label: ' entrez le jour ',
      placeholder: ' jour ',
      error: 'jour incorrect',
    },
    Aliment: {
      label: " entrez l'aliment ",
      placeholder: ' aliment',
      error: 'aliment incorect',
    },
    nombre: {
      label: ' entrez le nombre',
      placeholder: ' nombre',
      error: ' nombre incorrect',
    },
    quantite_eau: {
      label: " entrez la quantite d'eau",
      placeholder: " quantite d'eau",
      error: " quantite d'eau incorrect",
    },
    quantite_autre: {
      label: " entrez la quantite d'autre liquid ",
      placeholder: " quantite d'autre liquide",
      error: " quantite d'autre liquide incorrect",
    },
    fruit_legume: {
      label: 'avez-vous consommez un fruit ou legume ?',
    },
    toilette: {
      label: ' combien de fois etes-vous rendu aux toilette ?',
      placeholder: ' 0',
    },
    probleme_sante: {
      label: ' avez-vous un probleme de sante associe a un repas?',
      placeholder: ' aucun',
    },
  },
};

const Formulaire = (props) => {
  const [form, setForm] = useState(undefined);

  const handleSubmitForm = () => {
    const valuesForm = form.getValue();
    console.log('Values: ', valuesForm);
    if (valuesForm) {
      console.log('Form validated');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>Entrer les habitudes</Card.Title>
        <Form
          ref={(formValue) => setForm(formValue)}
          type={UserForm}
          options={options}
        />
        <View style={styles.button_container}>
          <Button title="Next" onPress={handleSubmitForm} color="#20B2AA" />
        </View>
      </Card>
      <Text>{'\n\n\n\n'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button_container: {
    marginTop: 30,
  },
});

export default Formulaire;
