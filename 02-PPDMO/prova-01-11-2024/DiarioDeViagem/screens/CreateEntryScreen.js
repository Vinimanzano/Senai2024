// screens/CreateEntryScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';

const CreateEntryScreen = ({ updateEntries }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [uriImagem, setUriImagem] = useState('');

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setUriImagem(resultado.assets[0].uri);
    }
  };

  const enviarDados = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const entryRef = await addDoc(collection(db, 'entries'), { titulo, descricao });
      console.log('Entrada criada com ID:', entryRef.id);

      const newEntry = { id: entryRef.id, titulo, descricao };

      // Enviar imagem se uma URI estiver definida
      if (uriImagem) {
        const response = await fetch(uriImagem);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${entryRef.id}.jpg`);
        await uploadBytes(imageRef, blob);
      }

      updateEntries(newEntry);
      Alert.alert('Sucesso', 'Entrada criada com sucesso!');
      setTitulo('');
      setDescricao('');
      setUriImagem('');
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Nova Entrada</Text>
      <TextInput 
        placeholder="Título" 
        value={titulo} 
        onChangeText={setTitulo} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Descrição" 
        value={descricao} 
        onChangeText={setDescricao} 
        style={styles.input} 
        multiline 
        numberOfLines={4} 
      />
      <TouchableOpacity style={styles.imageButton} onPress={escolherImagem}>
        <Text style={styles.buttonText}>Selecionar Imagem da Galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={enviarDados}>
        <Text style={styles.submitButtonText}>Criar Entrada</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    color: '#000000',
  },
  imageButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28A745',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default CreateEntryScreen;































































































// CRIADO POR VINÍCIUS MANZANO, COPIA NAO!
