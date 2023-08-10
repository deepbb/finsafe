// read document from firebase
import {
  collection,
  collectionGroup,
  query,
  getDocs as getDocs_,
  getDoc,
  where,
  doc,
  updateDoc,
  getFirestore,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { firestore } from "../firebase";
import { forEach } from "lodash";

// add rate limiters!

export const getAllDocs = (
  collectionName,
  limit,
  isCollectionGroup = false
) => {
  const queryArgs = [];
  if (limit) {
    queryArgs.push(limit(limit));
  }
  const collection_ = isCollectionGroup
    ? collectionGroup(firestore, collectionName)
    : collection(firestore, collectionName);
  return new Promise((resolve, reject) => {
    getDocs_(query(collection_, ...queryArgs))
      .then((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ ...doc.data(), id: doc.id });
        });
        resolve(dataList);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getDocs = (collectionName, filter, limit) => {
  const queryArgs = [];
  Object.keys(filter).forEach((key) => {
    queryArgs.push(where(key, "==", filter[key]));
  });
  if (limit) {
    queryArgs.push(limit(limit));
  }
  return new Promise((resolve, reject) => {
    getDocs_(query(collection(firestore, collectionName), ...queryArgs))
      .then((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ ...doc.data(), id: doc.id });
        });
        resolve(dataList);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};


export const updateAppDoc = (collectionName, data, updateKey, key) => {
  const db = getFirestore();
  const docRef = doc(db, collectionName, data.id);
  let update = {};
  update[updateKey] = data[key];
  updateDoc(docRef, update);
}

export const updateNotifDocs = (collectionName, data, isDelete, msg) => {
  const db = getFirestore();
  const docRef = doc(db, collectionName, data.id);
  if (isDelete) {
    deleteDoc(docRef)
  } else {
    updateDoc(docRef, { message: msg })
  }
};

export const docExist = (collectionName, filter) => {
  const whereList = Object.keys(filter).map((key) => {
    return where(key, "==", filter[key]);
  });
  console.log("Check if document exists");
  return new Promise((resolve, reject) => {
    getDocs_(query(collection(firestore, collectionName), ...whereList))
      .then((querySnapshot) => {
        console.log(querySnapshot);
        resolve(Boolean(querySnapshot.length));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getDocById = (collectionName, id) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(collection(firestore, collectionName), id))
      .then((docSnapshot) => {
        resolve({ ...docSnapshot.data(), id: docSnapshot.id });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};


export const getUserByNumber = (number, cb) => {
  const db = getFirestore();
  const q = query(collection(db, "user_data"), where("phone", "==", parseInt(number)));
  getDocs_(q)
    .then(querySnapshot => {
      if (querySnapshot.docs.length === 0) cb(null);
      querySnapshot.forEach((doc) => {
        cb(doc.data())
      });

    })
    .catch(error => console.log(error));
}

export const insertNewDoc = (collection, data) => {
  const db = getFirestore();
  setDoc(doc(db, collection, data.email), data);
}

export const updateUserDoc = (data, cb) => {
  const db = getFirestore();
  const docRef = doc(db, "user_data", data.email);
  updateDoc(docRef, { userDoc: data.userDoc })
    .then(d => {
      cb();
    })
}

export const updateUserDB = (data) => {
  const db = getFirestore();
  console.log(data);
  if (data.userDoc && data.userDoc.length) {
    data.userDoc.forEach(doc => {
      doc.file = 1;
    })
  }
  const docRef = doc(db, "user_data", data.email)
  updateDoc(docRef, {
    name: data.name,
    userDoc: data.userDoc,
  })
}

export const deleteUser = (email) => {
  const db = getFirestore();
  const docRef = doc(db, "user_data", email);
  deleteDoc(docRef)
};
