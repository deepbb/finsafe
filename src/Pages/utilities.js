import { uploadDocuments } from "../API/uploadFiles";

export const addDownloadUrlToDocuments = async (documents) => {
  const documentsToSave = documents.filter(
    (doc) => Boolean(doc.file) || Boolean(doc.fileDownloadUrl)
  );

  // Get all the documents to save

  const documentsToUpload = documentsToSave
    .map((item, index) => [item.file, index])
    .filter((o) => Boolean(o[0]));

  // Identify all the documents to upload and store the new index with respect to documents to save

  if (documentsToUpload.length) {
    const downloadUrls = await uploadDocuments(
      documentsToUpload.map((item) => item[0])
    );

    documentsToUpload.forEach((item, index) => {
      delete documentsToSave[item[1]].file;
      documentsToSave[item[1]] = {
        ...documentsToSave[item[1]],
        fileDownloadUrl: downloadUrls[index],
        dateCreated: new Date(Date.now()),
      };
    });

    // Add download file url to the documents to save and remove the file object

    return [...documentsToSave];
  } else {
    return documentsToSave;
  }
};

export const getAuthFilter = (auth) => {
  if (auth.email) {
    return { "email.value": auth.email };
  } else if (auth.phoneNumber) {
    return { "mobilenumber.value": auth.phoneNumber };
  }
};

export const sortDateList = (key) => (a, b) => {
  if (a[key] < b[key]) {
    return 1;
  } else if (a[key] === b[key]) {
    return 0;
  } else {
    return -1;
  }
};

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export const isBlank = (data) => {
  if (data.trim() === "") return true;
  return false;
};

export const isEmptyObj = (obj) => {
  if (Object.keys(obj).length === 0) return true;
  return false;
};

export const isUrl = (url) => {
  return (
    url.startsWith("https://") &&
    url.split(".").length > 1 &&
    url.split(".")[url.split(".").length - 1].length > 0
  );
};
