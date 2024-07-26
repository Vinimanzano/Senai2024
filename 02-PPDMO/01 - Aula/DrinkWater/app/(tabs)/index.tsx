import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';

const configureNotifications = async () => {
  try {
    // Solicitar permissões para notificações
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Falha ao obter permissão para notificações');
      return;
    }

    // Configurar canal de notificações para Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('water-channel', {
        name: 'Water Channel',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Agendar notificações
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de Beber Água!",
        body: "Manter-se hidratado é essencial para a sua saúde. Beber água regularmente ajuda na digestão, circulação e manutenção da temperatura do seu corpo. Não se esqueça de beber um copo d'água agora!",
      },
      trigger: {
        seconds: 60,
        repeats: true,
      },
    });
  } catch (error) {
    console.error('Erro na configuração das notificações:', error);
  }
};

const HomeScreen: React.FC = () => {
  useEffect(() => {
    configureNotifications();
  }, []);

  const handleReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de Beber Água!",
        body: "Lembre-se de beber um copo d'água agora para se manter hidratado. É essencial para a sua saúde!",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/agua.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Icon name="tint" size={30} color="#000" style={styles.icon} />
        <ThemedText type="title">Bem-vindo ao Desafio da Hidratação!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Dicas para Se Manter Hidratado</ThemedText>
        <ThemedText>
          Manter-se hidratado é crucial para a sua saúde. Beber água regularmente ajuda a melhorar a digestão, manter a pele saudável e regular a temperatura do corpo.
          Tente beber um copo d'água a cada hora. É um ótimo hábito para a sua saúde!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pronto para o Desafio?</ThemedText>
        <ThemedText>
          Clique no botão abaixo para receber um lembrete agora. Não se esqueça de beber água regularmente!
        </ThemedText>
        <Button title="Receber Lembrete" onPress={handleReminder} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Editando o App</ThemedText>
        <ThemedText>
          Edite <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> para ver as alterações.
          Pressione{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          para abrir as ferramentas de desenvolvimento.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 2: Explore</ThemedText>
        <ThemedText>
          Toque na aba Explorar para aprender mais sobre o que está incluído neste aplicativo inicial.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Passo 3: Comece do Zero</ThemedText>
        <ThemedText>
          Quando estiver pronto, execute{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> para começar com um novo{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText>. Isso moverá o <ThemedText type="defaultSemiBold">app</ThemedText> atual para{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  icon: {
    marginRight: 10,
  },
});

export default HomeScreen;
