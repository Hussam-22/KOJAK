import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
  setDoc,
  getDoc,
  getDocs,
  increment,
  Timestamp,
  updateDoc,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';

// config
import { SITE_NAME, FIREBASE_API, CONTACT_US_FORM } from 'src/config-global';

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
        const listRef = ref(STORAGE, `gs://kojak-exclusive/${document.data().id}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await getDownloadURL(
          ref(STORAGE, `gs://kojak-exclusive/${document.data().id}/${imagesList?.items[0]?.name}`)
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
        const listRef = ref(STORAGE, `gs://kojak-exclusive/${document.data().id}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await getDownloadURL(
          ref(STORAGE, `gs://kojak-exclusive/${document.data().id}/${imagesList?.items[0]?.name}`)
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

  const fsUpdateDoc = useCallback(async () => {
    const docCollRef = query(collectionGroup(DB, 'vehicles'), where('isActive', '==', false));
    const querySnapshot = await getDocs(docCollRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    console.log(documents);

    const toResolve = [];

    documents
      .filter(
        (item) =>
          !['"atjDzMOAT5uiAeoWxCWA"', 'Dv6pel2OJEiST3SC0SmL', 'llQFPpOxERxhlZe9HJEr'].includes(
            item.id
          )
      )
      .forEach((element) => {
        const update = async () => {
          const docRef = doc(DB, `/websites/kexclusive/vehicles/${element.id}`);
          await updateDoc(docRef, {
            exteriorColorString: '',
            interiorColorString: '',
          });
        };
        toResolve.push(update());
      });

    await Promise.all(toResolve);

    // const docRef = doc(DB, `/websites/kexclusive/vehicles/TVFk1tQoM9LbAzo80gLQ`);
    // const docSnap = await updateDoc(docRef, {
    //   exteriorColorString: '',
    //   interiorColorString: '',
    // });
    // return docSnap.data();
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
      fsUpdateDoc,
      fsUpdateStatistics,
    }),
    [
      addNewForm,
      getCars,
      getFeaturedCars,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
      fsUpdateDoc,
      fsUpdateStatistics,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
