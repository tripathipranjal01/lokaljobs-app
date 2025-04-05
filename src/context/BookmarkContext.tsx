import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Job = {
  id: number;
  title: string;
  location: string;
  phone: string;
  salary: string;
  description?: string;
};

type BookmarkContextType = {
  bookmarks: Job[];
  addBookmark: (job: Job) => void;
  removeBookmark: (id: number) => void; 
};

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

type BookmarkProviderProps = {
  children: ReactNode;
};

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const stored = await AsyncStorage.getItem('bookmarkedJobs');
        if (stored) setBookmarks(JSON.parse(stored));
      } catch (err) {
        console.log('Error loading bookmarks:', err);
      }
    };
    loadBookmarks();
  }, []);

  const saveToStorage = async (updated: Job[]) => {
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
  };

  const addBookmark = async (job: Job) => {
    if (bookmarks.find((b) => b.id === job.id)) return;
    const updated = [...bookmarks, job];
    await saveToStorage(updated);
  };

  const removeBookmark = async (id: number) => {
    const updated = bookmarks.filter((job) => job.id !== id);
    await saveToStorage(updated);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
