import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

const JobDetailScreen: React.FC<Props> = ({ route }) => {
  const { job } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{job.location}</Text>

      <Text style={styles.label}>Salary:</Text>
      <Text style={styles.value}>₹{job.salary}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{job.phone}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{job.description || 'No description provided.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default JobDetailScreen;
