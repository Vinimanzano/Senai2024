import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:geolocator/geolocator.dart';

class CreateEntryScreen extends StatefulWidget {
  @override
  _CreateEntryScreenState createState() => _CreateEntryScreenState();
}

class _CreateEntryScreenState extends State<CreateEntryScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  DateTime? _selectedDate;
  String? _location;
  XFile? _mediaFile;

  Future<void> _pickMedia() async {
   final ImagePicker picker = ImagePicker();
final XFile? pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _mediaFile = pickedFile;
      });
    }
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.requestPermission();
    
    if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Permissão de localização negada.')),
      );
      return;
    }

    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    setState(() {
      _location = 'Lat: ${position.latitude}, Long: ${position.longitude}';
    });
  }

  Future<void> _createEntry() async {
    await FirebaseFirestore.instance.collection('entries').add({
      'title': _titleController.text,
      'description': _descriptionController.text,
      'date': _selectedDate,
      'location': _location,
      'media_url': _mediaFile?.path,
    });
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Criar Entrada')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Título'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(labelText: 'Descrição'),
            ),
            TextField(
              decoration: InputDecoration(
                labelText: 'Localização',
                suffixIcon: IconButton(
                  icon: Icon(Icons.location_on),
                  onPressed: _getCurrentLocation,
                ),
              ),
              readOnly: true,
              controller: TextEditingController(text: _location),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _pickMedia,
              child: const Text('Selecionar Imagem ou Vídeo'),
            ),
            if (_mediaFile != null) 
              Text('Arquivo selecionado: ${_mediaFile!.name}'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                if (_titleController.text.isNotEmpty && _descriptionController.text.isNotEmpty) {
                  _createEntry();
                }
              },
              child: const Text('Salvar Entrada'),
            ),
          ],
        ),
      ),
    );
  }
}