import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:diarioviagem/screens/ViewEntryScreen.dart';
import 'package:diarioviagem/screens/CreateEntryScreen.dart';
import 'package:diarioviagem/screens/login_screen.dart';
import 'dart:io';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Entradas'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance.collection('entries').snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          final entries = snapshot.data?.docs ?? [];
          return ListView.builder(
            itemCount: entries.length,
            itemBuilder: (context, index) {
              final entry = entries[index].data() as Map<String, dynamic>;
              final title = entry['title'] ?? 'Título não disponível';
              final description = entry['description'] ?? 'Descrição não disponível';
              final location = entry['location'] ?? 'Localização não disponível';
              final mediaUrl = entry['media_url'];

              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                child: ListTile(
                  title: Text(title),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(description),
                      const SizedBox(height: 4),
                      Text(location, style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                  trailing: mediaUrl != null 
                      ? (mediaUrl.startsWith('http') 
                          ? Image.network(mediaUrl, width: 50, height: 50, fit: BoxFit.cover) 
                          : Image.file(File(mediaUrl), width: 50, height: 50, fit: BoxFit.cover))
                      : null,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ViewEntryScreen(entryId: entries[index].id)),
                    );
                  },
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => CreateEntryScreen()),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
