// app/notifications.ts
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export const configureNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permissão de Notificação',
      'Para receber lembretes de hidratação, você precisa conceder permissão para notificações.',
      [{ text: 'OK' }]
    );
    return;
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
