import React, { useState, useEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';

const configureNotifications = async (timesPerDay: number) => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert(
        "Permissão de Notificação",
        "Para receber lembretes de hidratação, você precisa conceder permissão para notificações.",
        [{ text: "OK" }]
      );
      console.error('Falha ao obter permissão para notificações');
      return;
    }
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('water-channel', {
      name: 'Water Channel',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
  const intervalInSeconds = Math.max(24 * 3600 / timesPerDay, 60);

  for (let i = 0; i < timesPerDay; i++) {
    const triggerTime = i * intervalInSeconds;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de Beber Água!",
        body: "Lembre-se de se manter hidratado ao longo do dia. Beber água ajuda a manter sua energia, melhora a digestão e contribui para a saúde geral do seu corpo. Não se esqueça de beber água agora!",
      },
      trigger: {
        seconds: triggerTime,
        repeats: true,
      },
    });
  }
};

const IndexScreen: React.FC = () => {
  const [timesPerDay, setTimesPerDay] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timesPerDay !== '' && timesPerDay > 0 && timesPerDay <= 100) {
      if (Platform.OS !== 'web') {
        configureNotifications(timesPerDay);
      }
      setError(null);
    } else if (timesPerDay !== '') {
      setError('O número de vezes por dia deve estar entre 1 e 100.');
    }
  }, [timesPerDay]);

  const handleReminder = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        "Lembrete",
        "O recurso de lembrete não está disponível na versão web.",
        [{ text: "OK" }]
      );
      return;
    }

    if (timesPerDay !== '' && timesPerDay > 0 && timesPerDay <= 100) {
      configureNotifications(timesPerDay);
    } else {
      Alert.alert(
        "Erro",
        "O número de vezes por dia deve estar entre 1 e 100.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/agua.png')}
          style={styles.reactLogo}
        />
      }
      style={[styles.container]}
    >
      <ThemedView style={styles.titleContainer}>
        <Icon name="tint" size={30} color="#1e5878" style={styles.icon} />
        <ThemedText type="title" style={styles.title}>Bem-vindo ao Desafio da Hidratação!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.infoCard}>
        <Text style={styles.infoTitle}>Importância da Hidratação</Text>
        <Text style={styles.infoText}>
          A hidratação é crucial para o bom funcionamento do corpo. Beber água regularmente ajuda a manter o nível de energia, melhora a digestão e promove a saúde geral.
        </Text>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <Text style={styles.label}>Quantas vezes por dia você deseja ser lembrado de beber água?</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o número de lembretes por dia"
          keyboardType="numeric"
          value={timesPerDay.toString()}
          onChangeText={(value) => setTimesPerDay(value === '' ? '' : parseInt(value))}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button title="Configurar Lembretes" onPress={handleReminder} />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff', // Título em branco
  },
  infoCard: {
    backgroundColor: '#34495e', // Fundo do cartão
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffff', // Título em branco
  },
  infoText: {
    fontSize: 16,
    color: '#ecf0f1', // Texto do tópico
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#7f8c8d', // Subtítulo
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#bdc3c7', // Descrição do tópico
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  reactLogo: {
    width: 500,
    height: 300,
  },
});

export default IndexScreen;