import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import BookItem from '../components/BookItem';
import {connect} from 'react-redux';
import {GET_ALL_BOOK_INFO_REQUEST} from '../redux/models/book/actions';

const mapStateToProps = (state, props) => {
  const {books} = state.book;
  return {books};
};

const mapDispatchToProps = (dispatch, props) => ({
  getAllBookInfo: () => {
    dispatch({
      type: GET_ALL_BOOK_INFO_REQUEST,
      payload: {},
    });
  },
});
const BookSelectionScreen = ({books, getAllBookInfo, navigation, ...props}) => {
  const [loading, setLoading] = useState(false);

  const getAllBookData = async () => {
    setLoading(true);
    await getAllBookInfo();
    setLoading(false);
  };
  useEffect(() => {
    getAllBookData();
  }, [getAllBookInfo]);

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
      availability,
      editionCount,
    });
  };
  return (
    <View>
      <View style={styles.headerTitle}>
        <Text style={styles.textStyle}>Available Books</Text>
        <Button
          title="Search"
          onPress={() => {
            navigation.navigate('SearchBook');
          }}
          style={styles.buttonStyles}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            marginTop: 30,
          }}
        />
      ) : (
        <FlatList
          data={books}
          renderItem={itemData => (
            <BookItem
              title={itemData.item.title}
              coverId={itemData.item.cover_id}
              author={`by ${itemData.item.authors[0].name}`}
              onReadingView={() =>
                selectBookItemHandler(
                  itemData.item.title,
                  itemData.item.cover_id,
                  itemData.item.authors[0].name,
                  itemData.item.availability,
                  itemData.item.edition_count,
                )
              }
            />
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 30,
            paddingTop: 20,
            paddingBottom: 100,
            paddingRight: 30,
          }}
          numColumns={2}
        />
      )}
    </View>
  );
};

const BookSelection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookSelectionScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    paddingLeft: 30,
    marginTop: 30,
    marginBottom: 30,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  buttonStyles: {
    textTransform: 'lowercase',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 50,
  },
});

export default BookSelection;
