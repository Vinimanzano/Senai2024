// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleRegister = async () => {
    if (password.length < 6) {
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Usuário criado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="#B0B0B0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
        {!isPasswordValid && (
          <Text style={styles.errorText}>A senha deve ter pelo menos 6 dígitos.</Text>
        )}
      </View>
      <Button title="Registrar" onPress={handleRegister} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    marginBottom: 10,
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
  errorText: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
  },
});

export default RegisterScreen;
































































































// CRIADO POR VINÍCIUS MANZANO, COPIA NAO!