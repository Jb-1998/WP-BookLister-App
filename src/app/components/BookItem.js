import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Card, CardItem} from 'native-base';

const BookCardItem = props => {
  return (
    <TouchableOpacity onPress={props.onReadingView} style={styles.bookTitle}>
      <Card style={styles.cardDesign}>
        <CardItem cardBody>
          <ImageBackground
            style={props.detailed ? styles.imageDetailed : styles.image}
            source={{
              uri: `https://covers.openlibrary.org/b/id/${props.coverId}-M.jpg`,
            }}></ImageBackground>
        </CardItem>
      </Card>
      {props.title ? (
        <Text style={styles.titleStyle} numberOfLines={1} ellipsizeMode="tail">
          {props.title}
        </Text>
      ) : null}
      {props.author ? (
        <Text style={styles.textStyle}>{props.author}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: 150,
  },
  imageDetailed: {
    height: 300,
    width: 210,
  },
  cardDesign: {
    marginRight: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 15,
    width: 150,
  },
  bookTitle: {
    alignItems: 'flex-start',
  },
  titleStyle: {
    paddingLeft: 5,
    fontSize: 13,
    width: 80,
    color: 'black',
    fontWeight: 'bold',
    height: '100%',
    flex: 1,
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 11,
    width: '50%',
    color: 'black',
    marginBottom: 15,
  },
});

export default BookCardItem;
