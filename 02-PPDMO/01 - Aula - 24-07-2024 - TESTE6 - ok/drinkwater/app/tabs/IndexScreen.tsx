import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const IndexScreen: React.FC = () => {
  const [waterAmountLiters, setWaterAmountLiters] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    requestPermissions();
    configureNotificationHandler();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissões de Notificação',
        'Você precisa conceder permissões para notificações para receber lembretes de hidratação.',
        [{ text: 'OK' }],
      );
    }
  };

  const configureNotificationHandler = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const handleSetWaterAmount = async () => {
    if (!waterAmountLiters || isNaN(Number(waterAmountLiters)) || Number(waterAmountLiters) < 1 || Number(waterAmountLiters) > 4) {
      setErrorMessage('Por favor, insira uma quantidade válida.');
    } else {
      const amountInLiters = Number(waterAmountLiters);

      Alert.alert(
        'Quantidade de Água Definida',
        `Você definiu ${amountInLiters.toFixed(1)} litros de água por dia.`,
      );

      setErrorMessage('');
      await scheduleNotifications(amountInLiters);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Quantidade de Água Definida',
          body: `Você definiu ${amountInLiters.toFixed(1)} litros de água por dia.`,
        },
        trigger: null,
      });
    }

    Keyboard.dismiss();
  };

  const scheduleNotifications = async (liters: number) => {
    const notificationsPerDay = liters * 4;
    const interval = 60 * 60;

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (let i = 1; i <= notificationsPerDay; i++) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hora de Beber Água!',
          body: 'Lembre-se de beber água para manter-se hidratado.',
          sound: true,
        },
        trigger: {
          seconds: i * interval,
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

export default IndexScreen;