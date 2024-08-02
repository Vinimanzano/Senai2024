import React from 'react';
import { HtmlView } from 'react-native-htmlview';

const HtmlComponent: React.FC = () => {
  return (
    <HtmlView
      value="<p>Desenvolvido por Vinícius Manzano</p>"
      stylesheet={{ p: { fontSize: 18, color: '#333' } }}
    />
  );
};

export default HtmlComponent;