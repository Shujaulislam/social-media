
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebse/firebase";

// Define an interface for the user data
interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  timestamp?: Timestamp;
}

// Function to create or update user data in Firestore
export const createUser = async ({ uid, name, email, photoURL }: UserData): Promise<void> => {
  if (!uid) {
    throw new Error("User ID (uid) is required");
  }

  try {
    // Reference to the Firestore document in the 'admins' collection
    const userRef = doc(db, `admins/${uid}`);

    console.log(`Creating or updating user document for UID: ${uid}`);

    // Set user data in Firestore
    await setDoc(
      userRef,
      {
        uid,
        name,
        email,
        photoURL,
        timestamp: Timestamp.now(), // Firestore's server-side timestamp
      },
      { merge: true } // Prevent overwriting existing fields
    );

    console.log(`User document successfully created/updated for UID: ${uid}`);
  } catch (error: any) {
    console.error(`Error creating/updating user document: ${error.message}`);
    throw new Error(`Failed to save user data: ${error.message}`);
  }
};
