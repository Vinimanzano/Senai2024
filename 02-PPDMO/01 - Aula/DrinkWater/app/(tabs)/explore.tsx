import React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Image, Platform, View, Button, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const handleReminder = () => {
    Alert.alert(
      "Hora de Beber Água!",
      "Lembre-se de beber um copo d'água agora para se manter hidratado. É essencial para a sua saúde!",
      [{ text: "OK" }]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="water" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mantenha-se Hidratado!</ThemedText>
      </ThemedView>
      <ThemedText>
        Este aplicativo é projetado para ajudá-lo a manter-se hidratado. Beber água regularmente é essencial para sua saúde.
        Aqui você encontrará informações úteis e lembretes para garantir que você não se esqueça de beber água ao longo do dia.
      </ThemedText>
      <View style={styles.buttonContainer}>
        <Button title="Receber Lembrete de Hidratação" onPress={handleReminder} />
      </View>
      <Collapsible title="Sobre o Aplicativo">
        <ThemedText>
          Este aplicativo inclui exemplos de código para ajudá-lo a começar. Você pode explorar as diferentes funcionalidades e personalizar o aplicativo de acordo com suas necessidades.
        </ThemedText>
        <ThemedText>
          O arquivo de layout em <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText> configura o navegador de abas.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Suporte para Android, iOS e Web">
        <ThemedText>
          Você pode abrir este projeto em Android, iOS e na web. Para abrir a versão web, pressione{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> no terminal em que este projeto está rodando.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Imagens">
        <ThemedText>
          Para imagens estáticas, você pode usar os sufixos <ThemedText type="defaultSemiBold">@2x</ThemedText> e{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> para fornecer arquivos para diferentes densidades de tela.
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Fontes Personalizadas">
        <ThemedText>
          Abra <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> para ver como carregar{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            fontes personalizadas como esta.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Componentes em Modo Claro e Escuro">
        <ThemedText>
          Este template possui suporte para modo claro e escuro. O{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> permite inspecionar
          o esquema de cores atual do usuário e ajustar as cores da IU de acordo.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animações">
        <ThemedText>
          Este template inclui um exemplo de um componente animado. O{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> usa
          a poderosa biblioteca <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>
          para criar uma animação de mão acenando.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              O componente <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              fornece um efeito de paralaxe para a imagem de cabeçalho.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#00BFFF', // Azul claro para simbolizar água
    bottom: -40,
    left: -45,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
