import React, { useState } from 'react';
import { View, Text, IconButton, Badge } from 'react-native-paper';

const SortAndFilterBar = () => {
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Discount Percentage (High to low)');

  const openSortDrawer = () => {
    setIsSortDrawerOpen(true);
  };

  const closeSortDrawer = () => {
    setIsSortDrawerOpen(false);
  };

  const onSortOptionChange = (value) => {
    setSelectedSortOption(value);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
      {/* Sort Button */}
      <IconButton icon="sort" onPress={openSortDrawer} style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', marginLeft: 5 }}>Sort</Text>
      </IconButton>

      {/* Divider */}

      {/* Filter Button */}
      <IconButton icon={() => <Badge>{2}</Badge>} style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', marginLeft: 5 }}>Filter</Text>
      </IconButton>

     
    </View>
  );
};

export default SortAndFilterBar;
