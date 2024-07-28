import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme, TextInput, Platform, View, Button, Alert, StyleSheet, Text, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { configureNotifications } from '@/app/notifications';

const IndexScreen: React.FC = () => {
  const [timesPerDay, setTimesPerDay] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timesPerDay !== '' && timesPerDay > 0 && timesPerDay <= 100) {
      const intervalInHours = 24 / timesPerDay;
      if (Platform.OS !== 'web') {
        configureNotifications(intervalInHours);
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
      const intervalInHours = 24 / timesPerDay;
      configureNotifications(intervalInHours);
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
