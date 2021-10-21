import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button} from 'native-base';
import BookItem from '../components/BookItem';

const BookDetailScreen = ({route, navigation}) => {
  const [searchText, onChangeSearchText] = useState('');
  const [bookRecord, setBookRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBook = searchText => {
    setLoading(true);
    let i = 0,
      length = searchText.length;
    for (i; i < length; i++) {
      searchText = searchText.replace(' ', '%20');
    }
    const endpoint = `search.json?q=${searchText}`;
    fetch(BOOK_URL + endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response Data: ', data);
        setBookRecord(data.docs);
        setLoading(false);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <BookItem
        title={null}
        coverId={route.params.coverId}
        author={null}
        detailed={true}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearchText}
          value={searchText}
          placeholder="Search Book"
          placeholderTextColor="black"
        />
        <Button
          primary
          onPress={() => {
            searchInside(searchText);
          }}
          style={{
            width: 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginRight: 30,
          }}>
          <Text>Search Inside</Text>
        </Button>
      </View>
      <View style={styles.details}>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>Book Title: </Text>
          {route.params.title}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>Book Author: </Text>
          {route.params.author}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>Edition Count: </Text>
          {route.params.editionCount}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>ISBN: </Text>
          {route.params.availability
            ? route.params.availability.isbn
              ? route.params.availability.isbn
              : 'No ISBN found'
            : 'No Availability Data Found'}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>OCLC: </Text>{' '}
          {route.params.availability
            ? route.params.availability.oclc
              ? route.params.availability.oclc
              : 'No OCLC found'
            : 'No Availability Data Found'}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>Open Library Work: </Text>{' '}
          {route.params.availability
            ? route.params.availability.openlibrary_work
              ? route.params.availability.openlibrary_work
              : 'No Open Library Work found'
            : 'No Availability Data Found'}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.subTitle}>Open Library Edition: </Text>{' '}
          {route.params.availability
            ? route.params.availability.openlibrary_edition
              ? route.params.availability.openlibrary_edition
              : 'No Open Library Edition found'
            : 'No Availability Data Found'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 30,
    paddingTop: 30,
  },
  textStyle: {
    color: 'black',
    width: '80%',
  },
  subTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  details: {
    marginTop: 30,
  },
  input: {
    height: 40,
    width: '60%',
    marginTop: 30,
    borderWidth: 1,
    marginRight: 10,
    color: 'black',
    paddingLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BookDetailScreen;
