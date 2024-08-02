import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Solicitar permissão para notificações
const requestNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      throw new Error('Permissão para notificações não concedida!');
    }
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

// Configurar notificações
const configureNotifications = async (intervalInHours: number) => {
  try {
    await requestNotificationPermissions();
    await Notifications.cancelAllScheduledNotificationsAsync();

    const intervalInSeconds = Math.max(intervalInHours * 3600, 60);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de Beber Água!",
        body: "Lembre-se de se manter hidratado ao longo do dia!",
      },
      trigger: {
        seconds: intervalInSeconds,
        repeats: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};