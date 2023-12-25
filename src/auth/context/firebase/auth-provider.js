import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
  getDoc,
  setDoc,
  getDocs,
  Timestamp,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';

import { FIREBASE_API } from 'src/config-global';

import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const fsGetImgDownloadUrl = useCallback(async (bucketPath, imgID) => {
    let url = '';
    try {
      url = await getDownloadURL(ref(STORAGE, `gs://${bucketPath}${imgID}`));
    } catch (error) {
      url = undefined;
    }
    return url;
  }, []);

  const fsGetFolderImages = useCallback(async (folderID) => {
    const listRef = ref(STORAGE, `gs://kojak-building/${folderID}`);
    const imagesList = await listAll(listRef);
    const imagesUrl = await Promise.all(
      imagesList.items.map(async (imageRef) => getDownloadURL(ref(STORAGE, imageRef)))
    );
    const largeImage = imagesUrl.filter((url) => url.includes('1920x1080'));
    return largeImage;
  }, []);

  const fsGetSpaces = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'spaces-list'));
    const querySnapshot = await getDocs(docRef);

    const documents = [];
    const asyncOperations = [];

    querySnapshot.forEach((document) => {
      const asyncOperation = async () => {
        const listRef = ref(STORAGE, `gs://kojak-building/${document.data().docID}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await fsGetImgDownloadUrl(
          `kojak-building/${document.data().docID}/`,
          imagesList?.items.filter((imageName) => imageName.name.includes('1920x1080'))[0]?.name
        );

        documents.push({ data: document.data(), thumbnail });
      };
      asyncOperations.push(asyncOperation());
    });
    await Promise.all(asyncOperations);

    return documents;
  }, [fsGetImgDownloadUrl]);

  const fsGetSpace = useCallback(async (spaceID) => {
    const docRef = doc(DB, `/websites/building/spaces-list/${spaceID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // get featured property
  const fsGetFeaturedProperty = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'spaces'), where('isFeatured', '==', true));
    const querySnapshot = await getDocs(docRef);
    const dataArr = [];
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr[0];
  }, []);

  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/building/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to: ['info.kgmarketing@gmail.com', 'querieskb@kojak-group.com', 'hussam@hotmail.co.uk'],
      message: {
        subject: 'Kojak Building - New Form Submitted',
        text: payload.subject,
        html: `
        <p>Source: ${payload.source}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Email: ${payload.email}</p>
        <p>Subject: ${payload.subject}</p>
        <p>Inquiry: ${payload.inquiry}</p>
        <p>---------------------------</p>
        <p>${dateTime.toLocaleString()}</p>
        <p>${newDocRef.id}</p>
        `,
      },
    });
    return newDocRef.id;
  }, []);

  // add new request-callback form
  const updatePageAnalytic = useCallback(async (page, pageDetails = '') => {
    const newDocRef = doc(collection(DB, `/websites/building/analytics/`));
    setDoc(newDocRef, {
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      page,
      pageDetails,
    });
    return newDocRef.id;
  }, []);

  const memoizedValue = useMemo(
    () => ({
      fsGetSpaces,
      fsGetSpace,
      fsGetFeaturedProperty,
      addNewForm,
      updatePageAnalytic,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
    }),
    [
      fsGetSpaces,
      fsGetSpace,
      fsGetFeaturedProperty,
      addNewForm,
      updatePageAnalytic,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
