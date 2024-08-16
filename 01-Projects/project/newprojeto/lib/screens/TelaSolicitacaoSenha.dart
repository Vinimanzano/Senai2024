import 'package:flutter/material.dart';

class TelaSolicitacaoSenha extends StatefulWidget {
  @override
  _TelaSolicitacaoSenhaState createState() => _TelaSolicitacaoSenhaState();
}

class _TelaSolicitacaoSenhaState extends State<TelaSolicitacaoSenha> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';

  void _enviarEmailConfirmacao() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // Simula o envio de um e-mail de confirmação
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('E-mail de confirmação enviado para $_email.')),
      );
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => TelaSolicitacaoSenha()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Solicitar Redefinição de Senha'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, insira seu e-mail';
                    }
                    if (!RegExp(r'\S+@\S+\.\S+').hasMatch(value)) {
                      return 'Por favor, insira um e-mail válido';
                    }
                    return null;
                  },
                  onSaved: (value) {
                    _email = value!;
                  },
                ),
                SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: _enviarEmailConfirmacao,
                  child: Text('Enviar E-mail de Confirmação'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
