import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ImagePicker _picker = ImagePicker();
  File? _imageFile;
  File? _videoFile;
  final _nameController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _hasUnsavedChanges = false;

  Future<void> _pickMedia() async {
    final XFile? pickedFile = await showDialog<XFile>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Escolha uma opção'),
          actions: [
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop(await _picker.pickImage(source: ImageSource.camera));
              },
              child: Text('Tirar Foto'),
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop(await _picker.pickImage(source: ImageSource.gallery));
              },
              child: Text('Escolher Imagem da Galeria'),
            ),
          ],
        );
      },
    );

    if (pickedFile != null) {
      setState(() {
        if (pickedFile.path.endsWith('.mp4')) {
          _videoFile = File(pickedFile.path);
        } else {
          _imageFile = File(pickedFile.path);
        }
        _hasUnsavedChanges = true;
      });
    }
  }

  Future<bool> _onWillPop() async {
    if (_hasUnsavedChanges) {
      return (await showDialog<bool>(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Confirmar Saída'),
            content: Text('Você tem alterações não salvas. Deseja sair sem salvar?'),
            actions: <Widget>[
              TextButton(
                child: Text('Cancelar'),
                onPressed: () {
                  Navigator.of(context).pop(false);
                },
              ),
              TextButton(
                child: Text('Sair Sem Salvar'),
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
              ),
            ],
          );
        },
      )) ?? false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Perfil'),
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Foto do perfil
                CircleAvatar(
                  radius: 50,
                  backgroundImage: _imageFile != null
                      ? FileImage(_imageFile!)
                      : AssetImage('assets/profile_picture.png') as ImageProvider,
                ),
                SizedBox(height: 20),
                // Botão para escolher imagem ou vídeo
                ElevatedButton(
                  onPressed: _pickMedia,
                  child: Text('Escolher Imagem ou Vídeo'),
                ),
                SizedBox(height: 20),
                // Exibir imagem ou vídeo selecionado
                _imageFile != null
                    ? Image.file(
                        _imageFile!,
                        width: 100,
                        height: 100,
                        fit: BoxFit.cover,
                      )
                    : _videoFile != null
                        ? Text('Vídeo Selecionado: ${_videoFile!.path}')
                        : Container(),
                SizedBox(height: 20),
                // Campos para alteração de nome e senha
                TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    labelText: 'Nome',
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) {
                    setState(() {
                      _hasUnsavedChanges = true;
                    });
                  },
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Senha Atual',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 20),
                // Botão para salvar alterações
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Alterações salvas com sucesso!')),
                    );
                    setState(() {
                      _hasUnsavedChanges = false;
                      _imageFile = null;
                      _videoFile = null;
                      _nameController.clear();
                      _passwordController.clear();
                    });
                  },
                  child: Text('Salvar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
