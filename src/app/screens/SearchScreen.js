import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Item, Input, Icon, Button} from 'native-base';
import BookItem from '../components/BookItem';
import {BOOK_URL} from '../utils/config/urls';

const SearchBookScreen = ({route, navigation}) => {
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
  const selectBookItemHandler = (
    title,
    coverId,
    author,
    availability,
    editionCount,
  ) => {
    navigation.navigate('BookDetails', {
      title,
      coverId,
      author,
    });
  };

  return (
    <View>
      <View style={styles.mainContainer}>
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
              searchBook(searchText);
            }}
            style={{
              width: 100,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              marginRight: 30,
            }}>
            <Text>Search</Text>
          </Button>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            marginTop: 30,
          }}
        />
      ) : bookRecord ? (
        <FlatList
          data={bookRecord}
          renderItem={itemData => (
            <BookItem
              title={itemData.item.title}
              coverId={itemData.item.cover_i}
              author={`by ${
                itemData.item.author_name
                  ? itemData.item.author_name[0]
                    ? itemData.item.author_name[0]
                    : 'No Author'
                  : 'No Author'
              }`}
              onReadingView={() =>
                selectBookItemHandler(
                  itemData.item.title,
                  itemData.item.cover_i,
                  itemData.item.author_name[0],
                )
              }
            />
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 30,
            paddingTop: 20,
            paddingBottom: 150,
            paddingRight: 30,
          }}
          numColumns={2}
        />
      ) : (
        <Text style={{color: 'black'}}>No Book Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 30,
    paddingTop: 30,
    marginBottom: 30,
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
  buttonStyles: {
    height: 40,
  },
});

export default SearchBookScreen;
