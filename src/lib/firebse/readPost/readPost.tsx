'use client';
import { useAuth } from '@/lib/context/authContext/auth';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, getDoc, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

// Define the shape of the post data
interface Post {
  id: string;
  [key: string]: any; // Additional fields in the post object
}

interface UsePostReturn {
  data: Post[] | undefined;
  error: string | null;
  loading: boolean;
}

// Hook for fetching posts
export function usePost(): UsePostReturn {
  const { user } = useAuth(); // Retrieve the current user
  const userId = user?.uid; // User ID of the currently logged-in user

  const { data, error } = useSWRSubscription(
    ['post', userId],
    ([path, userId], { next }) => {
      if (!userId) return;

      const ref = query(collection(db, path), where("userId", "==", userId)); // Filter by userId
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(null, snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Ensure ID is included in data
        },
        (error) => {
          next(error?.message || "Unknown error"); // Pass error to SWR
        }
      );

      return () => unsub();
    }
  );

  return {
    data,
    error: error || null,
    loading: data === undefined
  };
}

// Utility function to fetch a single author
export const getPost = async (id: string): Promise<DocumentSnapshot<DocumentData>> => {
  const docRef = doc(db, 'post', id); // Referencing specific category doc
  const docSnapshot = await getDoc(docRef); // Fetching document snapshot
  return docSnapshot; // Return the snapshot for data access
};
