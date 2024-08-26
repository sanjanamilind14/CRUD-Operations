import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db, storage } from "./firebase";
import { deleteObject, ref } from "firebase/storage";

async function deleteData(id) {
  const deleteImgRef = ref(storage, `images/${id}`);
  const deleteResumeRef = ref(storage, `resume/${id}`);

  try {
// Attempt to delete the images and resume files from the storage.
    if (deleteObject(deleteImgRef) && deleteObject(deleteResumeRef)) {
// If successful, delete the document with the specified ID from the 'records' collection in the Firestore database.
      await deleteDoc(doc(db, "records", id));
      // After deleting, check if there are any remaining records in the 'records' collection.
      const snapshot = await getDocs(collection(db, "records"));
      if (snapshot.docs.length === 0) {
        window.location.href = "/";
      } else {
        window.location.reload();
      }
    }
  } catch (error) {
    console.error("Error Deleting: ", error);
  }
}

export default deleteData;