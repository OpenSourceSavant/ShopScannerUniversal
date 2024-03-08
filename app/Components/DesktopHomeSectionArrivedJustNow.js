import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DesktopHomeSectionArrivedJustNow = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDealsData = async () => {
      try {
        const fetchDealsQuery = query(collection(db, 'deals'), limit(25));
        const dealsSnapshot = await getDocs(fetchDealsQuery);

        const fetchedDeals = dealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDeals(fetchedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDealsData();
  }, []);

  const handleCategoryClick = (tags) => {
    console.log('Category clicked with tags:', tags);
  };

  const timeAgo = (firestoreTimestamp) => {
    const dealDate = new Date(firestoreTimestamp.seconds * 1000);
    const now = new Date();
    const differenceInSeconds = Math.round((now - dealDate) / 1000);
    const minutes = Math.round(differenceInSeconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const DealCard = ({ deal }) => {
    return (
      <Card elevation={2} style={{ margin: 8 }}>
        <Card.Cover source={{ uri: deal.imageUrl }} style={{ height: 180 }} />
        <Card.Content>
          <Title>{deal.productTitle}</Title>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text>{`₹${deal.dealPrice}`}</Text>
            <Text style={{ marginLeft: 8, textDecorationLine: 'line-through' }}>{`₹${deal.mrp}`}</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleCategoryClick(deal.Tags)}>Shop Now</Button>
        </Card.Actions>
        <Card.Actions style={{ marginTop: 'auto' }}>
          <Paragraph>{`Updated ${timeAgo(deal.dealTime)}`}</Paragraph>
        </Card.Actions>
      </Card>
    );
  };

  const sliderSettings = {
    autoplay: true,
    autoplayDelay: 4000,
    autoplayLoop: true,
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Flash Deals:</Text>
      <SwiperFlatList {...sliderSettings}>
        {deals.map((deal, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryClick(deal.Tags)}>
            <DealCard deal={deal} />
          </TouchableOpacity>
        ))}
      </SwiperFlatList>
      <Button
        mode="contained"
        onPress={() => console.log('View All Deals')}
        style={{ margin: 10 }}
      >
        View All Deals
      </Button>
    </View>
  );
};

export default DesktopHomeSectionArrivedJustNow;
