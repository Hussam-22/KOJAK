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

// config
import { CONTACT_US_FORM, FIREBASE_API, SITE_NAME } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

const THIS_MONTH = new Date().getMonth();
const THIS_YEAR = new Date().getFullYear();

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // ------------------ | Get image Download URL | ------------------
  const fsGetImgDownloadUrl = useCallback(async (folderID, imgID, thumbnail = false) => {
    let url = '';
    try {
      url = await getDownloadURL(
        ref(
          STORAGE,
          `gs://kojak-exclusive/${folderID}/${imgID}_${thumbnail ? '200x200' : '1920x1080'}.webp`
        )
      );
    } catch (error) {
      url = undefined;
    }

    return url;
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetFolderImages = useCallback(async (folderID) => {
    const listRef = ref(STORAGE, `gs://kojak-exclusive/${folderID}`);
    const imagesList = await listAll(listRef);
    const imagesUrl = await Promise.all(
      imagesList.items.map(async (imageRef) => getDownloadURL(ref(STORAGE, imageRef)))
    );
    const thumbnail = imagesUrl.filter((url) => url.includes('200x200'));
    const largeImage = imagesUrl.filter((url) => url.includes('1920x1080'));
    return [thumbnail, largeImage];
  }, []);

  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/${SITE_NAME}/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();

    if (payload.source === CONTACT_US_FORM) {
      return setDoc(newDocRef, {
        ...payload,
        website: SITE_NAME,
        id: newDocRef.id,
        createdAt: Timestamp.fromDate(new Date()),
        to: [
          'ZAHID@KOJAK-GROUP.COM',
          'hussam@hotmail.co.uk',
          'querieskex@kojak-group.com',
          'info.marketing@kojak-group.com',
        ],
        message: {
          subject: payload.subject,
          html: `
        <p>Email: ${payload.email}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Inquiry: ${payload.messageText}</p>
        <p>---------------------------</p>
        <p>${dateTime.toLocaleString()}</p>
        <p>${newDocRef.id}</p>
        `,
        },
      });
    }
    setDoc(newDocRef, {
      ...payload,
      website: SITE_NAME,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return newDocRef.id;
  }, []);

  // ----------------------------------------------------------------------------
  const getVehicleInfo = useCallback(async (vehicleID) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/vehicles/${vehicleID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // GET Cars List
  const getCars = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'vehicles'), where('isActive', '==', true));
    const querySnapshot = await getDocs(docRef);
    const documents = [];
    const asyncOperations = [];

    querySnapshot.forEach((document) => {
      const asyncOperation = async () => {
        const listRef = ref(STORAGE, `gs://kojak-exclusive/${document.data().docID}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await getDownloadURL(
          ref(
            STORAGE,
            `gs://kojak-exclusive/${document.data().docID}/${imagesList?.items[0]?.name}`
          )
        );
        documents.push({ data: document.data(), thumbnail });
      };
      asyncOperations.push(asyncOperation());
    });
    await Promise.all(asyncOperations);

    return documents;
  }, []);

  const getFeaturedCars = useCallback(async () => {
    const docRef = query(
      collectionGroup(DB, 'vehicles'),
      where('isActive', '==', true),
      where('isFeatured', '==', true)
    );
    const querySnapshot = await getDocs(docRef);
    const documents = [];
    const asyncOperations = [];

    querySnapshot.forEach((document) => {
      const asyncOperation = async () => {
        const listRef = ref(STORAGE, `gs://kojak-exclusive/${document.data().docID}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await getDownloadURL(
          ref(
            STORAGE,
            `gs://kojak-exclusive/${document.data().docID}/${imagesList?.items[0]?.name}`
          )
        );
        documents.push({ data: document.data(), thumbnail });
      };
      asyncOperations.push(asyncOperation());
    });
    await Promise.all(asyncOperations);

    return documents;
  }, []);

  const fsUpdateStatistics = useCallback(async (docID, source) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/vehicles/${docID}`);

    await updateDoc(docRef, {
      [`statistics.${source}.${THIS_YEAR}.${THIS_MONTH}`]: increment(1),
    });
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      getCars,
      getFeaturedCars,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
      fsUpdateStatistics,
    }),
    [
      addNewForm,
      getCars,
      getFeaturedCars,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
      fsUpdateStatistics,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
