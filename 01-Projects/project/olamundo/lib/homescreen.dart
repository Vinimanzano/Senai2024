import 'package:flutter/material.dart';
import 'package:olamundo/main.dart';
import 'bairros.dart';

class HomeScreen extends StatelessWidget {
  final String username;

  HomeScreen({required this.username});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tela Inicial'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Bem - Vindo(a)',
              style: TextStyle(fontSize: 35),
            ),
            SizedBox(height: 20),
            Text(
              'Ola, $username',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text('Escolha seu Bairro'),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => BairrosScreen()),
                );
              },
            ),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text('Sair'),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => MyApp()),
                );
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Logout bem-sucedido!')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
