import 'package:flutter/material.dart';
import 'package:newprojeto/screens/os_screen.dart';

class BairrosScreen extends StatelessWidget {
  final List<String> bairros = [
    'Centro', 'Área Industrial I', 'Área Industrial II', 'Área Industrial III',
    'Jardim Boa Vista', 'Jardim Cidade Nova', 'Jardim das Paineiras', 'Jardim dos Coqueiros',
    'Jardim dos Ipês', 'Jardim dos Pássaros', 'Jardim dos Sapateiros', 'Jardim Esplanada',
    'Jardim Glória', 'Jardim Haro', 'Jardim Imperial', 'Jardim Planalto', 'Jardim Santa Rosa',
    'Jardim São Bento', 'Jardim São José', 'Jardim São Luís', 'Jardim São Paulo', 'Jardim São Sebastião',
    'Jardim São Vicente', 'Jardim Vila Rica', 'Jardim Vila Nova', 'Jardim Vila São João',
    'Jardim Vila São Luís', 'Jardim Vitória', 'Parque das Flores', 'Parque das Nações',
    'Parque dos Eucaliptos', 'Parque dos Sabiás', 'Parque Santa Gertrudes', 'Parque São João',
    'Recanto das Flores', 'Recanto dos Pássaros', 'Recanto do Sol', 'Vila Barreto',
    'Vila Georgina', 'Vila São João', 'Vila São José', 'Vila São Luís', 'Vila São Paulo',
    'Vila São Pedro', 'Vila São Sebastião', 'Vila São Vicente', 'Vila Tupi', 'Vila União',
    'Vila Vitória', 'Vila Yeda', 'Jardim das Paineiras', 'Jardim dos Coqueiros',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bairros'),
      ),
      body: ListView.separated(
        itemCount: bairros.length,
        separatorBuilder: (context, index) => Divider(),
        itemBuilder: (context, index) {
          return Card(
            elevation: 4.0,
            margin: EdgeInsets.symmetric(vertical: 12.0, horizontal: 10.0),
            child: ListTile(
              contentPadding: EdgeInsets.all(15.0),
              leading: Icon(Icons.location_on, color: Colors.blue),
              title: Text(
                bairros[index],
                style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => OsScreen(bairro: bairros[index]),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
