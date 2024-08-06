import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';

const HomeScreen: React.FC = () => {
  const [waterAmountLiters, setWaterAmountLiters] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
    if (notificationStatus !== 'granted') {
      Alert.alert(
        'Permissões de Notificação',
        'Você precisa conceder permissões para notificações para receber lembretes de hidratação.',
        [{ text: 'OK' }],
      );
    }
  };

  const handleSetWaterAmount = () => {
    if (!waterAmountLiters || isNaN(Number(waterAmountLiters)) || Number(waterAmountLiters) < 1 || Number(waterAmountLiters) > 4) {
      setErrorMessage('Por favor, insira uma quantidade válida.');
    } else {
      const amountInLiters = Number(waterAmountLiters);
      setErrorMessage('');
      
      Alert.alert(
        'Quantidade de Água Definida',
        `Você definiu ${amountInLiters.toFixed(4)} litros de água por dia.`,
      );
      
      scheduleNotifications(amountInLiters);
    }

    Keyboard.dismiss();
  };

  const scheduleNotifications = async (amountInLiters: number) => {
    const totalNotifications = 4;
    const interval = 24 * 60 * 60 * 1000 / totalNotifications;

    for (let i = 0; i < totalNotifications; i++) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hora de Beber Água!',
          body: 'Lembre-se de beber água para manter-se hidratado.',
          sound: 'default',
          vibrate: true,
        },
        trigger: {
          seconds: interval * i / 1000,
          repeats: true,
        },
      });
    }
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

export default HomeScreen;