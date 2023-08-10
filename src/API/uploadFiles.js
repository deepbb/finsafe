import { ref, uploadBytesResumable, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";


export const getFileUrl = (fileRef, cb) => {

  const storage = getStorage();
  console.log("----------------->", fileRef)
  getDownloadURL(ref(storage, fileRef))
    .then((url) => {
      cb(url)
    })
    .catch((error) => {
      // Handle any errors
    });
}

export const uploadFile = (file) => {
  console.log("inside uploadFile")
  const store = getStorage();
  const storageRef = ref(store, file.imageRef);
  console.log("===============>", file)
  uploadBytes(storageRef, file.file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

}



export const uploadDocuments = async (
  files,
  processDownloadUrls = (url) => url,
  successCallback = async () => { }
) => {
  const downloadUrls = await Promise.all(
    files.map((file) => {
      const reference = ref(storage, file.name);
      const metadata = { contentType: file.type };
      const uploadTask = uploadBytesResumable(reference, file, metadata);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    })
  );
  await successCallback();
  return downloadUrls.map(processDownloadUrls);
};
