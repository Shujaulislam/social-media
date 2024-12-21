import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';

// Post Interface
export interface Post {
  id: string;
  uid: string;
  message: string;
  media: string;
  timestamp: Timestamp;
  author?: {
    name: string;
    photoURL: string;
    email: string;
  } | null; // Allow null explicitly
}

// Function to fetch author details by UID
export async function getUserDetails(uid: string): Promise<{ name: string; photoURL: string; email: string } | undefined> {
  try {
    const userDocRef = doc(db, 'admins', uid); // Querying from 'admins' collection
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        name: userData.name,
        photoURL: userData.photoURL,
        email: userData.email,
      };
    } else {
      console.warn(`No user found for UID: ${uid}`);
      return undefined; // Return undefined if no user found
    }
  } catch (error) {
    console.error(`Error fetching user details for UID: ${uid}`, error);
    return undefined; // Return undefined on error
  }
}

// Function to fetch all posts with author details
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'post'); // Fetching from 'post' collection
    const q = query(postsRef, orderBy('timestamp', 'desc')); // Query posts in descending order by timestamp
    const querySnapshot = await getDocs(q);

    const posts: Post[] = [];
    for (const doc of querySnapshot.docs) {
      const postData = doc.data() as Omit<Post, 'id'>;

      // Fetch author details
      const author = await getUserDetails(postData.uid);
      if (!author) {
        console.warn(`No author details found for UID: ${postData.uid}`);
      } else {
        console.log(`Author details fetched for UID: ${postData.uid}`, author);
      }

      posts.push({
        id: doc.id,
        ...postData,
        author: author || null, // Attach author details or set null if not found
      });
    }

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Function to fetch posts by a specific user
export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    console.log('Fetching posts for user ID:', userId);
    const postsRef = collection(db, 'post');
    const q = query(
      postsRef,
      where('uid', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    console.log('Found posts:', querySnapshot.size);

    // Fetch author details once
    const author = await getUserDetails(userId);
    if (!author) {
      console.warn(`No author details found for UID: ${userId}`);
    }

    const posts: Post[] = querySnapshot.docs.map(doc => {
      const postData = doc.data();
      return {
        id: doc.id,
        uid: userId,
        message: postData.message || '',
        media: postData.media || '',
        timestamp: postData.timestamp,
        author: author || null
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
}