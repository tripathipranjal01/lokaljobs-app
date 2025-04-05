import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { BookmarkContext } from '../context/BookmarkContext';
import JobCard from '../components/JobCard';

const BookmarksScreen = () => {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <View style={styles.container}>
      

      {bookmarks.length === 0 ? (
        <Text style={styles.empty}>No bookmarked jobs yet!</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              mode="bookmark"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
});

export default BookmarksScreen;
