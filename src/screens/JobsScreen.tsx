import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import JobCard from '../components/JobCard';
import { Job, RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type JobsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'JobsList'>;
};

const JobsScreen = ({ navigation }: JobsScreenProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);
    setError(false);
  
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const newJobs = response?.data?.results;
  
      if (Array.isArray(newJobs)) {
        const combinedJobs = [...jobs, ...newJobs];
        const uniqueJobs = Array.from(new Map(combinedJobs.map(job => [job.id, job])).values());
        setJobs(uniqueJobs);
      } else {
        console.warn('Unexpected data format:', response.data);
        setError(true);
      }
    } catch (err) {
      console.error('API fetch error:', err);
      setError(true);
    }
  
    setLoading(false);
  };
  
  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetail', { job: item })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {error && <Text style={{ textAlign: 'center', marginTop: 10 }}>Something went wrong.</Text>}
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id?.toString?.() ?? `${index}`
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="gray" /> : null}
      />
    </View>
  );
};

export default JobsScreen;
