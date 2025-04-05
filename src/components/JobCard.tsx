import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { BookmarkContext } from '../context/BookmarkContext';
import { Job } from '../../types';

type JobCardProps = {
  job: Job;
  onPress?: () => void;
  mode?: 'default' | 'bookmark';
};

const JobCard = ({ job, onPress, mode = 'default' }: JobCardProps) => {
  const { addBookmark, removeBookmark } = useContext(BookmarkContext);

  const handleLongPress = () => {
    if (mode === 'bookmark') {
      Alert.alert(
        'Remove Bookmark',
        'Do you want to remove this job from bookmarks?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => removeBookmark(job.id) },
        ]
      );
    } else {
      Alert.alert(
        'Bookmark Job',
        'Do you want to bookmark this job?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => addBookmark(job) },
        ]
      );
    }
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      onLongPress={handleLongPress}
    >
      <Text style={styles.title}>{job.title || 'Untitled Job'}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Location: </Text>
        <Text style={styles.value}>{job.location || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Salary: </Text>
        <Text style={styles.value}>₹{job.salary || 'Not Disclosed'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone: </Text>
        <Text style={styles.value}>{job.phone || 'N/A'}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    color: '#444',
  },
});

export default JobCard;
