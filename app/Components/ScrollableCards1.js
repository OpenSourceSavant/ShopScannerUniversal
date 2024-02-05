import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';

const ScrollableCards1 = ({ cardsData }) => {
  return (
    <ScrollView
      horizontal
      style={{ padding: 16 }}
      showsHorizontalScrollIndicator={false}
    >
      {cardsData.map((card, index) => (
        <Card key={index} style={{ marginRight: 16 }}>
          <Card.Cover source={{ uri: card.image }} style={{ height: 150,width:170, borderRadius: 8,resizeMode:'contain' }} />
       
        </Card>
      ))}
    </ScrollView>
  );
};

export default ScrollableCards1;
