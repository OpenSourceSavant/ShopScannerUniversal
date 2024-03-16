import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput,Image } from 'react-native';
import { useSearchBox } from 'react-instantsearch-core';
import search_icon from '..//..//assets/search_icon.png'; // Replace with the correct path

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <View style={styles.inputContainer}>
      <Image source={search_icon} style={{width:22,height:22,marginLeft:5}}/>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={inputValue}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
        placeholder="Search with product name or store"
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15,
    margin:10,
    borderColor:'#d3d3d3',
    borderWidth:1,
    borderRadius:25,
    padding:5,
    paddingLeft:10,
    backgroundColor:'white'
  },
  input: {
    height: 30,
    flex:1,
    color:'#d3d3d3',
    marginLeft:15
  },
});