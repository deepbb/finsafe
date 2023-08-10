import {
  collection,
  query,
  getDocs,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const editData = (collectionName, filter, newPayload) => {
  const whereList = Object.keys(filter).map((key) => {
    return where(key, "==", filter[key]);
  });
  return new Promise((resolve, reject) => {
    getDocs(query(collection(firestore, collectionName), ...whereList))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, newPayload).then(() => {
            console.log("Updated");
          });
        });
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};

export const editDataById = (collectionName, id, newPayload) => {
  return new Promise((resolve, reject) => {
    updateDoc(doc(collection(firestore, collectionName), id), newPayload)
      .then(() => {
        console.log("Updated");
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};
