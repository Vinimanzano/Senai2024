import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ViewEntryScreen extends StatelessWidget {
  final String entryId;
  final String? mediaUrl;

  const ViewEntryScreen({Key? key, required this.entryId, this.mediaUrl}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Detalhes da Entrada')),
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

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(entry['title'], style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                SizedBox(height: 8),
                Text(entry['description']),
                SizedBox(height: 8),
                Text('Localização: ${entry['location']}'),
                SizedBox(height: 16),
                if (mediaUrl != null)
                  Image.network(mediaUrl!),
              ],
            ),
          );
        },
      ),
    );
  }
}
