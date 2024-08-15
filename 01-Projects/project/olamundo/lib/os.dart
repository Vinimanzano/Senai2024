import 'package:flutter/material.dart';

class OsScreen extends StatelessWidget {
  final String bairro;

  const OsScreen({required this.bairro, super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Ordem de Serviço para $bairro'),
      ),
      body: Center(
        child: Text('Detalhes da Ordem de Serviço para o bairro $bairro'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pop(context);
        },
        child: Icon(Icons.arrow_back),
      ),
    );
  }
}
