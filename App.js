import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';

MIR_URL = 'https://mironline.ru/support/list/kursy_mir/'

export default function App() {
  const [BYNToRUB, setBYNToRUB] = useState(0);
  const [BYNToEUR, setBYNToEUR] = useState(0);
  const [comissionPersent, setCommissionPersent] = useState(0);

  const [RUBToEURWithComission, setRUBToEURWithComission] = useState(0);
  const [RUBToEURNoComission, setRUBToEURNoComission] = useState(0);


  const calculate = () => {
    const oneEUR = BYNToEUR * BYNToRUB
    const oneEURWithComission = oneEUR * (1 + (0.01 * comissionPersent))

    setRUBToEURNoComission(oneEUR)
    setRUBToEURWithComission(oneEURWithComission)
  }

  return (
    <View style={styles.container}>

      <View style={styles.courseContainer}>
        <Text style={styles.textTitle}>ПС "Мир" продает BYN за RUB</Text>
        <Text 
          style={styles.linkText}
          onPress={() => {Linking.openURL(MIR_URL);}}
        > 
         Нажмите, чтобы посмотреть курс
        </Text>
        <View style={styles.item}>
          <Text style={styles.p}>1 BYN =</Text>
          <TextInput
            onChangeText={newText => setBYNToRUB(newText)}
            style={styles.input}
            placeholder="Пример, 27.21"
            keyboardType="numeric"
          />
          <Text style={styles.p}>RUB</Text>
        </View>
      </View>

      <View style={styles.courseContainer}>
        <Text style={styles.textTitle}>Банк продает EUR за BYN (берем бОльшее)</Text>
        <View style={styles.item}>
          <Text style={styles.p}>1 EUR =</Text>
          <TextInput
            onChangeText={newText => setBYNToEUR(newText)}
            style={styles.input}
            placeholder="Пример, 2.818"
            keyboardType="numeric"
          />
          <Text style={styles.p}>BYN</Text>
        </View>
      </View>

      <View style={styles.courseContainer}>
        <Text style={styles.textTitle}>Комиссия банка за перевод в %</Text>
        <View style={styles.item}>
        <Text style={styles.p}>1 RUB =</Text>
          <TextInput
            onChangeText={newText => setCommissionPersent(newText)}
            style={styles.input}
            placeholder="Пример, 1"
            keyboardType="numeric"
          />
          <Text style={styles.p}>%</Text>
        </View>
      </View>

      <Button title="Рассчитать" onPress={calculate}/>

      <Text style={styles.textResult}>1 EUR = {RUBToEURNoComission.toFixed(2)} RUB</Text>
      <Text style={styles.textResult}>1 EUR + % = {RUBToEURWithComission.toFixed(2)} RUB</Text>
  

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { 
    height: 70, 
    fontSize: 20, 
    borderWidth: 1, 
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 24,
    justifyContent: 'flex-start'
  },
  textResult: {
    fontSize: 44
  },
  p: {
    fontSize: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'dodgerblue'
  },
  courseContainer: {
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    marginBottom: 12
  },
  textResult: {
    fontSize: 32,
    marginTop: 20
  }
});
