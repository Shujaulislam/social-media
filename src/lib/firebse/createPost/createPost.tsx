import { doc, collection, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

// Interfaces
interface CreatePostData {
  userId: string;
  text?: string;
  mediaFiles?: File[];
}

interface CreatePostResult {
  success: boolean;
  postId: string;
  mediaUrls: string[];
}

interface Post {
  id: string;
  userId: string;
  text: string;
  mediaUrls: string[];
  likeCount: number;
  commentCount: number;
  timestamp: Timestamp;
}

export const createPost = async ({ 
  userId, 
  text = "", 
  mediaFiles = [] 
}: CreatePostData): Promise<CreatePostResult> => {
  if (!text?.trim() && mediaFiles.length === 0) {
    throw new Error("Either text or media files are required");
  }

  const postId: string = doc(collection(db, 'posts')).id;

  try {
    const mediaUrls: string[] = [];

    // Upload all media files if they exist
    if (mediaFiles.length > 0) {
      for (const [index, file] of mediaFiles.entries()) {
        // Create unique filename for each media file
        const fileName: string = `${postId}_${index}${getFileExtension(file.name)}`;
        const mediaRef = ref(storage, `posts/${userId}/${fileName}`);
        
        // Upload the file
        await uploadBytes(mediaRef, file);
        
        // Get the download URL
        const mediaUrl = await getDownloadURL(mediaRef);
        mediaUrls.push(mediaUrl);
      }
    }

    // Create the post document
    const postRef = doc(db, `posts/${postId}`);
    const postData: Post = {
      id: postId,
      userId,
      text: text || "",
      mediaUrls,
      likeCount: 0,
      commentCount: 0,
      timestamp: Timestamp.now(),
    };

    await setDoc(postRef, postData);

    return {
      success: true,
      postId,
      mediaUrls
    };

  } catch (error) {
    console.error("Error in createPost:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create post: ${error.message}`);
    } else {
      throw new Error('Failed to create post: Unknown error');
    }
  }
};

// Helper function to get file extension
const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
};

// Type for the form component props
export interface AddPostFormProps {
  userId: string;
}

// Custom error type if needed
export class PostCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PostCreationError';
  }
}