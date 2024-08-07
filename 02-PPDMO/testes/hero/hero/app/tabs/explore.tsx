import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Explore: React.FC = () => {
  const handleSubmit = () => {
    console.log('Formulário de contato enviado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Contacte-nos</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message"
          placeholderTextColor="#ccc"
          multiline
        />
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default Explore;
