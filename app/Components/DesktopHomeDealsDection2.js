import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { db } from '../../firebaseConfig';
import { getDocs, query, collection, limit } from 'firebase/firestore';

const DesktopHomeDealsDection2 = () => {
  const [deals, setDeals] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {

    const fetchDealsData = async () => {
      try {
        // Assuming your Firestore configuration is already set up
        const fetchDealsQuery = query(collection(db, 'deals'), limit(25));
        const dealsSnapshot = await getDocs(fetchDealsQuery);
        print('#FETCHING DEALS')
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
      <Card elevation={2} style={{ margin: 8, borderRadius: 16 }}>
        <Card.Cover source={{ uri: deal.imageUrl }} style={{ height: 180 }} />
        <Card.Content>
          <Title>{deal.productTitle}</Title>
          <Paragraph>
            <Text style={{ fontWeight: 'bold', color: 'green' }}>{`₹${deal.dealPrice}`}</Text>
            {`  ₹${deal.mrp}`}
          </Paragraph>
          <Paragraph>{`Updated ${timeAgo(deal.dealTime)}`}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => handleCategoryClick(deal.Tags)}>
            Shop Now
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const handleScroll = (direction) => {
    const cardWidth = 250; // Adjust this value based on your card width
    const containerWidth = deals.length * cardWidth;
    const maxScroll = containerWidth - window.innerWidth;
    let newPosition = scrollPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - cardWidth);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + cardWidth);
    }

    setScrollPosition(newPosition);
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {'  Top Deals:'}
        </Text>
        <Button
          mode="contained"
          color="blue"
          onPress={() => console.log('View All Deals')}
          style={{ fontSize: 15 }}
        >
          View All Deals
        </Button>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            transition: 'transform 0.5s ease',
            transform: [{ translateX: -scrollPosition }],
          }}
        >
          {deals.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          transform: [{ translateY: -50 }],
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <Button mode="contained" onPress={() => handleScroll('left')}>
          {'<'}
        </Button>
        <Button mode="contained" onPress={() => handleScroll('right')}>
          {'>'}
        </Button>
      </View>
    </View>
  );
};

export default DesktopHomeDealsDection2;
