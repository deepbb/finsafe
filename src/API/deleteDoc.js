import { collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";

export const deleteDataById = (collectionName, id, newPayload) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(collection(firestore, collectionName), id))
      .then(() => {
        console.log("Deleted");
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};
