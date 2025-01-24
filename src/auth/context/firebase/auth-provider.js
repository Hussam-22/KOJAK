import { initializeApp } from 'firebase/app';
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import { FIREBASE_API, SITE_NAME } from 'src/config-global';

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
    const docRef = query(collectionGroup(DB, 'spaces-list'), where('isFeatured', '==', true));
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
      website: SITE_NAME,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to: [
        'querieskb@kojak-group.com',
        'hussam@hotmail.co.uk',
        'info.kojakleasing@kojak-group.com',
      ],
      // to: ['hussam@hotmail.co.uk'],
      message: {
        subject: 'Kojak Building - New Form Submitted',
        text: payload?.subject || '',
        html: `
        <p>Source: ${payload?.source || ''}</p>
        <p>Name: ${payload?.fullName || ''}</p>
        <p>Mobile: ${payload?.mobile || ''}</p>
        <p>Email: ${payload?.email || ''}</p>
        <p>Subject: ${payload?.subject || ''}</p>
        <p>Inquiry: ${payload?.inquiry || ''}</p>
        <p>---------------------------</p>
        <p>${dateTime?.toLocaleString() || ''}</p>
        <p>${newDocRef?.id || ''}</p>
        `,
      },
    });
    return newDocRef.id;
  }, []);

  const fsUpdateDocStatistics = useCallback(async (docID) => {
    const THIS_MONTH = new Date().getMonth();
    const THIS_YEAR = new Date().getFullYear();

    const docRef = doc(DB, `/websites/building/spaces-list/${docID}`);

    await updateDoc(docRef, {
      [`statistics.PAGE_VISIT.${THIS_YEAR}.${THIS_MONTH}`]: increment(1),
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      fsGetSpaces,
      fsGetSpace,
      fsGetFeaturedProperty,
      addNewForm,
      fsUpdateDocStatistics,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
    }),
    [
      fsGetSpaces,
      fsGetSpace,
      fsGetFeaturedProperty,
      addNewForm,
      fsUpdateDocStatistics,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
