import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";

async function writeStorage(id, image, resume, update) {
  let imageURL, resumeURL;
  try {
    if (update.image) {
      const imageRef = ref(storage, `images/${id}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef);
    };
    if (update.resume) {
      const resumeRef = ref(storage, `resume/${id}`);
      await uploadBytes(resumeRef, resume);
      resumeURL = await getDownloadURL(resumeRef);
    };

    return [imageURL, resumeURL];
  } catch (error) {
    throw error;
  }
}

async function writeData(id, data, qualification, image, resume, update) {
  if (
    !id ||
    !data ||
    qualification.length === 0 ||
    image === "/upload-icon-22.png" ||
    !resume
  ) {
    return;
  }
  try {
    const [imageURL, resumeURL] = await writeStorage(id, image, resume, update);
    await setDoc(doc(db, "records", id), {
      ...data,
      qualification: qualification,
      image: imageURL,
      resume: resumeURL,
    })
    window.location.href = "/";
  } catch (error) {
    alert("Missing Field")
  }
}

export default writeData;