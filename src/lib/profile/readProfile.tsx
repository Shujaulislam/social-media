"use client";

// import { db } from "@/lib/firebase";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebse/firebase";

// Define the return type for the hook
interface UseAdminReturn {
  data: DocumentData | null;
  error: string | null;
  loading: boolean;
}

// Define the function props type
interface UseAdminProps {
  Uid: string;
}

export function useAdmin({ Uid }: UseAdminProps): UseAdminReturn {
  const { data, error } = useSWRSubscription(
    [`admins/${Uid}`], // SWR cache key
    ([path], { next }) => {
      const ref = doc(db, path); // Reference to the Firestore document

      // Subscribe to Firestore document snapshot updates
      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          // Call `next` with the data if the document exists
          next(null, snapshot.exists() ? snapshot.data() : null);
        },
        (error) => {
          // Call `next` with the error message
          next(error.message || "Failed to fetch admin data.");
        }
      );

      // Cleanup function to unsubscribe
      return () => unsubscribe();
    }
  );

  return {
    data: data ?? null, // Ensure null is returned when data is undefined
    error: error ?? null,
    loading: data === undefined, // Explicit check for loading state
  };
}
 