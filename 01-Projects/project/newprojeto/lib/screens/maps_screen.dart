import 'package:flutter/material.dart';

class MapsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Maps'),
      ),
      body: Center(
        child: Text(
          'Tela de Mapas',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
