import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "./App";

export const db = getFirestore(app);
export const storage = getStorage();