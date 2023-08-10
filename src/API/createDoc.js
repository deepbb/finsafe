// add function to create a doc from firebase
import { firestore } from "../firebase";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
export const addData = (collectionName, payload, successCallback) => {
  const collection_ = collection(firestore, collectionName);
  const dateTimeStamp = new Date(Date.now());
  return new Promise((resolve, reject) => {
    addDoc(collection_, { ...payload, dateCreated: dateTimeStamp })
      .then((docRef) => {
        console.log(docRef);
        if (successCallback) successCallback(docRef);
        resolve(docRef);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const addBatchedData = (
  collectionName,
  payloadArray,
  successCallback
) => {
  const collection_ = collection(firestore, collectionName);
  const dateTimeStamp = new Date(Date.now());
  const batch = writeBatch(firestore);
  payloadArray.forEach((payload) => {
    batch.set(doc(collection_), { ...payload, dateCreated: dateTimeStamp });
  });
  return new Promise((resolve, reject) => {
    batch
      .commit()
      .then((response) => {
        console.log(response);
        if (successCallback) successCallback(response);
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
