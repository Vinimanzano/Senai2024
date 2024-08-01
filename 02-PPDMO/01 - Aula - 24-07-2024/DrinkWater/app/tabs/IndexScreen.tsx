import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const IndexScreen: React.FC = () => {
  const [waterAmountLiters, setWaterAmountLiters] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSetWaterAmount = () => {
    if (!waterAmountLiters || isNaN(Number(waterAmountLiters)) || Number(waterAmountLiters) < 1 || Number(waterAmountLiters) > 4) {
      setErrorMessage('Por favor, insira uma quantidade válida.');
    } else {
      const amountInLiters = Number(waterAmountLiters);

      Alert.alert(
        'Quantidade de Água Definida',
        `Você definiu ${amountInLiters.toFixed(2)} litros de água por dia.`,
      );

      setErrorMessage('');
    }

    // Dismiss the keyboard
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definir Quantidade de Água</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade em litros"
        keyboardType="numeric"
        value={waterAmountLiters}
        onChangeText={setWaterAmountLiters}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSetWaterAmount}>
        <Text style={styles.buttonText}>Definir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#333',
    color: '#fff',
  },
  errorText: {
    color: '#FF6F61',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IndexScreen;