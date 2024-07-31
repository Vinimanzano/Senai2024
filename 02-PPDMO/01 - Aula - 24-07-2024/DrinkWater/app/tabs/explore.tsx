import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Icon from 'react-native-vector-icons/FontAwesome';

const handleTopicClick = (topic: string) => {
  let message = '';

  switch (topic) {
    case 'Importância da Hidratação':
      message = "A hidratação adequada é essencial para a manutenção da saúde. Beber água ajuda a regular a temperatura do corpo, facilita a digestão, e é vital para a função celular. Além disso, contribui para a saúde da pele e o funcionamento do sistema imunológico.";
      break;
    case 'Benefícios de Beber Água':
      message = "Beber água regularmente melhora a digestão e a absorção de nutrientes. Também ajuda a manter a pele saudável, controla a temperatura do corpo e pode até aumentar a energia e a concentração mental, reduzindo a sensação de fadiga.";
      break;
    case 'Dicas para Manter-se Hidratado':
      message = "Para garantir uma hidratação adequada, leve uma garrafa de água com você e faça pequenas pausas ao longo do dia para beber. Estabeleça lembretes para beber água se necessário, e prefira água pura sobre bebidas com cafeína ou açúcares adicionados.";
      break;
    default:
      message = "Informação não disponível.";
  }

  Alert.alert(
    topic,
    message,
    [{ text: "OK" }]
  );
};

const Explore: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Dicas de Hidratação</Text>
        <Text style={styles.subtitle}>Clique nos tópicos para abrir as informações</Text>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleTopicClick('Importância da Hidratação')}>
            <View style={styles.topicContainer}>
              <Icon name="info-circle" size={24} color="#3498db" />
              <ThemedText type="body" style={styles.topicText}>
                Importância da Hidratação
              </ThemedText>
            </View>
            <ThemedText type="body" style={styles.topicDescription}>
              Entenda por que manter-se hidratado é crucial para sua saúde geral.
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleTopicClick('Benefícios de Beber Água')}>
            <View style={styles.topicContainer}>
              <Icon name="tint" size={24} color="#3498db" />
              <ThemedText type="body" style={styles.topicText}>
                Benefícios de Beber Água
              </ThemedText>
            </View>
            <ThemedText type="body" style={styles.topicDescription}>
              Descubra como a água pode melhorar sua digestão, pele e energia.
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleTopicClick('Dicas para Manter-se Hidratado')}>
            <View style={styles.topicContainer}>
              <Icon name="hand-holding-water" size={24} color="#3498db" />
              <ThemedText type="body" style={styles.topicText}>
                Dicas para Manter-se Hidratado
              </ThemedText>
            </View>
            <ThemedText type="body" style={styles.topicDescription}>
              Conheça estratégias práticas para garantir que você beba água suficiente.
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  scrollView: {
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 20,
    color: '#ffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 16,
    color: '#ecf0f1',
    marginLeft: 10,
    fontWeight: '600',
  },
  topicDescription: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: 5,
  },
});

export default Explore;
