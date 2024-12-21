import { collection, getDocs, query, orderBy, where, DocumentData, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Post {
  id: string;
  uid: string;
  message: string;
  media: string;
  timestamp: Timestamp;
  author?: {
    name: string;
    photoURL: string;
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data() as Omit<Post, 'id'>
      });
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('uid', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data() as Omit<Post, 'id'>
      });
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
}
