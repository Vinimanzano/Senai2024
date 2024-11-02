import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:io';

class ViewEntryScreen extends StatelessWidget {
  final String entryId;

  ViewEntryScreen({required this.entryId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Visualizar Entrada')),
      body: FutureBuilder<DocumentSnapshot>(
        future: FirebaseFirestore.instance.collection('entries').doc(entryId).get(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (!snapshot.hasData || !snapshot.data!.exists) {
            return const Center(child: Text('Entrada não encontrada'));
          }

          final entry = snapshot.data!.data() as Map<String, dynamic>;
          final mediaUrl = entry['media_url']; 

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(entry['title'], style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                Text(entry['description']),
                const SizedBox(height: 10),
                Text('Localização: ${entry['location'] ?? 'Desconhecida'}'),
                const SizedBox(height: 10),
                if (mediaUrl != null && mediaUrl.isNotEmpty)
                  (mediaUrl.startsWith('http')
                      ? Image.network(mediaUrl)
                      : Image.file(File(mediaUrl)))
                else
                  const Text('Imagem não disponível'),
              ],
            ),
          );
        },
      ),
    );
  }
}
