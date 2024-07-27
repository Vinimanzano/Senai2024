import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';

const configureNotifications = async (timesPerDay: number) => {
  try {
    // Solicita permissões para notificações
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

    // Configuração do canal para Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('water-channel', {
        name: 'Water Channel',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Cancela todas as notificações agendadas
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Calcula o intervalo mínimo de 60 segundos
    const intervalInSeconds = Math.max(24 * 3600 / timesPerDay, 60);

    // Agenda as notificações
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
  } catch (error) {
    console.error('Erro na configuração das notificações:', error);
  }
};

const IndexScreen: React.FC = () => {
  const [timesPerDay, setTimesPerDay] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [notificationsConfigured, setNotificationsConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (timesPerDay !== '' && timesPerDay > 0 && timesPerDay <= 100) {
      if (Platform.OS !== 'web' && !notificationsConfigured) {
        configureNotifications(timesPerDay);
        setNotificationsConfigured(true);
      }
      setError(null);
    } else if (timesPerDay !== '') {
      setError('O número de vezes por dia deve estar entre 1 e 100.');
    }
  }, [timesPerDay, notificationsConfigured]);

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
      if (!notificationsConfigured) {
        await configureNotifications(timesPerDay);
        setNotificationsConfigured(true);
      } else {
        Alert.alert(
          "Lembrete",
          "As notificações já foram configuradas.",
          [{ text: "OK" }]
        );
      }
    } else {
      Alert.alert(
        "Erro",
        "O número de vezes por dia deve estar entre 1 e 100.",
        [{ text: "OK" }]
      );
    }
  };

  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1D3D47' : '#A1CEDC';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/agua.png')}
          style={styles.reactLogo}
        />
      }
      style={[styles.container, { backgroundColor }]}
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
          style={[styles.input, { borderColor: error ? 'red' : '#ccc' }]}
          keyboardType="numeric"
          value={timesPerDay === '' ? '' : timesPerDay.toString()}
          onChangeText={(text) => {
            if (text === '') {
              setTimesPerDay('');
              setError(null);
            } else {
              const num = parseInt(text, 10);
              if (num >= 1 && num <= 100) {
                setTimesPerDay(num);
                setError(null);
              } else {
                setError('O número de vezes por dia deve estar entre 1 e 100.');
              }
            }
          }}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button title="Configurar Lembrete" onPress={handleReminder} color="#007BFF" />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reactLogo: {
    width: 400,
    height: 270,
    alignSelf: 'row',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    marginBottom: 10,
  },
  infoCard: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  infoText: {
    fontSize: 14,
    color: '#000',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#fff',
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
  }
});

export default IndexScreen;
